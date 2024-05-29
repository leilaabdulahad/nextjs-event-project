'use client';
import React, { useEffect, useState } from 'react';
import BookButton from '../_components/BookButton';
import { useAuth } from "@clerk/nextjs"

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

  console.log('isLoaded:', isLoaded);
 

  if (!event || !isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.location}</p>
      {event.imageId && (
        <img 
            src={event.image} 
            alt={event.title} 
            width={500} 
            height={300} 
          />
      )}
      <p>{event.date}</p>
      <p>{event.price}</p>
      <p>{event.seats}</p>
      <p>{event.description}</p>
      {isLoaded && userId && ( 
        <BookButton eventId={id} userId={userId} />
      )}
    </div>
  );
};

export default EventDetail;
