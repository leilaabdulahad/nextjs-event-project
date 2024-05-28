
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function AllEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/events')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching events');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); 
        setEvents(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>All events</h1>
      {events.map(event => (
        <Link href={`/event/allevents/${event._id}`} key={event._id}>
          <div>
            <div>
              <h2>{event.title}</h2>
              <p>{event.location}</p>
              {event.imageId && (
                <img src={event.image} alt={event.title} width={500} height={300} />
              )}
              <p>{event.date}</p>
              <p>{event.price}</p>
              <p>{event.seats}</p>
              <p>{event.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AllEvents;