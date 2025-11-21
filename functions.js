const BASE_URL = 'https://senseitradebot.ru/';

async function getSettings(userId) {
    try {
        // userId теперь в URL как query-параметр
        const response = await fetch(`${BASE_URL}getsettings?userId=${userId}`, {
            method: 'GET',
            headers: {
                // Убираем 'USER': userId, чтобы избежать Preflight
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
        // Возвращаем пустые данные, чтобы не ломать интерфейс
        return { 
            pump: { history: "[]" }, 
            open_interest: { history: "[]" }, 
            liquidation: { history: "[]" }
        };
    }
}

async function changeSettings(userId, newSettings) {
    try {
        // userId теперь в URL как query-параметр
        const response = await fetch(`${BASE_URL}changesettings?userId=${userId}`, {
            method: 'POST',
            headers: {
                // Убираем 'USER': userId, чтобы избежать Preflight
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
        // userId теперь в URL как query-параметр
        const response = await fetch(`${BASE_URL}getuserdata?userId=${userId}`, {
            method: 'GET',
            headers: {
                // Убираем 'USER': userId, чтобы избежать Preflight
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
