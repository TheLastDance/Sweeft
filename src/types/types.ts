export interface ICountryProps {
  country: string | undefined;
}

export interface ISearchProps {
  country: string | undefined;
  currencyCountry?: string | undefined;
  handleCurrency?: (item: ICountryName) => void;
}

export interface IExchangeRate {
  motd: {
    msg: string;
    url: string;
  };
  success: boolean;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface ICountryNavigate {
  results: [
    {
      formatted_address: string,
    }
  ]
}

export interface ICountryName {
  name: {
    common: string;
    official: string;
    nativeName: {
      [code: string]: {
        official: string;
        common: string;
      };
    };
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  cca3: string;
  currencies: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
}

export interface ICountryData extends ICountryName {
  tld: string[];
  capital: string[];
  region: string;
  subregion: string;
  languages: {
    [languageCode: string]: string;
  };
  borders: string[];
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
    fra: {
      f: string;
      m: string;
    };
  };
  population: number;
  area: number;
}

export interface ILoadingOverlayProps {
  isVisible: boolean;
}