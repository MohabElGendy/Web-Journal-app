/* Global Variables */

// My personal api key from OpenWeatherMap website
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="; 
const key = '&appid=53898d207e83be9b963d3b7351341e65&units=imperial';
const zip = document.querySelector('#zip');
const temp = document.querySelector('#temp');
const generate = document.querySelector('#generate');
const feelings = document.getElementById('feelings');
const entryHolder = document.getElementById('entryHolder');

// Create a new date instance dynamically with JS
const d = new Date();
const date = d.toDateString();


// Listen to an event when clicking the button
    generate.addEventListener('click', (action) => {
    action.preventDefault();

// Creating a URL that is able to access the data
    const myURL = `${baseURL}${zip.value}${key}`

// Chain of orders to follow accordingly 
    getInfo(myURL).then(function(data){
        console.log(data)
// inserting these data into the body
     postData('/add', {date:date, temp: data.main.temp, content:feelings.value });

    updateUI();
     });
     });

// 1st step is to get the data needed from the api using the url
const getInfo = async (url) => {
    try{
        const res = await fetch(url);
        const given = await res.json();
        return given;
    } catch(error) {console.log(alert('something went wrong'), error) }};

//2nd step is to post data into the app using the 'POST' method
const postData = async ( url = '' , data = {} )=> {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },

// For data to be converted into a string
        body: JSON.stringify(data)
    });

try {
    const result = await response.json();
    return result;
}catch(error) {
    console.log(alert('something went wrong'),error)
 }
};

// 3rd step is to show the data on the UI page
const updateUI = async () =>{
    const again = await fetch('/all');
    try {
    const allData = await again.json()
    console.log(allData)

    setTimeout(() => {

generate.style.backgroundColor='#00994C';

entryHolder.style.backgroundColor='rgba(59, 74, 107, .4)';    

// Adding required data to the DOM
document.getElementById('temp').innerHTML = `Tempreture is: ${allData.temp}`

document.getElementById('content').innerHTML = `I feel: ${allData.content}`;

document.getElementById('date').innerHTML = `Date: ${allData.date}`; 

}, 600);
     }
    catch(error) {
      console.log(alert('something went wrong'), error);
    }
   };

   