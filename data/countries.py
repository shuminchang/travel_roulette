countryMapping = {
    'Afghanistan': '阿富汗', 'Armenia': '亞美尼亞', 'Azerbaijan': '亞塞拜然', 'Bahrain': '巴林',
    'Bangladesh': '孟加拉國', 'Bhutan': '不丹', 'Brunei': '文萊', 'Cambodia': '柬埔寨', 'China': '中國',
    'Georgia': '喬治亞', 'India': '印度', 'Indonesia': '印尼', 'Iran': '伊朗', 'Iraq': '伊拉克', 
    'Israel': '以色列', 'Japan': '日本', 'Jordan': '約旦', 'Kazakhstan': '哈薩克', 'Kuwait': '科威特', 
    'Kyrgyzstan': '吉爾吉斯', 'Laos': '寮國', 'Lebanon': '黎巴嫩', 'Malaysia': '馬來西亞', 
    'Maldives': '馬爾地夫', 'Mongolia': '蒙古', 'Burma': '緬甸', 'Nepal': '尼泊爾', 'Korea, North': '朝鮮', 
    'Oman': '阿曼', 'Pakistan': '巴基斯坦', 'Gaza Strip': '巴勒斯坦', 'Philippines': '菲律賓', 'Qatar': '卡達', 
    'Saudi Arabia': '沙烏地阿拉伯', 'Singapore': '新加坡', 'Korea, South': '韓國', 'Sri Lanka': '斯里蘭卡', 
    'Syria': '敘利亞', 'Tajikistan': '塔吉克', 'Thailand': '泰國', 'Timor-Leste': '東帝汶', 'Turkey': '土耳其', 
    'Turkmenistan': '土庫曼', 'United Arab Emirates': '阿聯酋', 'Uzbekistan': '烏茲別克', 'Vietnam': '越南', 'Yemen': '葉門',
    'Antigua and Barbuda': '安提瓜和巴布達', 'Bahamas, The': '巴哈馬', 'Barbados': '巴巴多斯', 'Canada': '加拿大',
    'Costa Rica': '哥斯大黎加', 'Cuba': '古巴', 'Dominican Republic': '多明尼加', 'El Salvador': '薩爾瓦多',
    'Grenada': '格林納達', 'Haiti': '海地', 'Honduras': '宏都拉斯', 'Jamaica': '牙買加', 'Mexico': '墨西哥',
    'Nicaragua': '尼加拉瓜', 'Panama': '巴拿馬', 'Saint Kitts and Nevis': '聖克里斯多福及尼維斯', 'Saint Lucia': '聖露西亞',
    'Saint Vincent and the Grenadines': '聖文森特和格林納丁斯', 'Trinidad and Tobago': '特立尼達和多巴哥', 'United States': '美國', 'Belize': '貝里斯',
    'Argentina': '阿根廷', 'Bolivia': '玻利維亞', 'Brazil': '巴西', 'Chile': '智利', 'Colombia': '哥倫比亞',
    'Ecuador': '厄瓜多爾', 'Guyana': '圭亞那', 'Paraguay': '巴拉圭', 'Peru': '秘魯', 'Suriname': '蘇里南', 'Uruguay': '烏拉圭', 'Venezuela': '委內瑞拉',
    'Albania': '阿爾巴尼亞', 'Andorra': '安道爾', 'Austria': '奧地利',
    'Belarus': '白俄羅斯', 'Belgium': '比利時', 'Bosnia and Herzegovina': '波斯尼亞和赫塞哥維那', 'Bulgaria': '保加利亞', 'Croatia': '克羅地亞', 
    'Cyprus': '賽普勒斯', 'Czechia': '捷克', 'Denmark': '丹麥', 'Estonia': '愛沙尼亞', 'Finland': '芬蘭', 
    'France': '法國', 'Germany': '德國', 'Greece': '希臘', 'Hungary': '匈牙利', 
    'Iceland': '冰島', 'Ireland': '愛爾蘭', 'Italy': '義大利', 'Kosovo': '科索沃', 
    'Latvia': '拉脫維亞', 'Liechtenstein': '列支敦斯登', 'Lithuania': '立陶宛', 'Luxembourg': '盧森堡', 'Malta': '馬爾他', 
    'Moldova': '摩爾多瓦', 'Monaco': '摩納哥', 'Montenegro': '黑山/蒙特內哥羅', 'Netherlands': '荷蘭', 'North Macedonia': '北馬其頓', 
    'Norway': '挪威', 'Poland': '波蘭', 'Portugal': '葡萄牙', 'Romania': '羅馬尼亞', 'Russia': '俄羅斯', 
    'San Marino': '聖馬力諾', 'Serbia': '塞爾維亞', 'Slovakia': '斯洛伐克', 'Slovenia': '斯洛維尼亞', 'Spain': '西班牙', 
    'Sweden': '瑞典', 'Switzerland': '瑞士', 'Ukraine': '烏克蘭', 'United Kingdom': '英國', 'Vatican City': '梵蒂岡',
    'Algeria': '阿爾及利亞', 'Angola': '安哥拉', 'Benin': '貝南', 'Botswana': '博茨瓦納', 'Burkina Faso': '布及納法索',
    'Burundi': '布隆迪', 'Cabo Verde': '維德角', 'Cameroon': '喀麥隆', 'Central African Republic': '中非共和國', 'Chad': '查德', 
    'Comoros': '葛摩', 'Congo (Brazzaville)': '剛果', 'Djibouti': '吉布地', 'Egypt': '埃及', 'Equatorial Guinea': '赤道幾內亞', 
    'Eritrea': '厄立垂亞', 'Eswatini': '史瓦帝尼', 'Ethiopia': '衣索比亞', 'Gabon': '加蓬', 'Gambia, The': '甘比亞', 
    'Ghana': '加納', 'Guinea': '幾內亞', 'Guinea-Bissau': '幾內亞比索', 'Côte d’Ivoire': '象牙海岸', 'Kenya': '肯亞', 
    'Lesotho': '賴索托', 'Liberia': '賴比瑞亞', 'Libya': '利比亞', 'Madagascar': '馬達加斯加', 'Malawi': '馬拉威', 
    'Mali': '馬利', 'Mauritania': '毛里塔尼亞', 'Mauritius': '毛里求斯', 'Morocco': '摩洛哥', 'Mozambique': '莫三比克', 
    'Namibia': '納米比亞', 'Niger': '尼日爾', 'Nigeria': '奈及利亞', 'Rwanda': '盧安達', 'Sao Tome and Principe': '聖多美和普林西比', 
    'Senegal': '塞內加爾', 'Seychelles': '塞席爾', 'Sierra Leone': '塞拉利昂', 'Somalia': '索馬利亞', 'South Africa': '南非', 
    'South Sudan': '南蘇丹', 'Sudan': '蘇丹', 'Tanzania': '坦尚尼亞', 'Togo': '多哥', 'Tunisia': '突尼西亞', 
    'Uganda': '烏干達', 'Zambia': '尚比亞', 'Zimbabwe': '津巴布韋'
}

