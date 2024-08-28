const countryDisplay = document.getElementById('countryDisplay');
const result = document.getElementById('result');
const resultContainer = document.getElementById('resultContainer');
const spinButton = document.getElementById('spinButton');
const continentSelect = document.getElementById('continentSelect');
const allCheckbox = document.getElementById('allCheckbox');

let interval;
let spinning = false;
let selectedCountries = [];
const unsplashAccessKey = 'fDuqAcYiI91or6oT4DXgykSO2Xremca8R_c6Ge2u1Jw'; // Replace with your Unsplash API key

// Mapping between English and traditional Chinese country names
const countryMapping = {
    'Afghanistan': '阿富汗', 'Armenia': '亞美尼亞', 'Azerbaijan': '亞塞拜然', 'Bahrain': '巴林',
    'Bangladesh': '孟加拉國', 'Bhutan': '不丹', 'Brunei': '文萊', 'Cambodia': '柬埔寨', 'China': '中國',
    'Georgia': '喬治亞', 'India': '印度', 'Indonesia': '印尼', 'Iran': '伊朗', 'Iraq': '伊拉克', 
    'Israel': '以色列', 'Japan': '日本', 'Jordan': '約旦', 'Kazakhstan': '哈薩克', 'Kuwait': '科威特', 
    'Kyrgyzstan': '吉爾吉斯', 'Laos': '寮國', 'Lebanon': '黎巴嫩', 'Malaysia': '馬來西亞', 
    'Maldives': '馬爾地夫', 'Mongolia': '蒙古', 'Myanmar': '緬甸', 'Nepal': '尼泊爾', 'North Korea': '朝鮮', 
    'Oman': '阿曼', 'Pakistan': '巴基斯坦', 'Palestine': '巴勒斯坦', 'Philippines': '菲律賓', 'Qatar': '卡達', 
    'Saudi Arabia': '沙烏地阿拉伯', 'Singapore': '新加坡', 'South Korea': '韓國', 'Sri Lanka': '斯里蘭卡', 
    'Syria': '敘利亞', 'Tajikistan': '塔吉克', 'Thailand': '泰國', 'East Timor': '東帝汶', 'Turkey': '土耳其', 
    'Turkmenistan': '土庫曼', 'United Arab Emirates': '阿聯酋', 'Uzbekistan': '烏茲別克', 'Vietnam': '越南', 'Yemen': '葉門',
    'Antigua and Barbuda': '安提瓜和巴布達', 'Bahamas': '巴哈馬', 'Barbados': '巴巴多斯', 'Belize': '伯利茲', 'Canada': '加拿大',
    'Costa Rica': '哥斯大黎加', 'Cuba': '古巴', 'Dominican Republic': '多明尼加', 'El Salvador': '薩爾瓦多',
    'Grenada': '格林納達', 'Haiti': '海地', 'Honduras': '宏都拉斯', 'Jamaica': '牙買加', 'Mexico': '墨西哥',
    'Nicaragua': '尼加拉瓜', 'Panama': '巴拿馬', 'Saint Kitts and Nevis': '聖克里斯多福及尼維斯', 'Saint Lucia': '聖露西亞',
    'Saint Vincent and the Grenadines': '聖文森特和格林納丁斯', 'Trinidad and Tobago': '特立尼達和多巴哥', 'United States': '美國', 'Belize': '貝里斯',
    'Argentina': '阿根廷', 'Bolivia': '玻利維亞', 'Brazil': '巴西', 'Chile': '智利', 'Colombia': '哥倫比亞',
    'Ecuador': '厄瓜多爾', 'Guyana': '圭亞那', 'Paraguay': '巴拉圭', 'Peru': '秘魯', 'Suriname': '蘇里南', 'Uruguay': '烏拉圭', 'Venezuela': '委內瑞拉',
    'Albania': '阿爾巴尼亞', 'Andorra': '安道爾', 'Armenia': '亞美尼亞', 'Austria': '奧地利', 'Azerbaijan': '阿塞拜疆', 
    'Belarus': '白俄羅斯', 'Belgium': '比利時', 'Bosnia and Herzegovina': '波斯尼亞和赫塞哥維那', 'Bulgaria': '保加利亞', 'Croatia': '克羅地亞', 
    'Cyprus': '賽普勒斯', 'Czech Republic': '捷克', 'Denmark': '丹麥', 'Estonia': '愛沙尼亞', 'Finland': '芬蘭', 
    'France': '法國', 'Georgia': '喬治亞', 'Germany': '德國', 'Greece': '希臘', 'Hungary': '匈牙利', 
    'Iceland': '冰島', 'Ireland': '愛爾蘭', 'Italy': '義大利', 'Kazakhstan': '哈薩克', 'Kosovo': '科索沃', 
    'Latvia': '拉脫維亞', 'Liechtenstein': '列支敦斯登', 'Lithuania': '立陶宛', 'Luxembourg': '盧森堡', 'Malta': '馬爾他', 
    'Moldova': '摩爾多瓦', 'Monaco': '摩納哥', 'Montenegro': '黑山/蒙特內哥羅', 'Netherlands': '荷蘭', 'North Macedonia': '北馬其頓', 
    'Norway': '挪威', 'Poland': '波蘭', 'Portugal': '葡萄牙', 'Romania': '羅馬尼亞', 'Russia': '俄羅斯', 
    'San Marino': '聖馬力諾', 'Serbia': '塞爾維亞', 'Slovakia': '斯洛伐克', 'Slovenia': '斯洛維尼亞', 'Spain': '西班牙', 
    'Sweden': '瑞典', 'Switzerland': '瑞士', 'Turkey': '土耳其', 'Ukraine': '烏克蘭', 'United Kingdom': '英國', 'Vatican City': '梵蒂岡',
    'Algeria': '阿爾及利亞', 'Angola': '安哥拉', 'Benin': '貝南', 'Botswana': '博茨瓦納', 'Burkina Faso': '布及納法索',
    'Burundi': '布隆迪', 'Cape Verde': '維德角', 'Cameroon': '喀麥隆', 'Central African Republic': '中非共和國', 'Chad': '查德', 
    'Comoros': '葛摩', 'Congo': '剛果', 'Djibouti': '吉布地', 'Egypt': '埃及', 'Equatorial Guinea': '赤道幾內亞', 
    'Eritrea': '厄立垂亞', 'Eswatini': '史瓦帝尼', 'Ethiopia': '衣索比亞', 'Gabon': '加蓬', 'Gambia': '甘比亞', 
    'Ghana': '加納', 'Guinea': '幾內亞', 'Guinea-Bissau': '幾內亞比索', 'Ivory Coast': '象牙海岸', 'Kenya': '肯亞', 
    'Lesotho': '賴索托', 'Liberia': '賴比瑞亞', 'Libya': '利比亞', 'Madagascar': '馬達加斯加', 'Malawi': '馬拉威', 
    'Mali': '馬利', 'Mauritania': '毛里塔尼亞', 'Mauritius': '毛里求斯', 'Morocco': '摩洛哥', 'Mozambique': '莫三比克', 
    'Namibia': '納米比亞', 'Niger': '尼日爾', 'Nigeria': '奈及利亞', 'Rwanda': '盧安達', 'Sao Tome and Principe': '聖多美和普林西比', 
    'Senegal': '塞內加爾', 'Seychelles': '塞席爾', 'Sierra Leone': '塞拉利昂', 'Somalia': '索馬利亞', 'South Africa': '南非', 
    'South Sudan': '南蘇丹', 'Sudan': '蘇丹', 'Tanzania': '坦尚尼亞', 'Togo': '多哥', 'Tunisia': '突尼西亞', 
    'Uganda': '烏干達', 'Zambia': '尚比亞', 'Zimbabwe': '津巴布韋'
};

