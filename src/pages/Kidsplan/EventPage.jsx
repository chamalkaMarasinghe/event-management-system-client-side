import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import EventDetails from '../../components/Base/EventDetails';
import EventDetailsSkeleton from "../../components/skeletons/EventDetailsSkeleton";

const EventPage = () => {
  const { eventId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching time
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  return (
      <>
        <title>Event Details</title>
        <EventDetails id={eventId} />
      </>
  );
};

export default EventPage;