// universal variable
let total_prediction_container = document.querySelector("#total_prediction")
let most_used_model_container  = document.querySelector("#most-used-model")
let userName = JSON.parse(localStorage.getItem("log_user_name")); 

let model_heading_container = document.querySelector("#model-heading-dynamic")
let model_sub_heading_container = document.querySelector("#model-sub-heading-dynamic")
let recent_used_model_container = document.querySelector("#recent-used-model")  
let restaurant_info_container = document.querySelector("#restaurant-info")
let prediction_container = document.querySelector("#prediction-result-table")
let span_2 = document.querySelector("#span-2-user-name")
let model_list_select = document.querySelector("#model-list")
let Content_length = localStorage.getItem("Content Length")
let hashed_model_name_url_1 ={
   "Find Time Model":"time-find", 
   "Find Trending Cuisine":"trendingCuisine", 
   "Find Region For Cuisine":"best_cuisine_for_region",
   "Find Best Price For Cuisine":"price_model",
   "Find Best Cuisine Type For Region":"cuisine_guessing_model"}
let hashed_model_name_url_2 ={
   "Find Time Model":"AI‑powered time analysis trained on 20 lakh+ Delhi restaurants — because every restaurant deserves peak performance.", 
   "Find Trending Cuisine":"Data‑driven insights into the region’s best‑selling cuisines — because every menu deserves to shine", 
   "Find Region For Cuisine":"Get region‑specific insights tailored to your chosen cuisine, built to boost performance.",
   "Find Best Price For Cuisine":"Unlock the best competitive price for your dish — because smart pricing drives success.",
   "Find Best Cuisine Type For Region":"Discover which cuisines hold the most value in your region — because local tastes matter."}
const get_model_url=["dish-name", "cuisine_type", "region-name",  "cuisine"]
const region_select = document.querySelector("#region-selector")
const dish_name_select= document.querySelector("#dish-name-selector")
const price_selector = document.querySelector("#price-for-two")
const cuisine_type_selector =  document.querySelector("#cuisine-type-selector")
const cuisine_name_selector =  document.querySelector("#cuisine-selector")
const submit_btn = document.querySelector("#submit-btn")
const region_content = document.querySelector("#region-content")
const dish_name_content = document.querySelector("#dish-name-content")
const price_content = document.querySelector("#price-content")
const cuisine_type_content = document.querySelector("#cuisine-type-content")
const cuisine_name_content = document.querySelector("#cuisine-name-content")
const result_wrapper = document.querySelector(".result-wrapper")
const main_recent_wrapper = document.querySelector(".recent-prediction-info-wrapper")
// Recent Prediction Container
let recent_prediction_info_wrapper= document.querySelector("#recent-prediction-info-wrapper")

// loading data for select element
const load_select = async () => {
    // url
    const region_response = await fetch("https://zomato-42si.onrender.com/region-name")
    const dish_name_response = await fetch("https://zomato-42si.onrender.com/dish-name")
    const cuisine_type_response= await fetch("https://zomato-42si.onrender.com/cuisine_type")
    const cuisine_name_response= await fetch("https://zomato-42si.onrender.com/cuisine")
    // json
    let region_result = await region_response.json()
    let dish_name_result = await dish_name_response.json()
    let cuisine_type_result= await cuisine_type_response.json()
    let cuisine_name_result = await cuisine_name_response.json() 

    region_result.forEach(element => {
        let span= document.createElement("option")
        span.value = element
        span.textContent=element
        region_select.appendChild(span)
    });
    dish_name_result.forEach(element => {
        let option=document.createElement("option")
        option.value=element
        option.textContent=element
        dish_name_select.appendChild(option)
    });
    cuisine_name_result.forEach(element => {
        let option=document.createElement("span")
        option.classList.add("cuisine_type_span")
        option.value=element
        option.textContent=element
        cuisine_name_selector.appendChild(option)
    });
    cuisine_type_result.forEach(element => {
        let option=document.createElement("option")
        option.value=element
        option.textContent=element
        cuisine_type_selector.appendChild(option)
    });

      
}
load_select()

