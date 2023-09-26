import { useState, useEffect } from "react";

interface UseRequest<R> {
  response: R | [];
  isLoading: boolean;
  error: Error | null;
  setResponse: React.Dispatch<React.SetStateAction<R | []>>;
}

type dependencyArrayType<T> = T[] | [];

// This custom hook handles most of requestes inside applications.
// first arg is used to set dependencyArray of useEffect, second is url for fetch, third is checker inside try block to avoid unneccesary requests
// fourth arg is optional and used only if we need to cash some information inside object
export function useRequest<R, T>(dependencyArray: dependencyArrayType<T>, url: string, ifChecker: string | number | boolean = true, argCash?: string): UseRequest<R> {
  const [response, setResponse] = useState<UseRequest<R>["response"]>([]);
  const [error, setError] = useState<UseRequest<R>["error"]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cashStore, setCashStore] = useState<Record<string, R>>({});

  const makeRequest = async () => {
    if (argCash && cashStore[argCash]) {
      setResponse(cashStore[argCash]);
    } else {
      try {
        if (ifChecker) {
          setIsLoading(true);
          const result: Response = await fetch(url);
          const data: R = await result.json();
          setResponse(data);
          if (argCash) setCashStore(prev => ({ ...prev, [argCash]: data }));
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
    // eslint-disable-next-line
  }, dependencyArray);

  return {
    response,
    isLoading,
    error,
    setResponse
  };
}