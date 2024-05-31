
import { api } from "@/convex/_generated/api";
import { clerkClient } from "@clerk/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const event = await fetchQuery(api.events.getById, { eventId: id });

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { userId } = await request.json();

  try {
    const { id } = params;
    const event = await fetchQuery(api.events.getById, { eventId: id });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (event.seats > 0) {
      await fetchMutation(api.bookings.bookSeat, { userId, eventId: id });
      return NextResponse.json({ status: 'Seat booked' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No seats available' }, { status: 400 });
    }
  } 
  catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { userId } = await request.json();

  try {
    const { id } = params;
    const booking = await fetchQuery(api.bookings.getByEventId_userId, { eventId: id, userId });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    await fetchMutation(api.bookings.cancelBooking, { userId, eventId: id });
    return NextResponse.json({ status: 'Booking cancelled' }, { status: 200 });
  } 
  catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}