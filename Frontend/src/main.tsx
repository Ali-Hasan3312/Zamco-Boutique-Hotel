import { createContext, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

interface ContextType {
  checkOut: Date | null;
  setCheckOut: (date: Date | null) => void;
  rooms: Number;
  adults: Number;
  children: Number;
  setrooms: (rooms: Number) => void;
  setadults: (adults: Number) => void;
  setchildren: (children: Number) => void;
}

export const Context = createContext<ContextType>({
  checkOut: null,
  setCheckOut: () => {}, // Default function to avoid errors
  rooms: 0,
  adults: 0,
  children: 0,
  setrooms: () => {},
  setadults: () => {},
  setchildren: () => {},
});

const AppWrapper = () => {
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [rooms, setrooms] = useState<Number>(0);
  const [adults, setadults] = useState<Number>(0);
  const [children, setchildren] = useState<Number>(0);


  return (
    <Context.Provider value={{ checkOut,
      rooms,
      adults,
      children,
      setrooms,
      setadults,
      setchildren, setCheckOut,
    
    }}>
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);