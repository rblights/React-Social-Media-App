import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

// Get the API key from environment variables
const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch a new random image
  const fetchRandomImage = useCallback(async () => {
    if (!UNSPLASH_ACCESS_KEY) {
      setError("Unsplash Access Key not found. Please set REACT_APP_UNSPLASH_ACCESS_KEY in your .env file.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
        params: {
          // You can add query parameters here if needed,
          // e.g., 'query: nature' for random nature images
        }
      });

      // Unsplash provides various image sizes.
      // `urls.raw` gives the highest quality original image.
      // We append parameters to resize it to 1600x900.
      // `fit=crop` ensures the image fills the dimensions without distortion.
      const rawImageUrl = response.data.urls.raw;
      const resizedImageUrl = `${rawImageUrl}&w=1600&h=900&fit=crop&q=80`; // q=80 for quality

      setImageUrl(resizedImageUrl);
    } catch (err) {
      console.error("Error fetching image from Unsplash:", err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Failed to fetch image: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError("Failed to fetch image: No response from server. Check your network or Unsplash API status.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Failed to fetch image: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  // Fetch an image when the component mounts
  useEffect(() => {
    fetchRandomImage();
  }, [fetchRandomImage]); // Re-run if fetchRandomImage changes (it won't with useCallback)

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Random Unsplash Image (1600x900)</h1>
      <button onClick={fetchRandomImage} disabled={loading} style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        marginBottom: '20px',
        marginTop: '20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s'
      }}>
        {loading ? 'Loading...' : 'Get New Image'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {loading && !error && <Spinner message="Loading Unsplash banner image"/>}

      {!loading && imageUrl && (
        <img
          src={imageUrl}
          alt="Random Unsplash"
          style={{
            maxWidth: '100%',
            height: 'auto', // Allows flexibility for smaller screens
            display: 'block',
            margin: '0 auto',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        />
      )}
      {!loading && !imageUrl && !error && (
        <p>No image loaded. Click "Get New Image" to load one.</p>
      )}
    </div>
  );
};

export default RandomImage;