// get load function
const get_loaded = ()=>{

    //variable 
    let total_prediction = localStorage.getItem("total_prediction");
    let name_of_user = JSON.parse(localStorage.getItem("name_of_user")); 
    let recent_data = JSON.parse(localStorage.getItem("Recent Data"));  
    let most_used_model = localStorage.getItem("Most Used Model"); 
    // prediction displayed nav
    total_prediction_container.textContent=total_prediction
    // most used model nav
    most_used_model_container.textContent=most_used_model
    // users-name 
    span_2.textContent= name_of_user[1]
    // Recent used model nav
    recent_used_model_container.textContent= recent_data[0]["model_name"]
    let hashed_model_name_keys= Object.keys(hashed_model_name_url_1)

    // creating option for select element
    hashed_model_name_keys.forEach(element => {
        let option_ele = document.createElement("option")
        option_ele.value=element
        option_ele.textContent=element
        model_list_select.appendChild(option_ele)
    });
    


    

    // Recent Prediction loader
    recent_data.forEach(element => {
       
        let isoString = `${element.session_date}T${element.session_time}`;
        
        let dt = new Date(isoString);
        // making all container and giving class
        let main_wrapper= document.createElement("div")
        main_wrapper.classList.add("recent-prediction-wrapper")
        let cont_1= document.createElement("div")
        cont_1.classList.add("recent-prediction")
        let prediction_result_wrapper= document.createElement("div")
        prediction_result_wrapper.classList.add("prediction_result_wrapper")
        let prediction_title = document.createElement("div")
        prediction_title.classList.add("prediction-result-wrapper")
        let prediction_title_span = document.createElement("span")
        prediction_title_span.classList.add("result")
        prediction_title_span.textContent=element.model_result
        let model_name_wrapper= document.createElement("div")
        model_name_wrapper.classList.add("model-name-wrapper")
        let model_name_span = document.createElement("span")
        model_name_span.classList.add("model-name")
        model_name_span.textContent=element.model_name
        let time_wrapper= document.createElement("div")
        time_wrapper.classList.add("last-date-time-wrapper")
        time_date_span = document.createElement("span")
        time_date_span.classList.add("date-time")
        time_date_span.textContent=element.session_date
        let time_span= document.createElement('span')
        time_span.classList.add("time") 
        time_date_span.textContent = dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
        time_span.textContent = dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });


        // accuracy container
        let accuracy_wrapper= document.createElement("div")
        accuracy_wrapper.classList.add("prediction-accuracy-wrapper")
        let img_wrapper = document.createElement("div")
        img_wrapper.classList.add("img-wrapper")

        let img = document.createElement("img")
        img.alt="Backend_Error"
        img.src="#"
        img.classList.add("img-prediction-accuracy")

      


        // appending all child into cont_1 
        // first container
        cont_1.appendChild(model_name_wrapper)
        model_name_wrapper.appendChild(model_name_span)
        
        // Second container
        cont_1.appendChild(prediction_result_wrapper)
        prediction_result_wrapper.appendChild(prediction_title_span)
        
        // third container
        cont_1.appendChild(time_wrapper)
        time_wrapper.appendChild(time_date_span)
        time_wrapper.appendChild(time_span)
        // recent prediction first container completed

        // appending all child container into accuracy container
        accuracy_wrapper.appendChild(img_wrapper)
        img_wrapper.appendChild(img)
    
  
        
        // appending both container into main_wrapper
        main_wrapper.appendChild(cont_1)
        main_wrapper.appendChild(accuracy_wrapper)

        // appening main wrapper into recent_prediction_info_wrapper

        recent_prediction_info_wrapper.appendChild(main_wrapper)

        // Loading all extra function
      


    })
}

