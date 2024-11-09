import { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [lastFetchTime, setLastFetchTime] = useState(0);

    const cacheDuration = 6000;

    async function fetchData() {
        const cacheKey = `cache_${url}`;
        const cacheTimestampKey = `cache_${url}_timestamp`;

        //check if data is already in localStorage
        const cacheData = localStorage.getItem(cacheKey);
        const cacheTimestamp = localStorage.getItem(cacheTimestampKey);

        if(cacheData && cacheTimestamp) {
            const isCacheValid = Date.now() - parseInt(cacheTimestamp, 10) < cacheDuration;

            if(isCacheValid) {
                setData(JSON.parse(cacheData));
                return;
            }

            else {
                console.log('Cache expired, clearing localStorage keys');
                localStorage.removeItem(cacheKey);
                console.log(`Removed cache key: ${cacheKey}`);
                localStorage.removeItem(cacheTimestampKey);
                console.log(`Removed cache timestamp key: ${cacheTimestampKey}`);
            }
        }

        try {
            const response = await fetch(url);
            const res = await response.json();

            //store fetched data in localStorage
            localStorage.setItem(cacheKey, JSON.stringify(res));
            localStorage.setItem(cacheTimestampKey, Date.now().toString());

            setData(res);
            setLastFetchTime(Date.now());
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => {
            if(Date.now() - lastFetchTime >= cacheDuration) {
                fetchData();
            }
        }, cacheDuration)

        return () => clearInterval(intervalId);
    }, [url, cacheDuration, lastFetchTime]);

    return [data, error];
}
