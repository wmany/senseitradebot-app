
const BASE_URL = 'https://senseitradebot.ru/';

async function getSettings(userId) {
    try {
        const response = await fetch(`${BASE_URL}getsettings`, {
            method: 'GET',
            headers: {
                'USER': userId,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }


        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Response is not JSON");
        }
    } catch (error) {
        console.error('Request failed:', error);
        return null;
    }
}



async function changeSettings(userId, newSettings) {
    try {
        const response = await fetch(`${BASE_URL}changesettings`, {
            method: 'POST',
            headers: {
                'USER': userId,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSettings)
        });

        const data = await response.json();

        if (data.error) {
            console.error('Error updating settings:', data.error);
        } else {
            console.log('Settings updated successfully:', data.message);
        }
        return data;
    } catch (error) {
        console.error('Request failed:', error);
        return null;
    }
}


async function getUserData(userId) {
    try {
        const response = await fetch(`${BASE_URL}getuserdata`, {
            method: 'GET',
            headers: {
                'USER': userId,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.error) {
            console.error('Error fetching user data:', data.error);
        } else {
            console.log('User data:', data);
        }
        return data;
    } catch (error) {
        console.error('Request failed:', error);
        return null;
    }
}

