/**
 * Reset function
 */
function reset() {
    // maybe reset all data from the gameLevels.json?
}

/**
 * Fetches data from a single URL using async/await with AbortController and error handling.
 * Aborts the request if it takes longer than 2 seconds.
 * 
 * @param {string} url - The URL to fetch data from.
 */
async function fetchWithAsyncAwaitAbortErrorHandling(url) {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => {
        controller.abort(); // Abort the request after 2 seconds
        console.log("Request aborted");
    }, 2000);

    try {
        console.log("Fetching data with async/await and AbortController...");
        const response = await fetch(url, { signal });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // change logic here
        document.getElementById("results").innerText += "\nData fetched with async/await and AbortController:\n" + JSON.stringify(data, null, 2);
        // change logic here

    } catch (error) {
        if (error.name === 'AbortError') {
            console.error("Fetch aborted:", error.message);
        } else {
            console.error("Error with async/await and AbortController:", error);
        }
    }
}

/**
 * Fetches data from multiple URLs in parallel using Promise.all with AbortController.
 * Aborts all requests if they take longer than 2 seconds.
 * 
 * @param {string[]} urls - An array of URLs to fetch data from.
 */
async function fetchMultipleUrlsAbortErrorHandling(urls) {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => {
        controller.abort(); // Abort all requests after 2 seconds
        console.log("Request aborted");
    }, 2000);

    try {
        console.log("Fetching multiple URLs in parallel with AbortController...");
        const fetchPromises = urls.map(url =>
            fetch(url, { signal }).then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
        );

        const results = await Promise.all(fetchPromises);

        // change logic here
        document.getElementById("results").innerText += "\nFetching multiple URLs in parallel with AbortController:\n" + JSON.stringify(results, null, 2);
        // change logic here

    } catch (error) {
        if (error.name === 'AbortError') {
            console.error("Fetch aborted:", error.message);
        } else {
            console.error("Error fetching multiple URLs with AbortController:", error);
        }
    }
}

/**
 * Fetches data from a URL and uses cached data from localStorage if available.
 * Saves the fetched data to localStorage to avoid redundant network requests.
 * 
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object|undefined>} - Returns the fetched or cached data, or undefined on error.
 */
fetchWithCacheErrorHandling = async (url) => {
    console.log("Fetching data with cache logic...");

    const cacheKey = `cache-${url}`;
    const cachedResponse = localStorage.getItem(cacheKey);

    if (cachedResponse) {
        console.log("Using cached response");

        // Display cached data
        document.getElementById("results").innerText += "\nUsing cached response:\n" + cachedResponse;

        return JSON.parse(cachedResponse);
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        localStorage.setItem(cacheKey, JSON.stringify(data));

        // change logic here
        document.getElementById("results").innerText += "\nData fetched with cache logic:\n" + JSON.stringify(data, null, 2);
        // change logic here

        return data;

    } catch (error) {
        console.error("Error with cache logic:", error.message);
    }
}
