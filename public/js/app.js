
const loadWeather = async (location) => {
    try{
    const response = await fetch(`/weather?address=${location}`);
    const weatherData = await response.json();

    return weatherData;
    }
    catch(error){
        console.log(error);
        return error;
    }
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const data = await loadWeather(location);

    if(data.error){
        messageOne.textContent = data.error;
        messageTwo.textContent = '';
    }
    else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.location;
    }

});
