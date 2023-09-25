export interface ICountryProps {
  country: string | undefined;
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
  },
  flags: {
    png: string;
    svg: string;
    alt: string;
  }
}

export interface ICountryData extends ICountryName {
  tld: string[];
  cca3: string;
  currencies: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
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