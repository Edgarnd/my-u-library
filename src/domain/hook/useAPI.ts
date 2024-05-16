import { useState } from 'react';
import useFetch from './useFetch.ts';

function useAPI() {
  const { loading, fetchWithToken } = useFetch();
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [error, setError] = useState(null);
  const [requestInProgress, setRequestInProgress] = useState(false);

  const fetchData = async (urlPath: string, options: any) => {
    if (requestInProgress) {
      return;
    }

    setRequestInProgress(true);
    setStatusCode(null);
    setError(null);

    try {
      const response = await fetchWithToken(urlPath, options);

      setStatusCode(response.status);
      setRequestInProgress(false);

      if (statusCode !== null) {
        if (statusCode === 400) {
        } else if (statusCode === 401) {
        } else if (statusCode === 404) {
        } else if (statusCode >= 500) {
        }
      }


      return response;
    } catch (error: any) {
      setError(error.message);
      setRequestInProgress(false);
    }
  };

  return { loading, statusCode, error, fetchData };
}

export default useAPI;
