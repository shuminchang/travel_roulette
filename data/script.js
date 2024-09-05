let interval;
let currentCityData = null;
let isSwitching = false;
let cityData = [];
let map;
const unsplashAccessKey = 'fDuqAcYiI91or6oT4DXgykSO2Xremca8R_c6Ge2u1Jw'; // Replace with your Unsplash API key

const startBtn = $('#startBtn');
const stopBtn = $('#stopBtn');
const cityInfo = $('#cityInfo');
const cityIntro = $('#cityIntro');
const cityWiki = $('#cityWiki');
const selectAll = $('#selectAll');

// Load the CSV file using jQuery
$.get('cities.csv', function(data) {
    cityData = parseCSV(data); // Parse CSV data using custom parseCSV function
});

// GCSE Initialization and Placeholder Modification
(function () {
    var cx = '7028e0a4764d14a13'; // Replace with your GCSE ID
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
})();

function parseCSV(data) {
    const lines = data.split('\n');
    const headers = parseCSVLine(lines[0]);

    const result = [];

    // Start from 1 to skip the headers
    for (let i = 1; i < lines.length; i++) {
        const currentLine = parseCSVLine(lines[i]);

        // Skip empty lines
        if (currentLine.length !== headers.length) {
            console.warn(`Skipping row ${i}: Row length does not match header length.`);
            continue;
        }

        const obj = {};

        headers.forEach((header, index) => {
            obj[header.trim()] = currentLine[index] ? currentLine[index].trim() : '';
        });

        result.push(obj);
    }

    return result;
}

// Function to parse individual CSV lines
function parseCSVLine(line) {
    const result = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"' && insideQuotes) {
            // Handle the closing quote (or escaped quotes like "")
            if (line[i + 1] === '"') {
                currentValue += '"'; // Add an escaped quote
                i++; // Skip the next quote
            } else {
                insideQuotes = false; // End of the quoted value
            }
        } else if (char === '"' && !insideQuotes) {
            insideQuotes = true; // Start of a quoted value
        } else if (char === ',' && !insideQuotes) {
            result.push(currentValue); // Add value when not inside quotes
            currentValue = ''; // Reset for the next value
        } else {
            currentValue += char; // Add character to current value
        }
    }

    result.push(currentValue); // Add the last value
    return result;
}

function displayCityMap() {
    if (currentCityData) {
        const targetLat = parseFloat(currentCityData.lat);
        const targetLng = parseFloat(currentCityData.lng);
        
        // Center the map on the selected city coordinates
        const cityLocation = { lat: targetLat, lng: targetLng };
        
        // Initialize Google Map centered at cityLocation
        map = new google.maps.Map(document.getElementById('map'), {
            center: cityLocation,
            zoom: 10 // Set default zoom level
        });
        
        // Add a marker at the city location
        new google.maps.Marker({
            position: cityLocation,
            map: map,
            title: currentCityData.city_ascii // Display city name on hover
        });
    }
}

function getSelectedContinents() {
    const checkboxes = $('input[name="continents"]:checked');
    return checkboxes.map((_, checkbox) => $(checkbox).val()).get();
}

function fetchCity() {
    const continents = getSelectedContinents();

    // Filter the cityData array based on selected continents
    const filteredCities = cityData.filter(city => continents.includes(city.Continent));

    // If there are no continents selected, use all cities
    const randomCity = filteredCities.length ? filteredCities[Math.floor(Math.random() * filteredCities.length)] : cityData[Math.floor(Math.random() * cityData.length)];

    if (isSwitching) {
        currentCityData = randomCity;  // Store the data but don't display it yet
        cityInfo.html(`<h2>${randomCity.city_ascii}, ${randomCity.country}</h2>`);
    }
}

