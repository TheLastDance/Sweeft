import { createContext } from "react"
import { ICountryName } from "../types/types";
import { useRequest } from "../customHooks/useRequest";

interface ICountryListProviderProps {
  children: React.ReactNode;
}

interface ICountryNameData {
  data: ICountryName[];
  isLoading: boolean;
}

export const CountryContext = createContext<ICountryNameData>({
  data: [],
  isLoading: false
});

const CountryListProvider: React.FC<ICountryListProviderProps> = ({ children }) => {
  const { response, isLoading } = useRequest<ICountryName[]>([], 'https://restcountries.com/v3.1/all?fields=name,flags,cca3,currencies');

  const value = {
    data: response,
    isLoading: isLoading
  }

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  )
}

export default CountryListProvider;