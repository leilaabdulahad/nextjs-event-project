'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EventDetail = ({ params }) => {
  const { id } = params;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/events/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error fetching event details');
          }
          return response.json();
        })
        .then(data => {
          setEvent(data);
        })
        .catch(error => console.error('Error:', error));
    }
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.location}</p>
      {event.imageId && (
        <img src={event.image} alt={event.title} width={500} height={300} />
      )}
      <p>{event.date}</p>
      <p>{event.price}</p>
      <p>{event.seats}</p>
      <p>{event.description}</p>
    </div>
  );
};

export default EventDetail;
