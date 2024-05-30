'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FilterEvents } from './_components/filter-events';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/events')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching events');
        }
        return response.json();
      })
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleFilterDate = (date) => {
    console.log('Setting filter date to', date);
    setFilterDate(date);
  }

  const handleFilterLocation = (location) => {
    console.log('Setting filter location to', location);
    setFilterLocation(location);
  }

  const filteredEvents = events.filter(event => {
    const currentDate = new Date().toISOString().split('T')[0];
    const isAfterCurrentDate = event.date >= currentDate;
    const matchesDateFilter = !filterDate || (event.date === filterDate && event.date >= currentDate);
    const matchesLocationFilter = !filterLocation || event.location === filterLocation;
    return isAfterCurrentDate && matchesDateFilter && matchesLocationFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Events</h1>
      <div className="mb-8">
        <FilterEvents setFilterDate={handleFilterDate} setFilterLocation={handleFilterLocation} events={events} />
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center text-gray-500">No events available for the selected date and location.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <div key={event._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <Link href={`/dashboard/allevents/${event._id}`}>
                <div>
                  {event.imageId && (
                    <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                    <p className="text-gray-700 mb-2">{event.location}</p>
                    <p className="text-gray-500">{event.date}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
