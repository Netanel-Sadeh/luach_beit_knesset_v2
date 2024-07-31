const config = {
    "shacharit_shabat_1": "06:25",
    "shiur_daf_yomi": "07:00",
    "shacharit_shabat":"08:00",
    "mincha_gdola_shabat": "13:30",
    "mincha_ktana_shabat": "18:30",
    "dvar_tora":"הרב גדעון",
    "shiur_tfila_time": "10:15",
    "shiur_tfila": "הרב בוכריס",
    "shiur_shabat_time": "17:45",
    "shiur_shabat": "הרב אלי, קנאים",
    "shacharit_chol_1":"05:40",
    "shacharit_chol_2":"06:20",
    "shacharit_chol_3":"07:30", 
    "mincha_gdola_chol": "13:30",   
    "odaha_1": "מזל טוב למשפחת פורת לחתונה של ציפי"
};

function updateClock() {
    const clockElement = document.getElementById('digital-clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}


function addMinutesToTime(timeStr, minutesToAdd) {
    // Parse the input time string
    let [hours, minutes] = timeStr.split(':').map(Number);
  
    // Create a Date object representing the time
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
  
    // Add the specified minutes
    date.setMinutes(date.getMinutes() + minutesToAdd);
  
    // Format the new time back into a string
    let newHours = date.getHours().toString().padStart(2, '0');
    let newMinutes = date.getMinutes().toString().padStart(2, '0');
    return `${newHours}:${newMinutes}`;
}
/* 
 * Replaced by Leibovitz times
 *
function displayZmanim() {
    fetch('https://www.hebcal.com/zmanim?cfg=json&geonameid=8199379')
    .then(response => response.json())
    .then(data => {
        document.getElementById('chatzotNight').textContent = `${data.times.chatzotNight.substr(11, 5)}`;
        document.getElementById('alotHaShachar').textContent = `${data.times.alotHaShachar.substr(11, 5)}`;
        document.getElementById('misheyakir').textContent = `${data.times.misheyakir.substr(11, 5)}`;
        document.getElementById('sunrise').textContent = `${data.times.sunrise.substr(11, 5)}`;
        document.getElementById('sofZmanShmaMGA').textContent = `${data.times.sofZmanShmaMGA.substr(11, 5)}`;
        document.getElementById('sofZmanShma').textContent = `${data.times.sofZmanShma.substr(11, 5)}`;
        document.getElementById('sofZmanTfilla').textContent = `${data.times.sofZmanTfilla.substr(11, 5)}`;
        document.getElementById('chatzot').textContent = `${data.times.chatzot.substr(11, 5)}`;
        document.getElementById('minchaGedola').textContent = `${data.times.minchaGedola.substr(11, 5)}`;
        document.getElementById('minchaKetana').textContent = `${data.times.minchaKetana.substr(11, 5)}`;
        document.getElementById('plagHaMincha').textContent = `${data.times.plagHaMincha.substr(11, 5)}`;
        document.getElementById('sunset').textContent = `${data.times.sunset.substr(11, 5)}`;
        document.getElementById('tzeit7083deg').textContent = `${data.times.tzeit7083deg.substr(11, 5)}`;
        
    })
    .catch(error => {
        console.error('Error fetching the Zmanim:', error);
    });
}
*/

function parseDateDDMMYYYY(dateStr) {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date
}

function formatDateToDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with leading zero
    const year = date.getFullYear(); // Get year

    return `${day}-${month}-${year}`; // Format as dd-mm-yyyy
}


let parasha_date = null;

// Get Parasha date from Hebcal
// Retrieve Parasha record from Leibovitz
function displayLeibovitzZmanim() { 
    fetch('https://www.hebcal.com/shabbat?cfg=json&i=on&geonameid=8199379&ue=off&b=28&c=on&M=on&F=on&lg=he&tgt=_top')
    .then(response => response.json())
    .then(data => {
        // Hebcal parasha and daily daf yomi
        parasha = data.items.find( record => record.category === "parashat").hebrew;
        document.getElementById('parasha').textContent = `${parasha}`;
        parasha_date = formatDateToDDMMYYYY(new Date(data.items.find( record => record.category === "parashat").date));
        const today = getTodayDate();
        document.getElementById('daf_yomi').textContent = `${data.items.find( record => (record.category === "dafyomi" && record.date === today)).hebrew}`;
  
        // weekly leibovitz times
        fetch("https://ysadigurs.github.io/luach_beit_knesset/weekly.json")
        .then(response => response.json())
        .then(data => {
            // Shabat 
            const item =  data.find( record => (record["date"] === parasha_date));
            document.getElementById('shabbat-hour').textContent = `${item["adlaka"].substr(0, 5)}`;
            document.getElementById('mincha_ktana_shabat').textContent = `${item["minchashabat"].substr(0, 5)}`; 
            document.getElementById('motzash').textContent = `${item["motzash"].substr(0, 5)}`;
            
            // Zmanim (weekly)
            document.getElementById('chatzotNight').textContent = `${item["hazot"].substr(0, 5)}`;  
            document.getElementById('alotHaShachar').textContent = `${item["alot"].substr(0, 5)}`;
            document.getElementById('misheyakir').textContent = `${item["tzitzit"].substr(0, 5)}`;
            document.getElementById('sunrise').textContent = `${item["netz"].substr(0, 5)}`;
            document.getElementById('sofZmanShmaMGA').textContent = `${item["kshmamagen"].substr(0, 5)}`;
            document.getElementById('sofZmanShma').textContent = `${item["kshmaagra"].substr(0, 5)}`;
            document.getElementById('sofZmanTfilla').textContent = `${item["tfilaagra"].substr(0, 5)}`;
            document.getElementById('chatzot').textContent = `${item["hazot"].substr(0, 5)}`;                      
            document.getElementById('minchaGedola').textContent = `${item["minchagdola"]}`;
            //document.getElementById('plagHaMincha').textContent = `${item["minchahol"]}`; -- missing plag mincha
            document.getElementById('sunset').textContent = `${item["shkia"].substr(0, 5)}`;
            document.getElementById('tzeit').textContent = `${item["tzeit"].substr(0, 5)}`;
            
            // Tfila Hol
            document.getElementById('mincha_ktana_chol').textContent = `${item["minchahol"]}`; 
            document.getElementById('arvit_chol').textContent = `${item["arvithol"]}`; 

        })
        .catch(error => {
            console.error('Error fetching the leibovitz file', error);
        });

        console.log('displayShabbatHours() ends');        
    })
    .catch(error => {
        console.error('Error fetching the Leiboviz hour:', error);
    });
}

function displayShabbatStatic() {
    document.getElementById('shacharit_shabat_1').textContent = `${config.shacharit_shabat_1}`;
    document.getElementById('shacharit_shabat').textContent = `${config.shacharit_shabat}`;
    document.getElementById('mincha_gdola_shabat').textContent = `${config.mincha_gdola_shabat}`;
}

function displayShiurim() {
    document.getElementById('shiur_daf_yomi').textContent = `${config.shiur_daf_yomi}`;
    document.getElementById('dvar_tora').textContent = `${config.dvar_tora}`;
    document.getElementById('shiur_tfila_time').textContent = `${config.shiur_tfila_time}`;
    document.getElementById('shiur_tfila').textContent = `${config.shiur_tfila}`;
    document.getElementById('shiur_shabat_time').textContent = `${config.shiur_shabat_time}`; 
    document.getElementById('shiur_shabat').textContent = `${config.shiur_shabat}`;
}

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function displayChol() {
    const today = getTodayDate();
    fetch(`https://www.hebcal.com/converter?cfg=json&g2h=1&strict=1&date=${today}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('today').textContent = `${data.hebrew}`;
    })
    .catch(error => {
        console.error('Error fetching today:', error);
    });
    document.getElementById('shacharit_chol_1').textContent = `${config.shacharit_chol_1}`;
    document.getElementById('shacharit_chol_2').textContent = `${config.shacharit_chol_2}`;
    document.getElementById('shacharit_chol_3').textContent = `${config.shacharit_chol_3}`;    
     
}


function displayOdahot() {   
    document.getElementById('odaha_1').textContent = `${config.odaha_1}`;
} 

function displayChagim() {    
    fetch('https://www.hebcal.com/shabbat?cfg=json&i=on&geonameid=8199379&ue=off&b=32&c=on&M=on&lg=he&tgt=_top')
    .then(response => response.json())
    .then(data => {
        document.getElementById('chagim_1').textContent = `${data.items.find( record => record.category === "mevarchim").hebrew}`;
    })
    .catch(error => {
        console.error('Error fetching the Odahot:', error);
    });
}


function initApp () {
    setInterval(updateClock, 1000);
    updateClock();
    displayLeibovitzZmanim(); 
    // displayZmanim();   - Replaced by Leibovitz
    displayShabbatStatic();
    displayShiurim();
    displayChol();
    displayChagim();
    displayOdahot();
}

initApp();
