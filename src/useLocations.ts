import React, { useContext } from 'react';
import { locations } from './locations';

const LocationsContext = React.createContext(locations);

export const LocationsProvider = LocationsContext.Provider;

export const useLocations = () => useContext(LocationsContext);
