import { createContext, useEffect, useState } from 'react';

export const WorkContext = createContext([]);

export const WorkContextProvider = (props) => {
  const [work, setWork] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setIsLoading(true);
        const req = await fetch('http://localhost:3000/api');
        if (req.status === 200) {
          const res = await req.json();
          setWork([...work, ...res]);
        } else {
          setError(req.statusText);
        }
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchWorks();
  }, [setWork]);

  return (
    <WorkContext.Provider value={{ work, setWork, isLoading, error, setError }}>
      {props.children}
    </WorkContext.Provider>
  );
};
