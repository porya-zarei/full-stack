import {useEffect, useRef} from "react";

export const useKeyboard = (key: string, callback: (key?: string) => void,deps?:any[]) => {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === key) {
                callback(key);
            }
        };
        window.addEventListener("keypress", handleKeyPress);
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, [...deps??[],key]);
};
