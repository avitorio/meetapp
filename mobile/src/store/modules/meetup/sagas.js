import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { createMeetupSuccess, createMeetupFailure } from './actions';

export function* createMeetup({ payload }) {
  try {
    const { title, description, file_id, ...rest } = payload.data;

    const meetup = {
      title,
      description,
      file_id,
      ...rest,
    };

    const response = yield call(api.put, 'meetups', meetup);

    Alert.alert('Success', 'Meetup Created');

    yield put(createMeetupSuccess(response.data));
  } catch (err) {
    Alert.alert('Error', 'Meetup Not Created.');
    yield put(createMeetupFailure());
  }
}

export default all([takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetup)]);
