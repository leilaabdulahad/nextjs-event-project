'use client';
import React, { useEffect, useState } from 'react';

const BookButton = ({ eventId, userId }) => {
    const [isBooked, setIsBooked] = useState(
      localStorage.getItem(`booked-${eventId}-${userId}`) === 'true'
    );
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
        localStorage.setItem(`booked-${eventId}-${userId}`, 'true');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleUnbookEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, action: 'unbook' }),
        });
  
        if (!response.ok) {
          throw new Error('Error unbooking event');
        }
  
        setIsBooked(false);
        localStorage.setItem(`booked-${eventId}-${userId}`, 'false');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      localStorage.setItem(`booked-${eventId}-${userId}`, isBooked);
    }, [eventId, userId, isBooked]);
  
    return (
      <div>
        {error && <p>{error}</p>}
        <button
          disabled={loading}
          onClick={isBooked? handleUnbookEvent : handleBookEvent}
        >
          {loading? 'Loading...' : isBooked? 'Unbook' : 'Book Now'}
        </button>
      </div>
    );
  };

    export default BookButton;