const password_container = document.querySelector("#password-container")
const user_mail_container= document.querySelector("#user-mail-container")
const submit_btn = document.querySelector("#submit-new-password");
const usermail_error_message = document.querySelector(".error")
const usermail_error_wrapper = document.querySelector(".error_wrapper")
const password_error_message  = document.querySelector(".done-message")
const password_error_wrapper = document.querySelector(".done-wrapper")
const reset_password = async () => {
    const mail_address = document.querySelector("#mail").value;
    let data = { "user_email": mail_address };

    if (mail_address.length >= 1) {
        let response = await fetch("https://zomato-42si.onrender.com/check-mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        let result;
        try {
            result = await response.json();
        } catch (err) {
            console.error("Response not JSON", err);
            return;
        }

        if (response.status === 200) {
            // Hide mail container
            user_mail_container.classList.remove("show");
            user_mail_container.classList.add("hide");

            // Show password container
            password_container.classList.remove("hide");
            password_container.classList.add("show");

            const submit_new_password = async () => {
                const user_password = document.querySelector("#user-password").value;
                const user_confirm_password = document.querySelector("#user-confirm-password").value;

                const new_data = {
                    "user_mail": mail_address,
                    "user_change_password": user_password,
                    "user_confirm_password": user_confirm_password
                };

                if (user_password !== user_confirm_password) {
                    password_error_wrapper.classList.remove("hide");
                    password_error_message.textContent = "Password Not Matched";
                    password_error_message.style.color = "red";

                    
                    
                } 

                else if (user_password.trim().length < 1 || user_confirm_password.trim().length < 1) {
                    password_error_wrapper.classList.remove("hide");
                    password_error_message.textContent = "Please Enter Valid Password";
                    password_error_message.style.color = "red";}
 

                
                else {
                    let response_2 = await fetch("https://zomato-42si.onrender.com/reset-password", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(new_data)
                    });

                    password_error_wrapper.classList.remove("hide");
                    password_error_message.textContent = "Password Changed Successfully";
                    password_error_message.style.color = "green";

                    setTimeout(()=>{
                        window.location.href="sign-in-page.html"
                    }, 2000)
                }
            };

            submit_btn.addEventListener("click", submit_new_password);
        } else {
            usermail_error_message.textContent = "Usermail Not Exists";
            usermail_error_message.style.color = "red";
        }
    } else {
        usermail_error_message.textContent = "Enter Valid Usermail";
        usermail_error_message.style.color = "red";
    }
};

const mail_address = document.querySelector("#mail");
const enter_btn = document.querySelector(".enter-btn");

mail_address.addEventListener("search", reset_password);
enter_btn.addEventListener("touchstart", reset_password)

// Three.js function
// vanta cloud for background
VANTA.CLOUDS({
    el: "body"
  })