const get_loaded_2 = ()=>{
    // prediction displayed nav
    total_prediction_container.textContent=0
    // most used model nav
    most_used_model_container.textContent="N/A"
    // name of users display 
    span_2.textContent= JSON.parse(localStorage.getItem("users_name"))[1]
    // Recent used model nav
    recent_used_model_container.textContent="N/A"
    let hashed_model_name_keys= Object.keys(hashed_model_name_url)

    // creating option for select element
    hashed_model_name_keys.forEach(element => {
        let option_ele = document.createElement("option")
        option_ele.value=element
        option_ele.textContent=element
        model_list_select.appendChild(option_ele)
    });

        let main_wrapper= document.createElement("div")
        main_wrapper.classList.add("recent-prediction-wrapper")
        let cont_1= document.createElement("div")
        cont_1.classList.add("recent-prediction")
        let prediction_result_wrapper= document.createElement("div")
        prediction_result_wrapper.classList.add("prediction_result_wrapper")
        let prediction_title = document.createElement("div")
        prediction_title.classList.add("predictio-result-wrapper")
        let prediction_title_span = document.createElement("h3")
        prediction_title_span.classList.add("result")
        prediction_title_span.textContent="No Recent History Found"
        let model_name_wrapper= document.createElement("div")
        model_name_wrapper.classList.add("model-name-wrapper")
        let model_name_span = document.createElement("h3")
        model_name_span.textContent="N/A"
        model_name_span.classList.add("model-name")
        let time_wrapper= document.createElement("div")
        time_wrapper.classList.add("last-date-time-wrapper")
        time_date_span = document.createElement("h3")
        time_date_span.classList.add("date-time")
        time_date_span.textContent="N/A"

        // accuracy container
        let accuracy_wrapper= document.createElement("div")
        accuracy_wrapper.classList.add("prediction-accuracy-wrapper")
        let img_wrapper = document.createElement("div")
        img_wrapper.classList.add("img-wrapper")

        let img = document.createElement("img")
        img.alt="Backend_Error"
        img.src="#"
        img.classList.add("img-prediction-accuracy")

        let accuracy_prediction_wrapper = document.createElement("div")
        accuracy_prediction_wrapper.classList.add("accuracy-prediction-wrapper")

        let accuracy_span = document.createElement("span")
        accuracy_span.classList.add("accuracy-heading")
        accuracy_span.classList.textContent="N/A"


        // appending all child into cont_1 
        // first container
        cont_1.appendChild(prediction_result_wrapper)
        prediction_result_wrapper.appendChild(prediction_title_span)
        // second container
        cont_1.appendChild(model_name_wrapper)
        model_name_wrapper.appendChild(model_name_span)
        // third container
        cont_1.appendChild(time_wrapper)
        time_wrapper.appendChild(time_date_span)
        // recent prediction first container completed

        // appending all child container into accuracy container
        accuracy_wrapper.appendChild(img_wrapper)
        img_wrapper.appendChild(img)
       
        // appending both container into main_wrapper
        main_wrapper.appendChild(cont_1)
        main_wrapper.appendChild(accuracy_wrapper)

        // appening main wrapper into recent_prediction_info_wrapper

        recent_prediction_info_wrapper.appendChild(main_wrapper)


        // recent prediction container


}

