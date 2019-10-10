import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import api from '~/services/api';

import camera from '~/assets/camera.png';

import { Container } from './styles';

export default function ImageInput({ meetup }) {
  const { defaultValue, registerField } = useField('file_id');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    setFile(meetup.banner ? meetup.banner.id : '');
    setPreview(meetup.banner ? meetup.banner.url : camera);
  }, [meetup]);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);
    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }
  return (
    <Container>
      <label htmlFor="file_id">
        <img
          className={preview !== camera ? 'banner' : 'select-image'}
          src={preview}
          alt=""
        />
        <input
          type="file"
          id="file_id"
          accept="image/*"
          data-file={file}
          ref={ref}
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}

ImageInput.propTypes = {
  meetup: PropTypes.shape().isRequired,
};
