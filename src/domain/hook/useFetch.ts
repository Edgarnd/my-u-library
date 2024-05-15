import { useState } from 'react';
import axios from 'axios';
import useSession from './useSession.tsx';

function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const session = useSession();

  const fetchWithToken = async (url: string, options: any) => {
    setLoading(true);
    setError(null);

    if (!session.logged) {
      setLoading(false);
      setError('Unauthorized, need to login with a session');
      throw error;
    }

    const config = {
      ...options,
      headers: {
        ...options.headers,
        // Authorization: `Bearer ${session.token}`,
      },
    };

    if (config.data) {
      config.method = config.method || 'POST'; //POST by default
    }

    try {
      const response = await axios(url, config);
      // const statusCode = response.status;
      // const responseData = response.data;
      setLoading(false);
      // return { statusCode, ...responseData };
      return response;
    } catch (error) {
      setLoading(false);
      setError(error.message || 'An error ocurred');
      throw error;
    }
  };

  return { loading, error, fetchWithToken };
}

export default useFetch;
