'use client';
import React, { useEffect, useState } from 'react';
import BookButton from '../_components/BookButton';
import { useAuth } from "@clerk/nextjs";
import  Link  from 'next/link'
import { Button } from '@/components/ui/button';

const EventDetail = ({ params }) => {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const { isLoaded, userId } = useAuth(); 

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching event details');
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (!event || !isLoaded) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>
          <Link href="/dashboard/allevents">
              <Button className="hover:underline">Back</Button>
            </Link>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{event.title}</h1>
          <p className="text-lg text-gray-600 mb-2">{event.location}</p>
          <p className="text-lg text-gray-600 mb-4">{event.date}</p>
          {event.imageId && (
            <div className="mb-6">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full w-height object-cover rounded-lg"
                />
            </div>
          )}
          <div className="mb-4">
            <p className="text-lg text-gray-600 mb-2"><strong>Price:</strong> {event.price} SEK</p>
            {event.seats > 0 ? (
              <p className="text-lg text-gray-600 mb-2"><strong>Seats Available:</strong> {event.seats}</p>
            ) : (
              <p className="text-lg text-red-500 mb-2">No seats available</p>
            )}
          </div>
          <div className="mb-6">
            <p className="text-lg text-gray-600">{event.description}</p>
          </div>
          {isLoaded && userId && (
            <div className="flex justify-left">
              <BookButton eventId={id} userId={userId} seats={event.seats} />
            </div>
          )}
        </div>
      </div>
    </div>
          </>
  );
};

export default EventDetail;
