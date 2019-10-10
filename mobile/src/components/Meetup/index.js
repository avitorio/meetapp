import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';

import MeetupButton from './MeetupButton';

import {
  Container,
  Banner,
  Info,
  Title,
  Organizer,
  DetailText,
  MeetupDetail,
  DetailIcon,
} from './styles';

export default function Meetup({ data, onSubscribe }) {
  const user_id = useSelector(state => state.user.profile.id);
  const dateParse = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), { addSuffix: true });
  }, [data.date]);
  return (
    <Container past={data.past}>
      <Banner
        source={{
          uri: data.banner
            ? data.banner.url
            : `https://api.adorable.io/avatars/51/${data.name}.png`,
        }}
      />
      <Info>
        {data.user_id === user_id && (
          <Organizer>You are the organizer.</Organizer>
        )}
        <Title>{data.title}</Title>
        <MeetupDetail>
          <DetailIcon name="event" />
          <DetailText>{dateParse}</DetailText>
        </MeetupDetail>
        <MeetupDetail>
          <DetailIcon name="location-on" />
          <DetailText>{data.location}</DetailText>
        </MeetupDetail>
        <MeetupDetail>
          <DetailIcon name="person" />
          <DetailText>{data.organizer.name}</DetailText>
        </MeetupDetail>
        {data.user_id !== user_id && !data.past && (
          <MeetupButton onPress={onSubscribe} subscribed={data.subscribed}>
            {data.subscribed ? 'Unsubscribe' : 'RSVP'}
          </MeetupButton>
        )}
      </Info>
    </Container>
  );
}
