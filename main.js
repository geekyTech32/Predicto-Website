
//variables
let restaurant_type_dropdown= document.querySelector(".restaurant-type-dropdown-nav")
let restaurant_type_container= document.querySelector("#restaurant-type-title")
const user_img = document.querySelector("#user-comment-img")
const user_name = document.querySelector(".user-name")
const user_company= document.querySelector(".user-company")
const user_comment= document.querySelector(".users-comment")


// dynamic user comment
const user_comment_dict = {
  "Gautam": {
    img_url: "main-pic-folder/boy.png",
    user_company: "Tricky-Tech",
    user_comment: "Predicto helped us identify peak hours and optimize pricing — performance has improved noticeably."
  },
  "Ananya": {
    img_url: "main-pic-folder/girl.png",
    user_company: "FoodieKart",
    user_comment: "With Predicto, we discovered which cuisines are trending in our region and adjusted our menu accordingly."
  },
  "Ravi": {
    img_url: "main-pic-folder/boy.png",
    user_company: "StreetBites",
    user_comment: "Predicto’s insights on competitive pricing gave us the confidence to set fair yet profitable prices."
  },
  "Meera": {
    img_url: "main-pic-folder/girl.png",
    user_company: "Delhi Delights",
    user_comment: "We used Predicto to find the best region to open our new outlet — and it worked perfectly."
  },
  "Arjun": {
    img_url: "main-pic-folder/boy.png",
    user_company: "QuickServe",
    user_comment: "The AI-powered time analysis trained on Delhi restaurants helped us maximize customer flow."
  },
  "Priya": {
    img_url: "main-pic-folder/girl.png",
    user_company: "TasteHub",
    user_comment: "Predicto showed us which cuisines hold the most value in our area — our menu is now more profitable."
  },
  "Karan": {
    img_url: "main-pic-folder/boy.png",
    user_company: "SnackStop",
    user_comment: "We rely on Predicto’s region-specific insights to tailor our dishes and boost customer satisfaction."
  },
  "Sneha": {
    img_url: "main-pic-folder/girl.png",
    user_company: "FlavorWorks",
    user_comment: "Predicto simplified decision-making — just entering our region name gave us actionable predictions."
  },
  "Vikram": {
    img_url: "main-pic-folder/boy.png",
    user_company: "SpiceRoute",
    user_comment: "Competitive pricing insights from Predicto helped us stay ahead in a crowded market."
  },
  "Neha": {
    img_url: "main-pic-folder/girl.png",
    user_company: "FreshPlates",
    user_comment: "Predicto’s data-driven analysis revealed the best-selling cuisines in our region — boosting our sales."
  }
};

const user_comment_func = (elements, fadeDuration = 500, rotateInterval = 6000) => {
  const { user_img, user_company, user_name, user_comment } = elements;
  const userList = Object.keys(user_comment_dict);
  let counter = 0;
  let timeoutId;

  const updateUser = () => {
    const currentUser = userList[counter];
    const userData = user_comment_dict[currentUser];

    // Fade out
    [user_img, user_company, user_name, user_comment].forEach(el => el.classList.remove("show"));

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // Update content
      user_img.src = userData.img_url;
      user_company.textContent = userData.user_company;
      user_name.textContent = currentUser;
      user_comment.textContent = userData.user_comment;

      // Fade in
      [user_img, user_company, user_name, user_comment].forEach(el => el.classList.add("show"));
    }, fadeDuration);
  };

  if (userList.length === 0) return;

  // Show first user immediately
  updateUser();

  // Rotate
  setInterval(() => {
    counter = (counter + 1) % userList.length;
    updateUser();
  }, rotateInterval);
};

user_comment_func({user_img, user_comment , user_company, user_name})


//Creating function for dropdown animation Restaurant type
let restaurant_type_animation_1=()=>{
    //step-1 removing hide class out from object
    restaurant_type_dropdown.classList.remove('hide')
    //step-2 adding show class to object
    restaurant_type_dropdown.classList.add("show")
}
let restaurant_type_animation_2=()=>{
    //step-1 removing show class from object
    restaurant_type_dropdown.classList.remove('show')
    //step-2 adding hide class to object
    restaurant_type_dropdown.classList.add("hide")
}
restaurant_type_container.addEventListener("mouseover", restaurant_type_animation_1)
restaurant_type_container.addEventListener("mouseout", restaurant_type_animation_2)




