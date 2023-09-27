import { createContext, useState } from "react"
import { ICountryName, ICountryData, IExchangeRate, cashDataType } from "../types/types";
import { useRequest } from "../customHooks/useRequest";

interface ICountryListProviderProps {
  children: React.ReactNode;
}

interface ICountryDataAndCash {
  data: ICountryName[];
  isLoading: boolean;
  cash: cashDataType;
  setCash: React.Dispatch<React.SetStateAction<cashDataType>>;
}

export const CountryContext = createContext<ICountryDataAndCash>({
  data: [],
  isLoading: false,
  cash: {},
  setCash: () => { },
});

// This context helps us to have access for main data inside the whole app. data is for country list, and cash for cashing data around all app and not just inside specific component.
const CountryListProvider: React.FC<ICountryListProviderProps> = ({ children }) => {
  const { response, isLoading } = useRequest<ICountryName[], []>([], 'https://restcountries.com/v3.1/all?fields=name,flags,cca3,cca2,currencies');
  const [cashStore, setCashStore] = useState<Record<string, ICountryData | IExchangeRate>>({});

  const value = {
    data: response,
    isLoading: isLoading,
    cash: cashStore,
    setCash: setCashStore
  }

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  )
}

export default CountryListProvider;