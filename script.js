const api = {
    link: "https://api.weatherapi.com/v1/current.json",
    key: "1a330ff7b099465db4d202400240305"
};

document.querySelector(".input").addEventListener("keypress", enter);


function enter(e) {
    if (e.key === "Enter") {
        const input = document.querySelector(".input").value;
        getInfo(input);
    }
}




async function getInfo(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`${api.link}?key=${api.key}&q=${data}`);
            const result = await res.json();
            console.log(result);
            displayResult(result);
            // displayAdvice(result.current.condition.text);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });

}

function displayResult(result){
    let city = document.querySelector("#city");
    city.textContent= result.location.name;
    
    getOurDate();

    let temperatureC = document.querySelector("#temperatureInС");
    temperatureC.innerHTML = ` ${Math.round(result.current.temp_c)}<span>°C</span>`;
    let temperatureF = document.querySelector("#temperatureInF");
    temperatureF.innerHTML = ` ${Math.round(result.current.temp_f)}<span>°F</span>`;

    let windInMPH = document.querySelector("#wind_mph");
    windInMPH.innerHTML = `Wind in mph: ${Math.round(result.current.wind_mph)}<span>mph</span>`;
    let windInKPH = document.querySelector("#wind_kph");
    windInKPH.innerHTML = `Wind in kph: ${Math.round(result.current.wind_kph)}<span>kph</span>`;
   
    let feelslikeinc = document.querySelector("#feelslikeinc");
    feelslikeinc.innerHTML = `Feels like ${Math.round(result.current.feelslike_c)}<span>°C</span>`;
    let feelslikeinf = document.querySelector("#feelslikeinf");
    feelslikeinf.innerHTML = `Feels like ${Math.round(result.current.feelslike_f)}<span>°F</span>`;


    let humidity = document.querySelector("#humidity");
    humidity.textContent = `Humidity: ${result.current.humidity}%`;

    let cloud = document.querySelector("#cloud");
    cloud.textContent = `${result.current.condition.text}`;
    let cloudImage = document.createElement("img");
    cloudImage.src = result.current.condition.icon;
    cloud.appendChild(cloudImage);
    
    let pressure_mb = document.querySelector('#pressure_mb');
    pressure_mb.textContent = `Pressure (mb): ${result.current.pressure_mb} mb`;
    
    let pressure_in = document.querySelector('#pressure_in'); 
    pressure_in.textContent = `Pressure (in): ${result.current.pressure_in} inHg`;
    
    let uv = document.querySelector("#uv");
    uv.textContent = `UV: ${result.current.uv}`;

}

function getOurDate (){
    const myDate = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = days[myDate.getDay()];
    let todayDate = myDate.getDate();
    let month = months[myDate.getMonth()];
    let year = myDate.getFullYear();
    let showDate = document.querySelector("#date");
    showDate.textContent = `${day}` + " " + `${todayDate}` + " " + `${month}` + " " + `${year}` 
}

// advice --------------------------------

function displayAdvice() {
    const adviceContainer = document.getElementById("quote");
    let weatherCondition = document.querySelector("#cloud").textContent;
    console.log(weatherCondition);

if (weatherCondition) {
  if (weatherCondition.includes("sunny")) {
    adviceContainer.innerHTML = "Don't forget to put on SPF!";
  } else if (weatherCondition.includes("Clear")) {
    adviceContainer.innerHTML = "Don't forget to put on SPF anyway!";
  }else if (weatherCondition.includes("rain")) {
    adviceContainer.innerHTML = "Remember to bring an umbrella!";
  } else if (weatherCondition.includes("cloud")) {
    adviceContainer.innerHTML = "It might rain later, so be prepared!";
  } else if (weatherCondition.includes("wind")) {
    adviceContainer.innerHTML = "Hold onto your hats, it's windy out there!";
  } else if (weatherCondition.includes("snow")) {
    adviceContainer.innerHTML = "Bundle up, it's snowing!";
  } else if (weatherCondition.includes("overcast")) {
    adviceContainer.innerHTML = "Expect overcast skies.";
  } else if (weatherCondition.includes("patchy sleet possible")) {
    adviceContainer.innerHTML = "Watch out for possible sleet.";
  } else if (weatherCondition.includes("patchy freezing drizzle possible")) {
    adviceContainer.innerHTML = "Be cautious of freezing drizzle.";
  } else if (weatherCondition.includes("blizzard")) {
    adviceContainer.innerHTML = "Stay indoors, it's a blizzard!";
  } else if (weatherCondition.includes("fog")) {
    adviceContainer.innerHTML = "Drive carefully in the fog.";
  } else if (weatherCondition.includes("drizzle")) {
    adviceContainer.innerHTML = "Take an umbrella for the drizzle.";
  } else if (weatherCondition.includes("sleet")) {
    adviceContainer.innerHTML = "Beware of sleet.";
  } else if (weatherCondition.includes("ice pellets")) {
    adviceContainer.innerHTML = "Be cautious of ice pellets.";
  } else if (weatherCondition.includes("thunder")) {
    adviceContainer.innerHTML = "Stay indoors during thunderstorms.";
  } else {
    adviceContainer.innerHTML = "No specific advice for this condition";
  }
} else {
  adviceContainer.innerHTML = "No specific advice. Enter the city!";
}
    
    

    
}









