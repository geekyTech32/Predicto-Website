const submit_btn = document.querySelector(".submit-btn");
const message_box = document.querySelector(".message-box");

let usersName;
let counter = 0;
let counter_2 = 0;
let error_list = [];

const log_in = async (event) => {
    event.preventDefault()
     // Collect input values
    const userName = document.querySelector("#userName").value.trim();
    const userPassword = document.querySelector("#password").value.trim();

    if(userName <1 || userPassword <1){
        message_box.textContent="Enter Valid Username"
        message_box.classList.remove("hide")

    }

    else{
    try {

        // Save username for later
        usersName = userName;

        // Prepare payload
        const formData = {
            userName: userName,
            userPassword: userPassword
        };

        console.log("Sending login payload:", formData);

        // First request: login
        let response = await fetch("https://zomato-42si.onrender.com/log-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        let result = await response.json();
        console.log("Login response:", result);

        // Handle errors
        if (!response.ok) {
            console.log("Login failed, response not ok");

            if (result.detail === "404: Wrong Password") {
                counter++;
                message_box.textContent = "Wrong Password";
                message_box.classList.add("show");
                message_box.classList.remove("hide");
            }

            if (result.detail === "404: User not found") {
                counter_2++;
                message_box.textContent = "User not found";
                message_box.classList.add("show");
                message_box.classList.remove("hide");
            }

            if (counter >= 3) {
                message_box.textContent = "Reset your Password";
                message_box.classList.add("show");
                message_box.classList.remove("hide");
            }
            return; // stop execution if login failed
        }
        console.log(usersName)
        
        if (response.ok) {
            let user_name = result.message; 

            localStorage.setItem("log_user_name", JSON.stringify(usersName));

            
            let response_2 = await fetch("https://zomato-42si.onrender.com/users_detail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usersName: usersName }) 
            });

            let result_2 = await response_2.json();
            

            
           if (result_2["Result Length"] === "single") {
    localStorage.setItem("Recent Data", JSON.stringify(result_2["Recent Data"]));
    localStorage.setItem("Content Length", result_2["Result Length"]); // raw string
     window.location.href = "dynamic.html"; 
} else if (result_2["Result Length"] === "No Record") {
    localStorage.setItem("Content Length", result_2["Result Length"]); // raw string
    localStorage.setItem("users_name", JSON.stringify(user_name));
     window.location.href = "dynamic.html"; 
} else {
    let total_prediction = Object.entries(result_2["Recent Data"]).length;
    let name_of_user = Object.entries(result_2["Users Name"])[0];

    localStorage.setItem("total_prediction", total_prediction);
    localStorage.setItem("name_of_user", JSON.stringify(name_of_user));
    localStorage.setItem("Content Length", result_2["Result Length"]); // raw string
    localStorage.setItem("Recent Data", JSON.stringify(result_2["Recent Data"]));
    localStorage.setItem("Most Used Model", result_2["Most Used Model"]); // raw string
    window.location.href = "dynamic.html"; 
}
        }
    } 
    
    catch (error) {
        console.error("Unexpected error:", error);
        message_box.textContent = "Something went wrong. Please try again.";
        message_box.classList.add("show");
        message_box.classList.remove("hide");
    }}
};

// Attach event listener
submit_btn.addEventListener("click", log_in);


// vanta cloud for background
VANTA.CLOUDS({
    el: "body"
  })


submit_btn.addEventListener("click", log_in)

