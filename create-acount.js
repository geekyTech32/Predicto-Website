// variables
const name_variable = document.querySelector("#Name");
const mail_variable = document.querySelector("#mail");
const username_variable = document.querySelector("#username");
const password_variable = document.querySelector("#password"); 
const confirm_password_variable = document.querySelector("#confirm-password");
const submit_btn = document.querySelector(".submit-btn");
const message_box = document.querySelector(".message-box")
const done_box = document.querySelector(".done-icon")
let debounceTimer ;


const form = document.getElementById("create-account-form");

form.addEventListener("submit", async (event) => {
  if (!form.checkValidity()) {
  
    form.reportValidity();
    event.preventDefault();
    return;
  }

  event.preventDefault(); 

  const form_data = {
    user_name: name_variable.value,
    user_mail: mail_variable.value,
    username: username_variable.value,
    user_password: password_variable.value,
  };

  try {
    const response = await fetch("https://zomato-42si.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form_data),
    });

    const result = await response.json();

    if (response.ok) {
      // show message box positively when response ok
      done_box.classList.add("show")
      done_box.classList.remove("hide")

      // hide message-box  
      message_box.classList.add("hide")
      message_box.classList.remove("show")

      // hide submit box when account created
      submit_btn.classList.add("hide")
      submit_btn.classList.remove("show")

      setTimeout(() => {
        window.location.href = "sign-in-page.html";
      }, 4000);
    } else {
      console.error("Registration failed:", result);
      alert("Error: " + (result.detail || "Unknown error"));
    }
  } catch (err) {
    alert("Network error occurred");
  }
});


// Check Password


// check usersName variable
let userName_var = false

// Check usersName 

const check_usersName = async () => {
  if (username_variable.value.length >= 1) {
    const formData = { userName: username_variable.value };

    try {
      const response = await fetch("https://zomato-42si.onrender.com/check-userName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result["status_code"]==false) {
          message_box.classList.add("show")
          message_box.classList.remove("hide")
          message_box.textContent = "Username is taken";

          // hiding submit btn
          submit_btn.classList.add("hide")
          submit_btn.classList.remove("show")
          userName_var=false
        
      } 
      else {
        // Hide error box
        message_box.classList.add("hide");
        message_box.classList.remove("show");
        // show submit box
        submit_btn.classList.add("show");
        submit_btn.classList.remove("hide")
        userName_var=true
        

      }
    } catch (error) {
      console.error("Error checking username:", error);
      message_box.classList.add("show");
      message_box.classList.remove("hide");
      console.log(message_box)
      message_box.textContent = "Network error";
    }
  } else {
       message_box.classList.add("show")
          message_box.classList.remove("hide")
          message_box.textContent = "Enter Valid Username";

          // hiding submit btn
          submit_btn.classList.add("hide")
          submit_btn.classList.remove("show")
          userName_var=false
  }
}; 

// check password

const check_usersPassword = ()=>{
  if(userName_var==true){
  if ( password_variable.value != confirm_password_variable.value){
    // showing message box when password not match
    message_box.classList.add("show")
    message_box.classList.remove("hide")
    message_box.textContent="Password Incorrect";
    confirm_password_variable.style.borderBottom= "1px solid red"

    // removing submit button 
    submit_btn.classList.add("hide")
    submit_btn.classList.remove("show")
  }
  else{
    // remove message box when password matched
    message_box.classList.add("hide")
    message_box.classList.remove("show")
    confirm_password_variable.style.borderBottom="1px solid greenyellow"

    // show submit button 
    submit_btn.classList.add("show")
    submit_btn.classList.remove("hide")
  }
}

else {
   message_box.classList.add("show")
}
}


username_variable.addEventListener("input", ()=>{
  clearTimeout(debounceTimer);
  debounceTimer= setTimeout(check_usersName,1000)
})

confirm_password_variable.addEventListener("input", check_usersPassword)


VANTA.CLOUDS({
    el: "body"
  })