function fetchCityInfoFromWikipedia(cityName) {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}`)
        .then(response => response.json())
        .then(data => {
            if (data.extract) {
                // If the summary is available, display it
                cityIntro.text(`Population: ${currentCityData.population}`);
                cityWiki.text(data.extract);
            } else {
                // If no summary is available, display a default message
                cityIntro.text(`Population: ${currentCityData.population}`);
                cityWiki.text('No introduction available for this city.');
            }
        })
        .catch(error => {
            console.error('Error fetching city information:', error);
            cityWiki.text('Failed to load city information.');
        });
}

function fetchCityWeather(cityName) {
    const APIKey = '2100d8c637af792d2f24976864056a08';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${APIKey}`

    fetch(url)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                return;
            }

            // Get the DOM elements for weather details
            const statusElement = document.querySelector('.weather-box .status');
            const temperatureElement = document.querySelector('.weather-box .temperature');
            const descriptionElement = document.querySelector('.weather-box .description');
            const humidityElement = document.querySelector('.weather-details .humidity span');
            const windElement = document.querySelector('.weather-details .wind span');

            // Update the weather details with the response data
            statusElement.textContent = json.weather[0].main;
            temperatureElement.textContent = `${Math.round(json.main.temp)}°C`;
            descriptionElement.textContent = json.weather[0].description;
            humidityElement.textContent = `${json.main.humidity}%`;
            windElement.textContent = `${Math.round(json.wind.speed)} km/h`;

        })
}

function fetchCityImage(cityName) {
    const url = `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${unsplashAccessKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const landscapeImages = data.results;
            if (landscapeImages.length > 0) {
                const randIdx = getRandom(landscapeImages.length);
                const imageUrl = landscapeImages[randIdx].urls.regular;

                // Set the image source and display the image
                $('#mapImage').attr('src', imageUrl).show();
            } else {
                // Hide the image
                $('#mapImage').hide();
            }
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            $('#mapImage').hide();
        });
}

function getRandom(x) {
    return Math.floor(Math.random() * x);
}

function displayCityDetails() {
    if (currentCityData) {
        const cityName = currentCityData.city_ascii;

        // Fetch the city information from Wikipedia API
        fetchCityInfoFromWikipedia(cityName);

        // Fetch the weather information from Open Weather Map
        fetchCityWeather(cityName);

        // Fetch and display city image
        fetchCityImage(cityName);

        // Display the city map
        displayCityMap();

        // Automatically fill the search bar with the city name and trigger the search
        setTimeout(() => triggerSearch(`${cityName} Attractions`), 1000);
    }
}

function triggerSearch(query) {
    const searchBox = document.querySelector('input.gsc-input');
    const searchButton = document.querySelector('button.gsc-search-button, input.gsc-search-button');
    if (searchBox && searchButton) {
        searchBox.value = query;
        searchButton.click();
    } else {
        setTimeout(() => triggerSearch(query), 100);
    }
}

// Function to search city in GCSE
function searchCityInGCSE(cityName) {
    // Wait for the GCSE search input to be available on the page
    const searchInputInterval = setInterval(function () {
        const searchInput = document.querySelector('.gsc-input');

        if (searchInput) {
            // Stop the interval once the search input is found
            clearInterval(searchInputInterval);

            // Set the value of the search input to the city name
            searchInput.value = cityName;

            // Find the search button and simulate a click to trigger the search
            const searchButton = document.querySelector('.gsc-search-button');
            if (searchButton) {
                searchButton.click();
            }
        }
    }, 500);  // Check every 500 milliseconds until the search input is available
}

startBtn.on('click', function() {
    startBtn.prop('disabled', true);
    stopBtn.prop('disabled', false);
    isSwitching = true;
    interval = setInterval(fetchCity, 100); // Switch cities every 100ms
});

stopBtn.on('click', function() {
    clearInterval(interval);
    isSwitching = false;
    startBtn.prop('disabled', false);
    stopBtn.prop('disabled', true);
    displayCityDetails();  // Display image and intro after stopping
});

selectAll.on('change', function() {
    const checkboxes = $('input[name="continents"]');
    checkboxes.prop('checked', $(this).is(':checked'));
});

function initMap() {
    // Placeholder function required for Google Maps initialization
}
