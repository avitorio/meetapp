import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, meetupDate }) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    if (meetupDate) {
      setSelected(meetupDate);
    }
    //
  }, [meetupDate]);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.selected',
        clearValue: pickerRef => {
          pickerRef.clear();
        },
      });
    }
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        showTimeSelect
        placeholderText="Click to select a date"
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={new Date()}
        autoComplete="off"
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  meetupDate: PropTypes.instanceOf(Date).isRequired,
};
