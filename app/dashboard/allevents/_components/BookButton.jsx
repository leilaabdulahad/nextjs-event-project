'use client';
import React, { useEffect, useState } from 'react';

const BookButton = ({ eventId, userId }) => {
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleBookEvent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        throw new Error('Error booking event');
      }
      setIsBooked(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button disabled={loading || isBooked} onClick={handleBookEvent}>
        {loading ? 'Booking...' : isBooked ? 'Booked' : 'Book Now'}
      </button>
    </div>
  );
};

export default BookButton;
