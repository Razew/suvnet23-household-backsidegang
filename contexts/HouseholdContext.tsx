import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Household } from '../types/types';

type HouseholdContextType = {
  mostRecentHousehold: Household | null;
  setMostRecentHousehold: (household: Household) => void;
};

const HouseholdContext = createContext<HouseholdContextType | undefined>(
  undefined,
);

export const HouseholdProvider = ({ children }: { children: ReactNode }) => {
  const [mostRecentHousehold, setMostRecentHousehold] =
    useState<Household | null>(null);

  return (
    <HouseholdContext.Provider
      value={{ mostRecentHousehold, setMostRecentHousehold }}
    >
      {children}
    </HouseholdContext.Provider>
  );
};

export const useHouseholdContext = () => {
  const context = useContext(HouseholdContext);
  if (!context) {
    throw new Error(
      'useHouseholdContext must be used within a HouseholdProvider',
    );
  }
  return context;
};
