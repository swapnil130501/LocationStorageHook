import { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    async function fetchData() {
        const cacheKey = `cache_${url}`;

        //check if data is already in localStorage
        const cacheData = localStorage.getItem(cacheKey);
        if(cacheData) {
            setData(JSON.parse(cacheData));
        }

        try {
            const response = await fetch(url);
            const res = await response.json(); 

            //store fetched data in localStorage
            localStorage.setItem(cacheKey, JSON.stringify(res));
            setData(res);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url]);

    return [data, error];
}
