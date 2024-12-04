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

/**
 * DOM, CSSOM(blocking), BOM, Render tree, reflow/ layout, painting
 * 
 * painting: the process of rendering pixels for each element based on their calculations, style and other info 
 * it involves redering content, background, border and other visual properties
 * css box model - 
 * content -> padding -> border -> margin
 * border box, content box
 * flex-box
 * flex-direction: row
 * flex-wrap: nowrap
 * flex-flow: row nowrap
 * main axis, cross axis
 * justify-content: ...
 * align items: start.... arrange elements on cross-axis
 * flex-basis: 100px(given to child)
 * flex-grow: 1
 */
