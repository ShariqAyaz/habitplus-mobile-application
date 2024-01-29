// Function to get the current location using geolocation API
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
}

// Function to make a request to the REST API and get the location name
async function getLocationName() {
    try {
        const { latitude, longitude } = await getCurrentLocation();
        const url = `http://localhost:3000/whereami?lat=${latitude}&lon=${longitude}`;
        const response = await fetch(url);
        const data = await response.json();
        const locationName = data.name;
        console.log('Location Name:', locationName);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to get the location name
getLocationName();