// Function to update the list of selected countries
function updateSelectedCountries() {
    selectedCountries = [];
    const checkboxes = continentSelect.querySelectorAll('#continentCheckboxes input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const continentCountries = countries[checkbox.value];
        selectedCountries = selectedCountries.concat(continentCountries);
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
        spinButton.textContent = '停止';
        interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * selectedCountries.length);
            const selectedCountryChinese = selectedCountries[randomIndex];
            countryDisplay.textContent = selectedCountryChinese;
        }, 100); // Change country every 100ms
    } else {
        spinning = false;
        clearInterval(interval);
        let selectedCountryChinese = countryDisplay.textContent;
        let selectedCountryEnglish = getKeyByValue(countryMapping, selectedCountryChinese);

        const magicNum = getRandom(10);
        if (magicNum === 1) {
            countryDisplay.textContent = '南極';
            selectedCountryChinese = countryDisplay.textContent;
            selectedCountryEnglish = 'Antarctica';
        }

        spinButton.textContent = '開始';

        setTimeout(() => triggerSearch(`${selectedCountryChinese} 景點`), 1000);
        fetchCountryImage(selectedCountryEnglish, selectedCountryChinese); // Fetch and set the background image for result container

        // Fetch and display a random fact about the country
        fetchCountryFactsInTraditionalChinese(selectedCountryChinese, selectedCountryEnglish);
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

function fetchCountryImage(countryEng, countryChi) {
    const url = `https://api.unsplash.com/search/photos?query=${countryEng}&client_id=${unsplashAccessKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const landscapeImages = data.results.filter(img => img.width > img.height);
            if (landscapeImages.length > 0) {
                const randIdx = getRandom(landscapeImages.length);
                const imageUrl = landscapeImages[randIdx].urls.regular; // Use the first image
                displayResultContainer(countryChi,imageUrl);
                // setBackgroundImage(imageUrl);
            }
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}

// Function to display the result container with a background image and centered text
function displayResultContainer(country, imageUrl) {
    const existingResultContainer = document.getElementById('resultContainer');
    if (existingResultContainer) {
        existingResultContainer.remove();
    }

    const resultContainer = document.createElement('div');
    resultContainer.id = 'resultContainer';
    resultContainer.className = 'card-panel';
    resultContainer.style.position = 'relative';
    resultContainer.style.display = 'flex';
    resultContainer.style.justifyContent = 'center';
    resultContainer.style.alignItems = 'center';
    resultContainer.style.marginTop = '20px';
    // resultContainer.style.padding = '15px';
    resultContainer.style.backgroundImage = `url(${imageUrl})`;
    resultContainer.style.backgroundSize = 'cover';
    resultContainer.style.backgroundPosition = 'center';
    resultContainer.style.height = '200px'; // Set a fixed height
    // resultContainer.style.borderRadius = '10px';
    // resultContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    resultContainer.style.color = 'white'; // Text color for contrast
    resultContainer.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)'; // Add text shadow for readability

    // Create a paragraph element for the country name, centered
    const countryDisplay = document.createElement('p');
    countryDisplay.textContent = `你應該去: ${country}`;
    countryDisplay.className = 'white-text';
    countryDisplay.style.fontWeight = 'bold';
    countryDisplay.style.fontSize = '24px'; // Larger text size
    countryDisplay.style.textAlign = 'center';

    resultContainer.appendChild(countryDisplay);

    // Append the result container after the factContainer
    const parentContainer = spinButton.parentNode;
    parentContainer.insertBefore(resultContainer, spinButton.nextSibling);
}

function setBackgroundImage(imageUrl) {
    resultContainer.style.backgroundImage = `url(${imageUrl})`;
    resultContainer.style.backgroundSize = 'cover';
    resultContainer.style.backgroundPosition = 'center';
    resultContainer.style.color = 'white'; // Ensure text is visible
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

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

window.onload = function () {
    var title = "Search Travel Destinations"; // Your custom title
    var textBox = document.querySelector("#gsc-i-id1");
    if (textBox) {
        textBox.placeholder = title;
        textBox.title = title;
    }
    var button = document.querySelector(".gsc-search-button-v2 svg title");
    if (button) {
        button.innerHTML = title;
    }
}

function fetchCountryFactsInTraditionalChinese(countryChi, countryEng) {
    const fetchDetails = (countryName) => {
        const countryFormatted = countryName.replace(/\s/g, '_');
        const wikiUrl = `https://zh.wikipedia.org/api/rest_v1/page/summary/${countryFormatted}`;
        const unsplashUrl = `https://api.unsplash.com/search/photos?query=${countryFormatted}&client_id=${unsplashAccessKey}`;

        // Fetch the fact from Wikipedia
        return fetch(wikiUrl)
            .then(response => response.json())
            .then(data => {
                const factText = data.extract ? data.extract : '無法取得該國家資訊。';
                // Fetch the image from Unsplash
                return fetch(unsplashUrl)
                    .then(response => response.json())
                    .then(imageData => {
                        // Filter images that are horizontal
                        const landscapeImages = imageData.results.filter(img => img.width > img.height);
                        const randIdx = getRandom(landscapeImages.length);
                        const imageUrl = landscapeImages.length > 0 ? landscapeImages[randIdx].urls.small : '';
                        displayFactAndImage(factText, imageUrl);
                    })
                    .catch(error => {
                        console.error('Error fetching image:', error);
                        displayFactAndImage(factText, '');
                    });
            })
            .catch(error => {
                console.error('Error fetching fact:', error);
                return false; // Indicate failure
            });
    };

    // Try fetching with English name first
    fetchDetails(countryEng)
        .then(success => {
            if (success === false) {
                // If failed, retry with Chinese name
                return fetchDetails(countryChi);
            }
        })
        .catch(error => {
            console.error('Error in fallback fetch:', error);
        });
}

