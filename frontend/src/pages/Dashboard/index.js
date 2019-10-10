import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');
      const data = response.data.map(meetup => {
        return {
          ...meetup,
          formattedDate: format(parseISO(meetup.date), "MMMM do 'at' h:m a"),
        };
      });
      setMeetups(data);
    }

    loadMeetups();
  }, []);

  return (
    <Container>
      <header>
        <strong>My Meetups</strong>
        <button type="button" onClick={() => history.push('/create')}>
          <MdAddCircleOutline size={20} />
          New Meetup
        </button>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Meetup
            key={meetup.id}
            onClick={() => history.push(`/meetup/${meetup.id}`)}
          >
            <div>
              <strong>{meetup.title}</strong>
              <span>{meetup.location}</span>
            </div>
            <div className="time-container">
              <p>{meetup.formattedDate}</p>
              <MdChevronRight size={20} />
            </div>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
