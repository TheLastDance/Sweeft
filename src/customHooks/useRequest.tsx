import { useState, useEffect, useRef } from "react";

interface UseRequest<R> {
  response: R | [];
  isLoading: boolean;
  error: Error | null;
  // eslint-disable-next-line
  setResponse: React.Dispatch<React.SetStateAction<R | []>>;
}

export function useRequest<R>(url: string): UseRequest<R> {
  const [response, setResponse] = useState<UseRequest<R>["response"]>([]);
  const [error, setError] = useState<UseRequest<R>["error"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dataFetched = useRef(false);

  const makeRequest = async () => {
    try {
      if (!dataFetched.current) {
        dataFetched.current = true;
        const result: Response = await fetch(url);
        const data: R = await result.json();
        setResponse(data);
      }
    } catch (err) {
      console.log(`Request failed: ${err}`);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    makeRequest();
    // eslint-disable-next-line
  }, []);

  return {
    response,
    isLoading,
    error,
    setResponse
  };
}