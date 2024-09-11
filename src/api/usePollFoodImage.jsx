import { useState, useEffect } from 'react';
import api from '../config/apiConfig';

const usePollFoodImageStatus = (foodlog_id) => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!foodlog_id) return;

    const fetchStatus = async () => {
      try {
        const response = await api.get(`/api/food/status/${foodlog_id}`);
        setStatus(response.data);
        if (response.data.status === 'complete') {
          // If the status is complete, stop polling
          clearInterval(polling);
        }
        console.log(response.data);
      } catch (err) {
        setError(err);
      }
    };

    const polling = setInterval(fetchStatus, 5000); // Poll every 5 seconds

    // Initial fetch
    fetchStatus();

    return () => clearInterval(polling); // Cleanup interval on unmount
  }, [foodlog_id]);

  return { status, error };
};

export default usePollFoodImageStatus;