const get_loaded_3=()=>{
    // variable
    
    let recent_data = JSON.parse(localStorage.getItem("Recent Data"));
    console.log(recent_data)
    // name of user display
    span_2.textContent= recent_data.users_name
    // prediction displayed nav
    total_prediction_container.textContent=1
    // most used model nav
    most_used_model_container.textContent=recent_data.model_name
    // Recent used model nav
    recent_used_model_container.textContent=recent_data.model_name
    let hashed_model_name_keys= Object.keys(hashed_model_name_url)


    // creating option for select element
    hashed_model_name_keys.forEach(element => {
        let option_ele = document.createElement("option")
        option_ele.value=element
        option_ele.textContent=element
        model_list_select.appendChild(option_ele)
    });
      let isoString = `${recent_data.session_date}T${recent_data.session_time}`;
        
        let dt = new Date(isoString);
        // making all container and giving class
        let main_wrapper= document.createElement("div")
        main_wrapper.classList.add("recent-prediction-wrapper")
        let cont_1= document.createElement("div")
        cont_1.classList.add("recent-prediction")
        let prediction_result_wrapper= document.createElement("div")
        prediction_result_wrapper.classList.add("prediction_result_wrapper")
        let prediction_title = document.createElement("div")
        prediction_title.classList.add("prediction-result-wrapper")
        let prediction_title_span = document.createElement("span")
        prediction_title_span.classList.add("result")
        prediction_title_span.textContent=recent_data.model_result
        let model_name_wrapper= document.createElement("div")
        model_name_wrapper.classList.add("model-name-wrapper")
        let model_name_span = document.createElement("span")
        model_name_span.classList.add("model-name")
        model_name_span.textContent=recent_data.model_name
        let time_wrapper= document.createElement("div")
        time_wrapper.classList.add("last-date-time-wrapper")
        time_date_span = document.createElement("span")
        time_date_span.classList.add("date-time")
        time_date_span.textContent=recent_data.session_date
        let time_span= document.createElement('span')
        time_span.classList.add("time") 
        time_date_span.textContent = dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
        time_span.textContent = dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });


        // accuracy container
        let accuracy_wrapper= document.createElement("div")
        accuracy_wrapper.classList.add("prediction-accuracy-wrapper")
        let img_wrapper = document.createElement("div")
        img_wrapper.classList.add("img-wrapper")

        let img = document.createElement("img")
        img.alt="Backend_Error"
        img.src="#"
        img.classList.add("img-prediction-accuracy")

      


        // appending all child into cont_1 
        // first container
        cont_1.appendChild(model_name_wrapper)
        model_name_wrapper.appendChild(model_name_span)
        
        // Second container
        cont_1.appendChild(prediction_result_wrapper)
        prediction_result_wrapper.appendChild(prediction_title_span)
        
        // third container
        cont_1.appendChild(time_wrapper)
        time_wrapper.appendChild(time_date_span)
        time_wrapper.appendChild(time_span)
        // recent prediction first container completed

        // appending all child container into accuracy container
        accuracy_wrapper.appendChild(img_wrapper)
        img_wrapper.appendChild(img)
    
  
        
        // appending both container into main_wrapper
        main_wrapper.appendChild(cont_1)
        main_wrapper.appendChild(accuracy_wrapper)

        // appening main wrapper into recent_prediction_info_wrapper

        recent_prediction_info_wrapper.appendChild(main_wrapper)
}
// Calling  get_loaded function using if condition
if (Content_length ==="No Record"){
    get_loaded_2()
}
else if(Content_length ==="single"){
    console.log("Single")
    get_loaded_3()
}  
else{
    get_loaded()}

const get_selector_detail = () => {
    // Map select IDs to their corresponding content elements
    const selector_obj = {
        "region-selector": region_content,
        "dish-name-selector": dish_name_content,
        "price-for-two": price_content,
        "cuisine-type-selector": cuisine_type_content,
        "cuisine-selector": cuisine_name_content
    };


    // Collect all select elements
    const selectors = [
        region_select,
        dish_name_select,
        price_selector,
        cuisine_type_selector,
        cuisine_name_selector
    ];

    // Attach listeners safely
    selectors.forEach(element => {
        if (element) {
            element.addEventListener("change", (event) => {
                const targetId = element.id;
                if (selector_obj[targetId]) {
                    selector_obj[targetId].textContent = event.target.value;
  
                }
            });
        }
        
    });
};
get_selector_detail()


// --- Reset and Disable Helpers ---
const resetAllSelectors = () => {
  const selectors = [
    "#region-selector",
    "#price-for-two",
    "#cuisine-selector",
    "#cuisine-type-selector",
    "#dish-name-selector"
  ];
  const contents = [
    region_content,
    dish_name_content,
    cuisine_name_content,
    cuisine_type_content,
    price_content
  ];
  const ele_options = document.querySelectorAll(".cuisine_type_span");

  // Reset cuisine selections
  ele_options.forEach(option => option.classList.remove("selected"));

  // Enable all selectors
  selectors.forEach(sel => {
    const ele = document.querySelector(sel);
    if (ele) ele.disabled = false;
  });

  // Clear content
  contents.forEach(content => {
    if (content) content.textContent = "";
  });

  restaurant_info_container.classList.remove("hide");
  prediction_container.classList.add("hide");
};

const disableSelectors = (disabledDict, message = "NOT NEEDED") => {
  Object.keys(disabledDict).forEach(sel => {
    const ele = document.querySelector(sel);
    if (ele) ele.disabled = true;
    if (disabledDict[sel]) disabledDict[sel].textContent = message;
  });
};

// --- Model Setup Functions ---
const get_time_model_detail = () => {
  resetAllSelectors();
  disableSelectors({
    "#dish-name-selector": dish_name_content,
    "#price-for-two": price_content,
    "#cuisine-selector": cuisine_name_content,
    "#cuisine-type-selector": cuisine_type_content
  });
};