// Creating function for fetching all restaurant type detail for front-end container's
let restaurant_type_section= document.querySelector(".restaurant-type-container")
const restaurant_type_dict = {"Fast Food":{ content :"Fast food insights tailored to your region — because quick bites deserve smart decisions." , img_link:"main-pic-folder/fast food.png" , title:"Fast Food"} ,"North Indian":{content:"North Indian cuisine insights discover what drives demand and value in your region", img_link:"main-pic-folder/north indian.png", title:"North Indian"} , "South Indian": {content:"South Indian cuisine insights smarter predictions for dosas, idlis, and beyond.", img_link:"main-pic-folder/south indian.png" , title:"South Indian"}, "Asian Cuisine":{content:"Asian cuisine insights smarter predictions for noodles, sushi, dim sum, and more.", img_link:"main-pic-folder/asian.png", title:"Asian"}, "European Cuisine": {content:"European cuisine insights  smarter predictions for pasta, pizza, tapas, and more.", img_link:"main-pic-folder/european.png", title:"European"}, "American Cuisine":{content:"American cuisine insights — smarter predictions for burgers, steaks, BBQ, and more.",img_link:"main-pic-folder/american.png", title:"American Cuisine"}
}

let restaurant_type_list= ()=>{
   const restaurant_dict= Object.values(restaurant_type_dict)
   Object.values(restaurant_dict).forEach(array => {
    console.log(array)
      // creating  parent div 
    let div_container= document.createElement("div")
    // adding class to div_container
    div_container.classList.add("type")
    // creating child div for parent div
    let img_container= document.createElement("div")
    // adding class to img_container
    img_container.classList.add("img-heading-container")
    // creating child element for img_container 
    const img = document.createElement("img")
    // adding source to img element
    img.src=array.img_link
    // adding alt to img element
    img.alt="Backend_Error"
    // adding class to img element
    img.classList.add("img-restaurant-type")
    // creating child element for img_container
    const h3_tag = document.createElement("h3")
    // adding class to h3 tag 
    h3_tag.classList.add("restaurant")
    //changing inner html to element 1
    h3_tag.innerHTML=array.title
    //append all child to img-container
    img_container.appendChild(img)
    img_container.appendChild(h3_tag)
    // append img_container to main container type
    div_container.appendChild(img_container)
    // append type container to it's parent container
    restaurant_type_section.appendChild(div_container)

    // creating paragraph more 
    const para_container= document.createElement("div")
    // adding class to para container
    para_container.classList.add("restaurant-type-content")
    // creating child element 
    const p_tag = document.createElement("p")
    // adding class to p_tag
    p_tag.classList.add("content")
    // adding inner html
    p_tag.innerHTML=array.content
    // appending 
    para_container.appendChild(p_tag)
    div_container.appendChild(para_container)



   });
}

restaurant_type_list()

//Creating function for dynamic changing models info

let dynamic_heading = document.querySelector("#changing-heading")
let dynamic_content_main= document.querySelector("#changing-content")
let dynamic_img     = document.querySelector("#img-about")
let dynamic_model_link = document.querySelector("#changing-model-link")
let span_1_restaurant= document.querySelector("#span-restaurant")
let span_2_restaurant= document.querySelector("#span-2-restaurant")
let span_1_accuracy  = document.querySelector("#span-accuracy")
let span_2_accuracy  = document.querySelector("#span-2-accuracy")
let span_1_train     = document.querySelector("#span-train")
let span_2_train     = document.querySelector("#span-2-train")

console.log(dynamic_heading, dynamic_content_main, dynamic_img, dynamic_model_link, span_1_restaurant, span_2_restaurant, span_1_accuracy, span_1_train, span_2_train)
// dynamic content object
const dynamic_content_object = {"Find Best Time to Open And Close Restaurant":{"Changing_Content":"AI‑powered time analysis trained on 20 lakh+ Delhi restaurants — because every restaurant deserves peak performance.", "Model-Link":"#Time-Find", "Span-1":["80K", "70k", "86K"], "Span-2":["Restaurant", "Accuracy", "Trained On"], "img_link":"main-pic-folder/time.jpg"},
"Find Best Trending Cuisine Of Region":{"Changing_Content":"Data‑driven insights into the region’s best‑selling cuisines — because every menu deserves to shine", "Model-Link":"#Trending-cuisine" , "Span-1":["40K", "90%", "50K"], "Span-2":["Restaurant", "Accuracy","Trained On"], "img_link":"main-pic-folder/trending cuisine.jpg"},
"Find Best Region For Dish":{"Changing_Content":"Get region‑specific insights tailored to your chosen cuisine, built to boost performance." , "Model-Link": "#Best-Region-Cuisine", "Span-1":["67K", "85%", "57K"], "Span-2":["Restaurant", "Accuracy", "Trained On"], "img_link":"main-pic-folder/dish.jpg"},
"Find Best Cuisine Type For Region":{
    "Changing_Content":"Discover which cuisines hold the most value in your region — because local tastes matter." , "Model-Link": "#Cuisine-guesser", "Span-1":["110K", "93%", "70K"], "Span-2":["Restaurant", "Accuracy", "Trained On"] ,"img_link":"main-pic-folder/download.jpg"
},
"Find Best Price For Region":{
    "Changing_Content":"Unlock the best competitive price for your dish — because smart pricing drives success." , "Model-Link": "#Price-Model", "Span-1":["77K", "82%", "60K"], "Span-2":["Restaurant", "Accuracy", "Trained On"] ,"img_link":"main-pic-folder/price.jpg"
}
}

