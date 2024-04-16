let input = document.getElementById("place");

let btn = document.getElementById("btn").addEventListener("click", function () {
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?unitGroup=metric&key=C9NAS47KLCA72GV5MD7K7HAWZ&contentType=json`;

  fetch(apiUrl)
    // Handle the response asynchronously using the .then() method
    .then((response) => {
      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // If the response is OK, parse the JSON data asynchronously
      return response.json();
    })
    // Handle the parsed JSON data asynchronously using another .then() method
    .then((data) => {
      // Use the fetched data here

      console.log(data.resolvedAddress);
      let title = document.getElementById("title");

      function capitalizeWords(str) {
        // Split the string into an array of words
        const words = str.split(" ");

        // Capitalize the first letter of each word
        const capitalizedWords = words.map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        // Join the capitalized words back into a single string
        return capitalizedWords.join(" ");
      }
      const inputString = data.address;
      const result = capitalizeWords(inputString);

      title.innerText = result;
      let country = document.getElementById("country");

      let str = data.resolvedAddress;
      str = str.split(",");
      str.shift(0);

      str = str.join(",");
      country.innerText = str;

      let icon = document.getElementById("weather");
      const imgElement = document.createElement("img");
      imgElement.src = `./icons/${data.currentConditions.icon}.png`; // Replace 'image.jpg' with the path to your image
      imgElement.alt = data.currentConditions.icon;
      icon.innerHTML = "";
      icon.appendChild(imgElement);

      let temp = document.getElementById("temp");
      temp.innerText = "🌡️ " + data.currentConditions.temp + "°C";
      let conditions = document.getElementById("conditions");
      conditions.innerText = "📝 " + data.currentConditions.conditions;
      let windspeed = document.getElementById("windspeed");
      windspeed.innerText = "💨 " + data.currentConditions.windspeed + "km/h";
    })
    // Handle any errors that occurred during the fetch operation
    .catch((error) => {
      console.error("Error fetching data:", error);

      let title = document.getElementById("title");
      title.innerText = "Something went wrong, try again later!";

      const paragraphs = document.querySelectorAll(".paragraphs");
      paragraphs.forEach((paragraph) => {
        // Do something with each paragraph, for example, log its text content
        paragraph.innerText = "...";
      });
    });
});
