import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { MdEdit, MdDeleteForever, MdDateRange, MdPlace } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Details, Description } from './styles';

export default function Meetup({ match }) {
  const { meetupId } = match.params;
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`meetups/?meetup=${meetupId}`);
      setMeetup(response.data);
    }

    loadMeetup();
  }, [meetupId]);

  async function handleCancel() {
    try {
      await api.delete(`/meetups/${meetupId}`);
      toast.success('Meetup deleted!');
      history.push('/dashboard');
    } catch (err) {
      toast.error('Something went wrong');
    }
  }

  return (
    <Container>
      {meetup.map(data => (
        <Details key={data.id}>
          <header>
            <h1>{data.title}</h1>
            <div className="buttons">
              <Link to={`/edit/${meetupId}`} className="edit">
                <MdEdit />
                Edit
              </Link>
              <button className="cancel" type="button" onClick={handleCancel}>
                <MdDeleteForever />
                Cancel
              </button>
            </div>
          </header>
          <Description>
            <img src={data.banner.url} alt={data.title} />
            <p>{data.description}</p>
            <div>
              <span>
                <MdDateRange />
                {format(new Date(data.date), 'Y-M-d h:mm a')}{' '}
              </span>
              <span>
                <MdPlace />
                {data.location}
              </span>
            </div>
          </Description>
        </Details>
      ))}
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      meetupId: PropTypes.string,
    }),
  }).isRequired,
};
