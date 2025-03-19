import {useState, useEffect} from "react";
import dayjs, {Dayjs} from "dayjs";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            if (item) {
                const parsedItem = JSON.parse(item);
                return typeof parsedItem === "string" && dayjs(parsedItem).isValid()
                    ? (dayjs(parsedItem) as T)
                    : (parsedItem as T);
            }
            return initialValue;
        } catch (error) {
            console.error("Error reading localStorage key:", key, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Error setting localStorage key:", key, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
