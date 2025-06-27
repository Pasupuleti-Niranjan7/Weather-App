// Accessing the DOM elements
// const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.getElementById("cityInput");
const card = document.querySelector(".card");
const apiKey = "ed8bb2e7a16d81c9119e2a17e57dbcfa";
const btn = document.querySelector("button");

// Adding an event listener to the button
btn.addEventListener("click", async (event) => {
  event.preventDefault();

  const city = cityInput.value; // Getting the value from the input field

  if (city) {
    //If input is not empty
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.log("error");
      displayError("Error");
    }
  } else {
    // If input is empty
    displayError("Please enter a city name.");
  }
});

// To fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch data");
  }
  return await response.json();
}

// Displaying the weather
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempdisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  cityDisplay.classList.add("cityDisplay");

  tempdisplay.textContent = `Temperature: ${(temp - 273.15).toFixed(2)}°C`;
  tempdisplay.classList.add("tempDisplay");

  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  humidityDisplay.classList.add("humidityDisplay");

  descDisplay.textContent = description;
  descDisplay.classList.add("descDisplay");

  weatherEmoji.textContent = getWeatherEmoji(id);
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempdisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

// To generate the weather emoji
function getWeatherEmoji(weather) {
  switch (true) {
    case weather >= 200 && weather < 300:
      return "🌩️"; // Thunderstorm
    case weather >= 300 && weather < 400:
      return "🌧️"; // Drizzle
    case weather >= 500 && weather < 600:
      return "🌧️"; // Rain
    case weather >= 600 && weather < 700:
      return "❄️"; // Snow
    case weather >= 700 && weather < 800:
      return "🌫️"; // Atmosphere
    case weather === 800:
      return "☀️"; // Clear
    case weather > 800 && weather < 900:
      return "☁️"; // Clouds
  }
}

// To display an error message
function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
