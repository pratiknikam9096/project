import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        const response = await fetch('http://localhost:5000/api/feedback', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        
        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message.includes('aborted') 
          ? 'Request timed out. Check your connection.' 
          : `Failed to load feedback: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Retry function
  const retryFetch = () => {
    setError(null);
    setLoading(true);
    useEffect(() => fetchFeedbacks(), []);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-gray-600">Loading feedback...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-red-50 rounded-lg text-center">
        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Feedback</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={retryFetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Retry
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Ensure your backend server is running on port 5000
        </p>
      </div>
    );
  }

  // ... rest of your component remains the same ...
};

export default Feedbacks;