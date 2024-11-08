import { createContext, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

interface UserType {
  _id: string;
  photo: string;
  name: string;
  designation?: string;
  mobile: string;
  email: string;
  address: string; 
  joiningDate?: Date; 
  dateOfBirth?: Date; 
}

interface ContextType {
  checkOut: Date | null;
  setCheckOut: (date: Date | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  checkIn: Date | null;
  setCheckIn: (date: Date | null) => void;
  rooms: Number;
  adults: Number;
  children: Number;
  bookButton: boolean;
  setbookButton: (bookButton: boolean) => void;
  setrooms: (rooms: Number) => void;
  setadults: (adults: Number) => void;
  setchildren: (children: Number) => void;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const Context = createContext<ContextType>({
  checkOut: null,
  setCheckOut: () => {}, 
  checkIn: null,
  setCheckIn: () => {}, 
  rooms: 0,
  adults: 0,
  children: 0,
  bookButton: false,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setbookButton: () => {},
  setrooms: () => {},
  setadults: () => {},
  setchildren: () => {},
  user: null, 
  setUser: () => {}, 
});

const AppWrapper = () => {
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [rooms, setrooms] = useState<Number>(0);
  const [adults, setadults] = useState<Number>(0);
  const [children, setchildren] = useState<Number>(0);
  const [bookButton, setbookButton] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Add this to state
  const [user, setUser] = useState<UserType | null>(null); // Add user state

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        checkIn,
        checkOut,
        rooms,
        adults,
        children,
        bookButton,
        setbookButton,
        setrooms,
        setadults,
        setchildren,
        setCheckOut,
        setCheckIn,
        user, 
        setUser, 
      }}
    >
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
