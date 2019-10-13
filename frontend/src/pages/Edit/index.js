import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import ImageInput from './ImageInput';
import DatePicker from './DatePicker';
import { Container, Button } from './styles';

const schema = Yup.object().shape({
  file_id: Yup.number(),
  title: Yup.string().required('A valid title is required.'),
  description: Yup.string().required('Please, insert a description.'),
  location: Yup.string().required('Please, insert a location.'),
  date: Yup.date()
    .required('Please, insert a date.')
    .min(new Date(), 'Date cannot be in the past'),
});

export default function Edit({ match }) {
  const { meetupId } = match.params;
  const [meetup, setMeetup] = useState({});
  const [textareaVal, setTextareaVal] = useState('');

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`meetups/?meetup=${meetupId}`);

      setMeetup(response.data[0]);
      setTextareaVal(response.data[0].description);
    }

    loadMeetup();
  }, [meetupId]);

  async function handleSubmit(data) {
    try {
      let response = {};
      if (meetupId) {
        response = await api.put(`meetups/${meetupId}`, data);
        toast.success('Meetup Updated');
      } else {
        response = await api.post('meetups', data);
        history.push(`/meetup/${response.data.id}`);
        toast.success('Meetup Created');
      }

      setMeetup(response.data);
    } catch (err) {
      toast.error('Something went wrong!');
    }
  }

  return (
    <Container>
      <Form
        schema={schema}
        initialData={meetup}
        onSubmit={handleSubmit}
        context={{ setMeetup }}
      >
        <ImageInput name="file_id" meetup={meetup} />
        <Input name="title" placeholder="Meetup Title" />
        <Input
          name="description"
          multiline
          rows={4}
          placeholder="Description"
          value={textareaVal}
          onChange={e => setTextareaVal(e.target.value)}
        />
        <Input name="location" placeholder="Location" />
        <DatePicker
          name="date"
          placeholder="Date"
          meetupDate={meetup.date ? new Date(meetup.date) : new Date()}
          date={new Date()}
        />
        <Button type="submit">
          <MdAddCircleOutline />
          {meetupId ? 'Update Meetup' : 'Create Meetup'}
        </Button>
      </Form>
    </Container>
  );
}

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      meetupId: PropTypes.string,
    }),
  }).isRequired,
};
