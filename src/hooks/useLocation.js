import { useEffect, useState } from "react";

export default function useLocationStorage(key, initialValue) {
    
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            if(item) {
                return JSON.parse(item);
            }

            else {
                return initialValue;
            }
        } 
        
        catch (error) {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue];
}