countries = {
    'asia': [
        '阿富汗', '亞美尼亞', '亞塞拜然', '巴林', '孟加拉國', '不丹', '文萊', '柬埔寨', '中國',
        '印度', '印尼', '伊朗', '伊拉克', '以色列', '日本', '約旦', '哈薩克', '科威特', 
        '吉爾吉斯', '寮國', '黎巴嫩', '馬來西亞', '馬爾地夫', '蒙古', '緬甸', '尼泊爾', '朝鮮', 
        '阿曼', '巴基斯坦', '巴勒斯坦', '菲律賓', '卡達', '沙烏地阿拉伯', '新加坡', '韓國', '斯里蘭卡', 
        '敘利亞', '塔吉克', '泰國', '東帝汶', '土耳其', '土庫曼', '阿聯酋', '烏茲別克', '越南', '葉門'
    ],
    'northAmerica': [
        '安提瓜和巴布達', '巴哈馬', '巴巴多斯', '加拿大', '哥斯大黎加', '古巴', '多明尼加', '薩爾瓦多', 
        '格林納達', '海地', '宏都拉斯', '牙買加', '墨西哥', '尼加拉瓜', '巴拿馬', '聖克里斯多福及尼維斯', '聖露西亞', 
        '聖文森特和格林納丁斯', '特立尼達和多巴哥', '美國', '貝里斯'
    ],
    'southAmerica': [
        '阿根廷', '玻利維亞', '巴西', '智利', '哥倫比亞', '厄瓜多爾', '圭亞那', '巴拉圭', '秘魯', '蘇里南', '烏拉圭', '委內瑞拉'
    ],
    'europe': [
        '阿爾巴尼亞', '安道爾', '奧地利', '白俄羅斯', '比利時', '波斯尼亞和赫塞哥維那', '保加利亞', '克羅地亞', 
        '賽普勒斯', '捷克', '丹麥', '愛沙尼亞', '芬蘭', '法國', '喬治亞', '德國', '希臘', '匈牙利', 
        '冰島', '愛爾蘭', '義大利', '科索沃', '拉脫維亞', '列支敦斯登', '立陶宛', '盧森堡', '馬爾他', 
        '摩爾多瓦', '摩納哥', '黑山/蒙特內哥羅', '荷蘭', '北馬其頓', '挪威', '波蘭', '葡萄牙', '羅馬尼亞', '俄羅斯', 
        '聖馬力諾', '塞爾維亞', '斯洛伐克', '斯洛維尼亞', '西班牙', '瑞典', '瑞士', '烏克蘭', '英國', '梵蒂岡'
    ],
    'africa': [
        '阿爾及利亞', '安哥拉', '貝南', '博茨瓦納', '布及納法索', '布隆迪', '維德角', '喀麥隆', '中非共和國', '查德', 
        '葛摩', '剛果', '吉布地', '埃及', '赤道幾內亞', '厄立垂亞', '史瓦帝尼', '衣索比亞', 
        '加蓬', '甘比亞', '加納', '幾內亞', '幾內亞比索', '象牙海岸', '肯亞', '賴索托', '賴比瑞亞', '利比亞', 
        '馬達加斯加', '馬拉威', '馬利', '毛里塔尼亞', '毛里求斯', '摩洛哥', '莫三比克', '納米比亞', '尼日爾', '奈及利亞', 
        '盧安達', '聖多美和普林西比', '塞內加爾', '塞席爾', '塞拉利昂', '索馬利亞', '南非', '南蘇丹', '蘇丹', '坦尚尼亞', 
        '多哥', '突尼西亞', '烏干達', '尚比亞', '津巴布韋'
    ]
}