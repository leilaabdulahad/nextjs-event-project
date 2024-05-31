'use client';
import React, { useEffect, useState } from 'react';
import BookButton from '../_components/BookButton';
import { useAuth } from "@clerk/nextjs"
import Link from 'next/link';
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
    return <div className="flex justify-center items-center h-screen">
             <div className="text-lg font-semibold">Loading...</div>
           </div>;
  }

  return (
    <>
    <div>
      <Link href="/dashboard/allevents">
        <button className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
      </Link>
    </div>
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {event.imageId && (
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <p className="text-lg text-gray-600 mb-2">{event.location}</p>
          <div className="text-lg mb-2">
            <strong>Date:</strong> {event.date}
          </div>
          <div className="text-lg mb-2">
            <strong>Price:</strong> {event.price} SEK
          </div>
          <div className="text-lg mb-2">
            <strong>Seats:</strong> {event.seats}
          </div>
          <p className="text-lg mb-4">{event.description}</p>
          {isLoaded && userId && (
            <BookButton eventId={id} userId={userId} className="mt-4" />
            )}
        </div>
      </div>
    </div>
            </>
  );
};

export default EventDetail;
