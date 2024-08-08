const countryDisplay = document.getElementById('countryDisplay');
const result = document.getElementById('result');
const spinButton = document.getElementById('spinButton');
const continentSelect = document.getElementById('continentSelect');
const allCheckbox = document.getElementById('allCheckbox');

let interval;
let spinning = false;
let selectedCountries = [];

// Function to update the list of selected countries
function updateSelectedCountries() {
    selectedCountries = [];
    const checkboxes = continentSelect.querySelectorAll('#continentCheckboxes input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        selectedCountries = selectedCountries.concat(countries[checkbox.value]);
    });

    if (selectedCountries.length > 0) {
        countryDisplay.textContent = '按下按鈕開始';
        spinButton.disabled = false;
    } else {
        countryDisplay.textContent = '選擇一個或多個大洲並按下按鈕開始';
        spinButton.disabled = true;
    }
}

// Attach event listeners to each checkbox
const checkboxes = continentSelect.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.value === 'all') {
            const childCheckboxes = continentSelect.querySelectorAll('#continentCheckboxes input[type="checkbox"]');
            childCheckboxes.forEach(cb => {
                cb.checked = checkbox.checked;
            });
        }
        updateSelectedCountries();
    });
});

spinButton.addEventListener('click', () => {
    if (!spinning) {
        spinning = true;
        result.textContent = '';
        spinButton.textContent = '停止';
        interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * selectedCountries.length);
            let selectedCountry = selectedCountries[randomIndex];
            countryDisplay.textContent = selectedCountry;
        }, 100); // Change country every 100ms
    } else {
        spinning = false;
        clearInterval(interval);
        let selectedCountry = countryDisplay.textContent;

        const x = getRandom(10);
        if (x === 1) {
            selectedCountry = '南極';
            countryDisplay.textContent = selectedCountry;
        }

        result.textContent = `你應該去: ${selectedCountry}!`;
        spinButton.textContent = '開始';

        setTimeout(() => triggerSearch(`${selectedCountry} 景點`), 1000);
    }
});

function getRandom(x) {
    return Math.floor(Math.random() * x);
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