// Function to display the fact and image in a new container below resultContainer
function displayFactAndImage(fact, imageUrl) {
    const existingFactContainer = document.getElementById('factContainer');
    if (existingFactContainer) {
        existingFactContainer.remove();
    }

    const factContainer = document.createElement('div');
    factContainer.id = 'factContainer';
    factContainer.className = 'card blud lighten-4';
    factContainer.style.marginTop = '20px';
    factContainer.style.textAlign = 'center';

    const factCardContent = document.createElement('div');
    factCardContent.className = 'card-content';
    factCardContent.style.display = 'flex';
    factCardContent.style.flexDirection = 'column';
    factCardContent.style.alignItems = 'center';
    factCardContent.style.justifyContent = 'space-between';
    factCardContent.style.padding = '10px';
    
    // Create a div for the image, taking up 50% width
    const factImageDiv = document.createElement('div');
    factImageDiv.style.width = '100%';
    
    const factImage = document.createElement('img');
    factImage.src = imageUrl;
    factImage.alt = 'Country Image';
    // factImage.style.width = '100%'; // Make the image fill the container's width
    factImage.style.height = '200px'; // Maintain aspect ratio
    factImage.style.borderRadius = '10px';
    
    factImageDiv.appendChild(factImage);

    // Create a div for the fact text, taking up 50% width
    const factTextDiv = document.createElement('div');
    factTextDiv.style.width = '100%';
    factTextDiv.style.paddingRight = '10px';

    const factDisplay = document.createElement('p');
    factDisplay.textContent = `${fact}`;
    factDisplay.style.fontStyle = 'italic';
    factDisplay.style.color = '#6c757d';

    factTextDiv.appendChild(factDisplay);

    factCardContent.appendChild(factImageDiv);
    factCardContent.appendChild(factTextDiv);

    factContainer.appendChild(factCardContent);

    // const parentContainer = spinButton.parentNode;
    // parentContainer.insertBefore(factContainer, spinButton.nextSibling);
    // Append the result container after the factContainer
    const resultContainer = document.getElementById('resultContainer').parentNode;
    resultContainer.insertBefore(factContainer, document.getElementById('resultContainer').nextSibling);
}
