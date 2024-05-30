import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const BookButton = ({ eventId, userId }) => {
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seats, setSeats] = useState(null);
  const router = useRouter();

  const checkBooking = async () => {
    if (!userId) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/events/${eventId}?id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch booking status');
      }
      const data = await response.json();
      setIsBooked(data.isBooked);
      setSeats(data.seats);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkBooking();
  }, [eventId, userId]);

  const handleBookEvent = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (isBooked) {
        response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, action: 'unbook' }),
        });
      } else {
        response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, action: 'book' }),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      // Fetch the updated event data
      const updatedEventResponse = await fetch(`http://localhost:3000/api/events/${eventId}`);
      const updatedEvent = await updatedEventResponse.json();

      setIsBooked(!isBooked); 
      setSeats(updatedEvent.seats); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Button onClick={handleBookEvent} disabled={loading || (!isBooked && seats <= 0)}>
        {isBooked ? 'Unbook' : (seats <= 0 ? 'No seats available' : 'Book now')}
      </Button>
    </div>
  );
};

export default BookButton;
