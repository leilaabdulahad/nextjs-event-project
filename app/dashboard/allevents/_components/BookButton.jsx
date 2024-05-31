'use client';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"


const BookButton = ({ eventId, userId }) => {
  const [isBooked, setIsBooked] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookingState = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/events/${eventId}?userId=${userId}`);
      const { isBooked, isCancelled } = await response.json();
      setIsBooked(isBooked);
      setIsCancelled(isCancelled);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingState();
  }, [eventId, userId]);



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
  }

  const handleCancelBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        throw new Error('Error cancelling booking');
      }
      setIsCancelled(true);
      setIsBooked(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <Button  disabled={loading || isBooked} onClick={handleBookEvent}>
        {loading ? 'Booking...' : isBooked ? 'Booked' : 'Book Now'}
      </Button>
      {isBooked && !isCancelled && (
        <Button  disabled={loading} onClick={handleCancelBooking}>
          {loading ? 'Cancelling...' : 'Cancel Booking'}
        </Button>
      )}
    </div>
  );
};

export default BookButton;