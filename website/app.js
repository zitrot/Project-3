/* Global Variables */
const APIKEY = '557fbfb140f5c061afe4c52ed2d91d18';
const ApiKeyId = '&appid=';
const unitsFormat = '&units=metric';
let Base = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


document.getElementById('generate').addEventListener("click", (e) => {
    const zipCodeText = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const url = Base + zipCodeText + ApiKeyId + APIKEY + unitsFormat;
    retrieveData(url)
        .then((data) => {
            postData('/add', { date: newDate, temp: data.main.temp, content: feelings });
        })
        .then(() => {
            return retrieveData('/lastItem');
        })
        .then((data) => {
            let EntryContainer = document.createElement('div');
            let EntryDate = document.createElement('div');
            let EntryTemp = document.createElement('div');
            let EntryContent = document.createElement('div');

            EntryContainer.classList.add("entryHolder");
            EntryDate.classList.add("date");
            EntryTemp.classList.add("temp");
            EntryContent.classList.add("content");

            EntryDate.textContent = data.date;
            EntryTemp.textContent = data.temp;
            EntryContent.textContent = data.content;

            EntryContainer.appendChild(EntryDate);
            EntryContainer.appendChild(EntryTemp);
            EntryContainer.appendChild(EntryContent);

            const EntriesContainer = document.querySelector(".holder.entry");
            EntriesContainer.appendChild(EntryContainer);
            console.log(EntriesContainer);
        });
});


// Async POST
const postData = async(url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Async GET
const retrieveData = async(url = '') => {
    console.log(url);
    const request = await fetch(url);
    try {
        // Transform into JSON
        const wheaterData = await request.json();
        return wheaterData;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

document.addEventListener('DOMContentLoaded', BringOldEntries);

function BringOldEntries() {

    retrieveData('/all')
        .then((ListEntries) => {
            let fragment = new DocumentFragment();
            for (Entry of ListEntries) {
                let EntryContainer = document.createElement('div');
                let EntryDate = document.createElement('div');
                let EntryTemp = document.createElement('div');
                let EntryContent = document.createElement('div');
                EntryContainer.classList.add("entryHolder");
                EntryDate.classList.add("date");
                EntryTemp.classList.add("temp");
                EntryContent.classList.add("content");

                EntryDate.textContent = Entry.date;
                EntryTemp.textContent = Entry.temp;
                EntryContent.textContent = Entry.content;

                EntryContainer.appendChild(EntryDate);
                EntryContainer.appendChild(EntryTemp);
                EntryContainer.appendChild(EntryContent);
                fragment.appendChild(EntryContainer);

            }
            const EntriesContainer = document.querySelector(".holder.entry");
            EntriesContainer.appendChild(fragment);
        });
}