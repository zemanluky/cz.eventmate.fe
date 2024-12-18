import React, { createContext, useContext, useState } from "react";

interface FilterContextType {
  filters: {
    location: string| null;
    category: string| null;
    dateStart: string | null;
    dateEnd: string | null;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    location: string | null;
    category: string | null;
    dateStart: string | null;
    dateEnd: string | null;
  }>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState({
    location: null,
    category: null,
    dateStart: null,
    dateEnd: null,
  });
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};