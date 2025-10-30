const accessKey = '538fe67faa9a3be2f8642bc851754629';
const city = 'Glendale';
const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${encodeURIComponent(city)}`;

async function getInfo() {
    const info = await fetch(url);
    const info2 = await info.json();
    console.log(info2);
}

getInfo();


