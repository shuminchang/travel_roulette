const countryDisplay = document.getElementById('countryDisplay');
const result = document.getElementById('result');
const spinButton = document.getElementById('spinButton');
const continentSelect = document.getElementById('continentSelect');

let interval;
let spinning = false;
let selectedCountries = [];

// Mock function to simulate fetching top places to visit
// function fetchTopPlaces(country) {
//     return new Promise((resolve) => {
//         const mockPlaces = {
//             '日本': ['東京鐵塔', '京都', '富士山', '大阪城', '北海道', '沖繩', '奈良', '日光', '廣島和平紀念公園', '福岡'],
//             '加拿大': ['尼亞加拉大瀑布', '班夫國家公園', '加拿大國家塔', '舊魁北克', '斯坦利公園', '路易斯湖', '布查特花園', '卡皮拉諾吊橋', '惠斯勒', '賈斯珀國家公園'],
//             '巴西': ['救世基督像', '糖麵包山', '伊瓜蘇瀑布', '科帕卡巴納', '亞馬遜雨林', '潘塔納爾', '巴西利亞', '薩爾瓦多', '費爾南多·迪諾羅尼亞', '累西腓'],
//             '法國': ['艾菲爾鐵塔', '羅浮宮博物館', '巴黎聖母院', '凡爾賽宮', '聖米歇爾山', '法國里維埃拉', '尚博爾城堡', '皮拉沙丘', '阿爾薩斯村莊', '盧瓦爾河谷'],
//             '澳大利亞': ['悉尼歌劇院', '大堡礁', '烏魯魯', '悉尼海港大橋', '邦迪海灘', '藍山', '袋鼠島', '大洋路', '弗雷澤島', '丹翠雨林'],
//             '南非': ['桌山', '克魯格國家公園', '好望角', '羅本島', '布萊德河峽谷', '德拉肯斯山脈', '花園大道', '斯泰倫博斯', '維多利亞&阿爾弗雷德海濱', '約翰內斯堡'],
//             '南極': ['麥克默多站', '南極', '欺騙島', '利馬爾海峽', '天堂灣', '洛克羅伊港', '羅斯島', '內科港', '紐邁耶海峽', '埃里伯斯山'],
//         };
//         setTimeout(() => resolve(mockPlaces[country] || []), 1000);
//     });
// }

function updateSelectedCountries() {
    selectedCountries = [];
    const checkboxes = continentSelect.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        selectedCountries = selectedCountries.concat(countries[checkbox.value]);
    });

    if (selectedCountries.length > 0) {
        countryDisplay.textContent = 'Press the button to start';
        spinButton.disabled = false;
    } else {
        countryDisplay.textContent = 'Select one or more continents and press the button to start';
        spinButton.disabled = true;
    }
}

const checkboxes = continentSelect.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateSelectedCountries);
});

spinButton.addEventListener('click', () => {
    if (!spinning) {
        spinning = true;
        result.textContent = '';
        spinButton.textContent = 'Stop';
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
            console.log(x);
            countryDisplay.textContent = '南極'
            selectedCountry = countryDisplay.textContent;
        };

        result.textContent = `You should visit: ${selectedCountry}!`;


        spinButton.textContent = 'Start';

        setTimeout(() => triggerSearch(`${selectedCountry} 景點`), 1000);
        // triggerSearch(`${selectedCountry} 景點`);
        // fetchTopPlaces(selectedCountry).then(places => {
        //     if (places.length > 0) {
        //         const placesList = places.map(place => `<li>${place}</li>`).join('');
        //         result.innerHTML += `<br>Top 10 places to visit in ${selectedCountry}:<ul>${placesList}</ul>`;
        //     } else {
        //         result.innerHTML += '';
        //     }

        //     // Trigger Google search
        // });
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