const get_trendingCuisine_detail = () => {
  resetAllSelectors();
  disableSelectors({
    "#dish-name-selector": dish_name_content,
    "#price-for-two": price_content,
    "#cuisine-selector": cuisine_name_content,
    "#cuisine-type-selector": cuisine_type_content
  });
};

const get_best_cuisine_detail = () => {
  resetAllSelectors();
  disableSelectors({
    "#region-selector": region_content,
    "#price-for-two": price_content,
    "#cuisine-selector": cuisine_name_content,
    "#cuisine-type-selector": cuisine_type_content
  });
};

const get_cuisine_guessing_model_detail = () => {
  resetAllSelectors();
  disableSelectors({
    "#cuisine-selector": cuisine_name_content,
    "#dish-name-selector": dish_name_content
  });
};

const get_price_model_detail = () => {
  resetAllSelectors();
  disableSelectors({
    "#dish-name-selector": dish_name_content,
    "#price-for-two": price_content
  });
};

// --- Utility ---
const checkNum = (para) => {
  const isNumeric = !isNaN(Number(para));
  console.log(isNumeric);
  return isNumeric;
};

// --- Main Model Handler ---
const get_model_detail = async () => {
  // TIME MODEL
  if (hashed_model_name_url_1[model_list_select.value] === "time-find") {
    model_heading_container.textContent = model_list_select.value;
    model_sub_heading_container.textContent= hashed_model_name_url_2[model_list_select.value]
    get_time_model_detail();
    let openTime;
    let closeTime;
    let result_detail;
    const time_func = async () => {
      const response = await fetch(
        `https://zomato-42si.onrender.com/time-find?region=${region_select.value}`
      );
      const result = await response.json();
      result_detail= Object.values(result)
      openTime = Object.values(result["Opening time"])
      closeTime = Object.values(result["Closing time"])
      
      console.log(Object.values(openTime[0]).toString(), Object.values(closeTime[0]))
      
      if (response.ok) {
        result_wrapper.innerHTML = "";

        restaurant_info_container.classList.add("hide");
        prediction_container.classList.remove("hide");
        prediction_container.classList.add("show");

        // Opening time
        let opening_time_wrapper = document.createElement("div");
        opening_time_wrapper.classList.add("result-container-1");
        let opening_time_heading = document.createElement("h3");
        opening_time_heading.classList.add("result-heading");
        opening_time_heading.textContent = `Best Opening Time in ${region_select.value}`;
        // create span-wrapper for containing all spans
        let span_wrapper = document.createElement("div");
        span_wrapper.classList.add("span-wrapper");
        let opening_time_span = document.createElement("span");
        opening_time_span.classList.add("result-span");
        result_wrapper.appendChild(opening_time_wrapper);
        opening_time_wrapper.appendChild(opening_time_heading);
          // appeand span-wrapper to opening_time_wrapper
        opening_time_wrapper.appendChild(span_wrapper);
        let opening_time_arr = Object.values(result["Opening time"]["Opening time"]);
        opening_time_arr.forEach((time) => {
          let opening_time_span = document.createElement("span");
          opening_time_span.classList.add("result-span");
          opening_time_span.textContent = time;
          opening_time_wrapper.appendChild(opening_time_span);
          span_wrapper.appendChild(opening_time_span);
        })

        // Closing time
        let closing_time_wrapper = document.createElement("div");
        closing_time_wrapper.classList.add("result-container-2");
        let closing_time_heading = document.createElement("h3");
        closing_time_heading.classList.add("result-heading");
        closing_time_heading.textContent = `Best Closing Time in ${region_select.value}`;
        let closing_time_span = document.createElement("span");
        closing_time_span.classList.add("result-span");
        // create span-wrapper for containing all spans
        let span_wrapper_2 = document.createElement("div");
        span_wrapper_2.classList.add("span-wrapper");
        result_wrapper.appendChild(closing_time_wrapper);
        closing_time_wrapper.appendChild(closing_time_heading);
        // appeand span-wrapper to closing_time_wrapper
        closing_time_wrapper.appendChild(span_wrapper_2);
        let closing_time_arr = Object.values(result["Closing time"]["Closing time"]);
        closing_time_arr.forEach((time) => {
          let closing_time_span = document.createElement("span");
          closing_time_span.classList.add("result-span");
          closing_time_span.textContent = time;
          closing_time_wrapper.appendChild(closing_time_span); 
          span_wrapper_2.appendChild(closing_time_span);
        })

        
      } else {
        alert("Some Error Occurred. Please Try Again Later.");
      }
    };

   submit_btn.onclick = async () => {
    await time_func();
    console.log(openTime, closeTime)
    const json_body = {
        userName: userName,
        model_name: model_list_select.value,
        model_result: `Opening-Time:${Object.values(openTime[0]).toString()} Closing-Time:${Object.values(closeTime[0]).toString()}`
    };
     let response = await fetch("https://zomato-42si.onrender.com/get_model_detail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json_body)
    });
    let result = await response.json();
    
};

  }

  // TRENDING CUISINE
  else if (hashed_model_name_url_1[model_list_select.value] === "trendingCuisine") {
    model_heading_container.textContent = model_list_select.value;
    model_sub_heading_container.textContent= hashed_model_name_url_2[model_list_select.value]
    get_trendingCuisine_detail();
    let result_detail;
    const trending_cuisine_func = async () => {
      let response = await fetch(
        `https://zomato-42si.onrender.com/trendingCuisine?region=${region_select.value}`
      );
      let result = await response.json();
      result_detail = result
      
      if (response.ok) {
        result_wrapper.innerHTML = "";

        restaurant_info_container.classList.add("hide");
        prediction_container.classList.remove("hide");
        prediction_container.classList.add("show");

        let wrapper = document.createElement("div");
        wrapper.classList.add("result-container-1");

        let heading = document.createElement("h3");
        heading.classList.add("result-heading");
        heading.textContent = `Top Trending Dish in ${region_select.value}`;
        let span_wrapper = document.createElement("div");
        span_wrapper.classList.add("span-wrapper");
        let cuisine_arr = Object.keys(result);
        cuisine_arr.forEach((dish) => {
          let span = document.createElement("span");
          span.classList.add("result-span");
          span.textContent = dish;
          span_wrapper.appendChild(span);
        })
        
        let chartDiv = document.createElement("div");
        chartDiv.classList.add("result-container-2");
        chartDiv.innerHTML = "";
        chartDiv.id = "piechart";

        result_wrapper.appendChild(wrapper);
        wrapper.appendChild(heading);
        wrapper.appendChild(span_wrapper);
        wrapper.appendChild(chartDiv);

        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(() => {
          var data = google.visualization.arrayToDataTable([
            ["Dish Name", "Number Of Orders"],
            ...Object.entries(result).map(([dish, count]) => [dish, Number(count)])
          ]);

          var options = {title: "Trending Cuisine",backgroundColor: "transparent",width: 300,height: 400,chartArea: { width: '100%', height: '100%' } ,   legend: {position: 'bottom',textStyle: { color: '#444', fontSize: 14 }}};          
          var chart = new google.visualization.PieChart(document.getElementById("piechart"));
          chart.draw(data, options);
        });
      } else {
        alert("Some Error Occurred. Please Try Again Later.");
      }
    };

    submit_btn.onclick = async () => { await trending_cuisine_func()
      const result_dict = {userName:userName, model_name:model_list_select.value, model_result:Object.keys(result_detail).toString()}
      let response = await fetch(`https://zomato-42si.onrender.com/get_model_detail`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(result_dict)
      })
      let result = await response.json()
      console.log(result)
    };
  }

  // BEST CUISINE FOR REGION
  else if (hashed_model_name_url_1[model_list_select.value] === "best_cuisine_for_region") {
    model_heading_container.textContent = model_list_select.value;
    model_sub_heading_container.textContent= hashed_model_name_url_2[model_list_select.value]
    get_best_cuisine_detail();
    let result_detail;
    let cuisine;
    const get_best_cuisine_func = async () => {
      let response = await fetch(
        `https://zomato-42si.onrender.com/best_cuisine_for_region?dish_name=${dish_name_select.value}`
      );
      let result = await response.json();
      result_detail= result
      cuisine= Object.values(result_detail["regions"])
      if (response.ok) {
        result_wrapper.innerHTML = "";

        restaurant_info_container.classList.add("hide");
        prediction_container.classList.remove("hide");
        prediction_container.classList.add("show");

        let wrapper = document.createElement("div");
        wrapper.classList.add("result-container-1");

        let heading = document.createElement("h3");
        heading.classList.add("result-heading");
        heading.textContent = "Best Cuisine For Given Dish";
        let span_wrapper = document.createElement("div")
        span_wrapper.classList.add("span-wrapper")
        let span = document.createElement("span");
        span.classList.add("result-span");
        let region_arr = Object.values(result["regions"][0]);

        region_arr.forEach((region) => {
          let span = document.createElement("span");
          span.classList.add("result-span");
          span.textContent = region;
          span_wrapper.appendChild(span);
        })
        // append span_wrapper to wrapper
        

        let chartDiv = document.createElement("div");
        chartDiv.classList.add("result-container-2");
        chartDiv.id = "piechart";

        result_wrapper.appendChild(wrapper);
        wrapper.appendChild(heading);
        wrapper.appendChild(span_wrapper);
        wrapper.appendChild(chartDiv);

        const regions = Object.values(result["regions"][0]);
        const counts = Object.values(result["counts"][0]);
        console.log(regions ,counts)
        const chartData = regions.map((region, i) => [region, Number(counts[i])]);

        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(() => {
          var data = google.visualization.arrayToDataTable([
            ["Region Name", "Number Of Orders"],
            ...chartData
          ]);

          var options = {title: "Trending Cuisine",backgroundColor: "transparent",width: 300,height: 400,chartArea: { width: '100%', height: '100%' } ,   legend: {position: 'bottom',textStyle: { color: '#444', fontSize: 14 }}};  


          var chart = new google.visualization.PieChart(document.getElementById("piechart"));
          chart.draw(data, options);
        });
      } else {
        alert("Some Error Occurred. Please Try Again Later.");
      }
    };

    submit_btn.onclick = async () => {
      await get_best_cuisine_func() 
      const result_dict = {userName:userName ,model_name:model_list_select.value, model_result:Object.values(cuisine[0]).toString()}
      console.log(result_dict)

      let response = await fetch("https://zomato-42si.onrender.com/get_model_detail", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(result_dict)
      })

      let result = await response.json()
    };
  }

  // PRICE MODEL
  else if (hashed_model_name_url_1[model_list_select.value] === "price_model") {
    model_heading_container.textContent = model_list_select.value;
    model_sub_heading_container.textContent= hashed_model_name_url_2[model_list_select.value]
    get_price_model_detail();
    
    let result_detail;
    let cuisine_name_item = document.querySelectorAll(".cuisine_type_span");
    let value = [];

    cuisine_name_item.forEach(element => {
      element.onclick = () => {
        const cuisineVal = element.dataset.value || element.textContent;

        if (element.classList.contains("selected")) {
          element.classList.remove("selected");
          value = value.filter(v => v !== cuisineVal);
        } else {
          element.classList.add("selected");
          value.push(cuisineVal);
        }

        cuisine_name_content.textContent = value.join(",");
      };
    });

    submit_btn.onclick = async () => {
      let value_dict = {
        "Global": 0,
        "North American": 0,
        "South Indian": 0,
        "North Indian": 0,
        "Exotic Cuisine": 0,
        "European": 0,
        "Asian": 0
      };
      value.forEach(element => {
        value_dict[element] = 1;
      });

      // fetch logic
      let response = await fetch(`https://zomato-42si.onrender.com/price_query_maker?region=${region_select.value}&global_cuisine=${value_dict["Global"]}&North_American=${value_dict["North American"]}&South_indian=${value_dict["South Indian"]}&north_indian=${value_dict["North Indian"]}&exotic_cuisine=${value_dict["Exotic Cuisine"]}&european_cuisine=${value_dict["European"]}&asian=${value_dict["Asian"]}&cuisine_type=${cuisine_type_selector.value}`)

      let result = await response.json();
      let queryPayload = JSON.stringify(result)
      
      if (response.ok) {

        let response_price = await fetch(`https://zomato-42si.onrender.com/price_model?query=${queryPayload}`)
        let final_result = await response_price.json()
        result_detail= final_result
        if (response_price.ok){
          console.log(final_result)
            // create elements
            result_wrapper.innerHTML = ""
            restaurant_info_container.classList.add("hide")
            prediction_container.classList.remove("hide")
            prediction_container.classList.add("show")

            let wrapper = document.createElement("div")
            wrapper.classList.add("result-container-1")
            let heading = document.createElement("h3")
            heading.classList.add("result-heading")
            heading.textContent=`Predicted Price For Two People in ${region_select.value}`
            let span_wrapper = document.createElement("div")
            span_wrapper.classList.add("span-wrapper")
            let span = document.createElement("span")
            span.classList.add("result-span")
            span.textContent=  final_result
            span_wrapper.appendChild(span)

            // append
            result_wrapper.appendChild(wrapper)
            wrapper.appendChild(heading)
            wrapper.appendChild(span_wrapper)
            
            let result_dict = {userName: userName , model_name: model_list_select.value, model_result: result_detail.toString()}
            let response_3  = await fetch("https://zomato-42si.onrender.com/get_model_detail", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(result_dict)
            } )
            let result_3 = await response_3.json()
            console.log(result_3)
        }
      }
      
      
      
    };
  }

  // CUISINE GUESSING MODEL
  else if (hashed_model_name_url_1[model_list_select.value] === "cuisine_guessing_model") {
    model_heading_container.textContent = model_list_select.value;
    model_sub_heading_container.textContent=hashed_model_name_url_2[model_list_select.value]
    get_cuisine_guessing_model_detail();
    let result_detail;
    let get_cuisine_type_func = async () =>{
      let response = await fetch(`https://zomato-42si.onrender.com/cuisineQueryMaker_function?price=${price_selector.value}&region=${region_select.value}&cuisine_type=${cuisine_type_selector.value}`)
      let result = await response.json()
      if (response.ok) {
  // result is [[...]] from cuisineQueryMaker_function
      let arr = result[0]; // take the inner array

  // build query string with repeated params
      let queryString = arr.map(val => `query=${val}`).join("&");

      let response_2 = await fetch(`https://zomato-42si.onrender.com/cuisine_guessing_model?${queryString}`);

      let final_result = await response_2.json();
      result_detail = final_result
      if (response_2.ok){
        // create elements
        result_wrapper.innerHTML = ""
        restaurant_info_container.classList.add("hide")
        prediction_container.classList.remove("hide")
        prediction_container.classList.add("show")
        let wrapper = document.createElement("div")
        wrapper.classList.add("result-container-1")
        let heading = document.createElement("h3")
        heading.classList.add("result-heading")
        heading.textContent=`Predicted Cuisine in ${region_select.value}`
        let span_wrapper = document.createElement("div")
        span_wrapper.classList.add("span-wrapper")
        let prediction_arr = Object.values(final_result["predictions"])
        prediction_arr.forEach(element => {
          let span = document.createElement("span")
          span.classList.add("result-span")
          span.textContent= element
          span_wrapper.appendChild(span)
        });

        // append
        result_wrapper.appendChild(wrapper)
        wrapper.appendChild(heading)
        wrapper.appendChild(span_wrapper)
      }
}

    }
    submit_btn.onclick= async ()=>{ await get_cuisine_type_func()
      let result_dict ={userName:userName, model_name:model_list_select.value, model_result: Object.values(result_detail["predictions"]).toString()}
      let response = await fetch("https://zomato-42si.onrender.com/get_model_detail", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(result_dict)
      })
      let result = await response.json()
      console.log(result)
       
    }
  }
};

// Attach listener
model_list_select.addEventListener("change", () => {
  get_model_detail();

});


// creating sent email function
let contact_input= document.querySelector("#contact-input")
let submit_btn_2   = document.querySelector(".send-mail")




let email_func = ()=>{
    if(contact_input.value.trim().length <1){
        contact_input.value=null
        submit_btn_2.classList.add("hide")
        document.querySelector(".error-contact").classList.remove("hide")
        document.querySelector(".error-contact").textContent ="Enter Valid Message"
        document.querySelector(".error-contact").style.color="red"
       
        setTimeout(()=>{
              
      
              submit_btn_2.classList.remove("hide")
              document.querySelector(".error-contact").classList.add("hide")


        }, 3000)
    }
    else{
        window.location.href=`mailto:gj75345@gmail.com?subject=USERS%20MESSAGE&body=${encodeURIComponent(contact_input.value)}`
        contact_input.value=null
    }

}

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

submit_btn_2.addEventListener('click', email_func)