let dynamic_change_func = () => {
  const dynamic_object = Object.entries(dynamic_content_object);
  let dynamic_title = [];
  let dynamic_content = [];
  let dynamic_link = [];
  let dynamic_span_1 = [];
  let dynamic_span_2 = [];
  let dynamic_img_links = [];
  let counter = 0;

  // Collect data safely
  dynamic_object.forEach(([title, values]) => {
    dynamic_title.push(title);
    dynamic_content.push(values["Changing_Content"]);
    dynamic_link.push(values["Model-Link"]);
    dynamic_span_1.push(values["Span-1"]);
    dynamic_span_2.push(values["Span-2"]);
    dynamic_img_links.push(values["img_link"]);
  });

  const fadeElements = [
    dynamic_heading,
    dynamic_content_main,
    dynamic_model_link,
    span_1_restaurant,
    span_1_accuracy,
    span_1_train,
    span_2_restaurant,
    span_2_accuracy,
    span_2_train,
    dynamic_img
  ];

  const updateContent = () => {
    // Fade out
    fadeElements.forEach(el => el.classList.remove("show"));

    setTimeout(() => {
      // Update content
      dynamic_heading.innerHTML = dynamic_title[counter];
      dynamic_content_main.innerHTML = dynamic_content[counter];
      dynamic_model_link.href = dynamic_link[counter];

      span_1_restaurant.innerHTML = dynamic_span_1[counter][0];
      span_1_accuracy.innerHTML = dynamic_span_1[counter][1];
      span_1_train.innerHTML = dynamic_span_1[counter][2];

      span_2_restaurant.innerHTML = dynamic_span_2[counter][0];
      span_2_accuracy.innerHTML = dynamic_span_2[counter][1];
      span_2_train.innerHTML = dynamic_span_2[counter][2];

      dynamic_img.src = dynamic_img_links[counter]; // ✅ update image

      // Fade in
      fadeElements.forEach(el => el.classList.add("show"));
    }, 500); // match CSS transition duration
  };

  // Show first immediately
  updateContent();

  // Rotate every 6s
  setInterval(() => {
    counter = (counter + 1) % dynamic_object.length;
    updateContent();
  }, 6000);
};

dynamic_change_func();



// creating sent email function
let contact_input= document.querySelector("#contact-input")
let submit_btn   = document.querySelector(".send-mail")



let email_func = ()=>{
    if(contact_input.value.trim().length <1){
        contact_input.value=null
        submit_btn.classList.add("hide")
        document.querySelector(".error-contact").classList.remove("hide")
        document.querySelector(".error-contact").textContent ="Enter Valid Message"
        document.querySelector(".error-contact").style.color="red"
       
        setTimeout(()=>{
              

              // 
              submit_btn.classList.remove("hide")
              document.querySelector(".error-contact").classList.add("hide")



        }, 3000)
    }
    else{
        window.location.href=`mailto:gj75345@gmail.com?subject=USERS%20MESSAGE&body=${encodeURIComponent(contact_input.value)}`
        contact_input.value=null
    }

}

submit_btn.addEventListener('click', email_func)

// creating mail address copy function
let mail_icon = document.querySelector("#mail")
let clipboard_message = document.querySelector("#copy-clipboard")

let mail_copy_func = () => {
  navigator.clipboard.writeText("GJ75345@gmail.com")
    .then(() => {
        // showing message
        clipboard_message.classList.add("show")
        clipboard_message.classList.remove("hide")
        // removing message
        setTimeout(()=>{
         clipboard_message.classList.remove("show")
         clipboard_message.classList.add("hide")
        },2000)

    })
};
mail_icon.addEventListener("click",mail_copy_func)


