import { useState, useEffect } from "react";

interface UseRequest<R> {
  response: R | [];
  isLoading: boolean;
  error: Error | null;
  setResponse: React.Dispatch<React.SetStateAction<R | []>>;
}

export function useRequest<R>(dependencyArray: string[] | [], url: string, argCash?: string): UseRequest<R> {
  const [response, setResponse] = useState<UseRequest<R>["response"]>([]);
  const [error, setError] = useState<UseRequest<R>["error"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cashStore, setCashStore] = useState<Record<string, R>>({});

  const makeRequest = async () => {
    if (argCash && cashStore[argCash]) {
      setResponse(cashStore[argCash]);
    } else {
      try {
        const result: Response = await fetch(url);
        const data: R = await result.json();
        setResponse(data);
        if (argCash) setCashStore(prev => ({ ...prev, [argCash]: data }));
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