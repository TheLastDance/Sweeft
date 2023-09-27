import { useState, useEffect, useContext } from "react";
import { CountryContext } from "../context/CountryListProvider";
import { cashDataType } from "../types/types";

interface UseRequest<R> {
  response: R | [];
  isLoading: boolean;
  error: Error | null;
  setResponse: React.Dispatch<React.SetStateAction<R | []>>;
}

type dependencyArrayType<T> = T[] | [];
type ifCheckerType = string | number | boolean;

// This custom hook handles most of requestes inside applications.
// first arg is used to set dependencyArray of useEffect, second is url for fetch, third is checker inside try block to avoid unneccesary requests
// fourth arg is optional and used only if we need to cash some information inside object, it gives us a key which will be used for specific data.
export function useRequest<R, T>(dependencyArray: dependencyArrayType<T>, url: string, ifChecker: ifCheckerType = true, argCash?: string, headers?: RequestInit): UseRequest<R> {
  const { cash, setCash } = useContext(CountryContext);
  const [response, setResponse] = useState<UseRequest<R>["response"]>([]);
  const [error, setError] = useState<UseRequest<R>["error"]>(null);
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = async () => {
    if (argCash && cash[argCash]) {
      setResponse(cash[argCash] as R);
    } else {
      try {
        if (ifChecker) {
          setIsLoading(true);
          const result: Response = await fetch(url, headers);
          const data: R = await result.json();
          setResponse(data);
          if (argCash) setCash(prev => ({ ...prev, [argCash]: data }) as cashDataType);
        }
      } catch (err) {
        console.log(`Request failed: ${err}`);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    makeRequest();
  }, dependencyArray);

  return {
    response,
    isLoading,
    error,
    setResponse
  };
}