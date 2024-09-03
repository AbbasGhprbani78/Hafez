
import { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(prevStatus => !prevStatus)
    }
    return (
        <MyContext.Provider value={{ toggleOpen, isOpen }}>
            {children}
        </MyContext.Provider>
    );
};