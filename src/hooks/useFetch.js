import { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    async function fetchData() {
        try {
            const response = await fetch(url);
            const res = await response.json(); 
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
