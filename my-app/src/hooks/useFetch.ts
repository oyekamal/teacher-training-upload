import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T,>(url: string, options?: AxiosRequestConfig): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url, options);
        setData(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;
