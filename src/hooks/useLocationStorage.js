import { useEffect } from "react";
import { useState } from "react";

export default function useLocationStorage(key, initialValue) {
    
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            console.log("error reading local storage key: ", key);
            return initialValue;
        }
    })

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.log("error writing local storage key: ", key);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}