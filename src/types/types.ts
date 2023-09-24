export interface ICountryProps {
  country: string;
  handleCountry: (name: string) => void;
}

export interface ICountryName {
  name: {
    common: string;
    official: string;
  },
  flags: {
    png: string;
    svg: string;
    alt: string;
  }
}