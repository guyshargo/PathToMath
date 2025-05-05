import React, { useContext, useState, createContext } from 'react';

const GradeContext = createContext();

export const useGrade = () => useContext(GradeContext);

export const GradeProvider = ({ children }) => {
  const [grade, setGrade] = useState(4); 

  return (
    <GradeContext.Provider value={{ grade, setGrade }}>
      {children}
    </GradeContext.Provider>
  );
};