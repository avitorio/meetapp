import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import EmptyScreen from '~/components/EmptyScreen';

import { Container, List } from './styles';

Icon.loadFont();

function Subscriptions({ isFocused }) {
  const [loading, setLoading] = useState(false);
  const [meetups, setMeetups] = useState([]);

  async function loadSubscriptions() {
    const response = await api.get('subscriptions');

    const subscriptions = response.data.map(subscription => {
      const { banner } = subscription.Meetup;

      return {
        ...subscription,
        user_id: subscription.Meetup.user_id,
        title: subscription.Meetup.title,
        location: subscription.Meetup.location,
        date: subscription.Meetup.date,
        organizer: { name: subscription.Meetup.organizer.name },
        banner,
        subscribed: true,
      };
    });

    setLoading(false);

    setMeetups(subscriptions);
  }

  useEffect(() => {
    loadSubscriptions();
  }, [isFocused]);

  async function handleUnsubscribe({ meetup_id }) {
    await api.delete(`subscriptions/${meetup_id}`).catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        Alert.alert(error.response.data.error);
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert('Error', 'Something went wrong.');
      }
    });

    const subscriptions = meetups.filter(el => el.meetup_id !== meetup_id);

    setMeetups(subscriptions);
  }

  return (
    <Background>
      <Container>
        {meetups.length === 0 ? (
          <EmptyScreen name="event">
            You haven&apos;t subscribed to any meetups.
          </EmptyScreen>
        ) : (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup onSubscribe={() => handleUnsubscribe(item)} data={item} />
            )}
          />
        )}

        {loading && (
          <ActivityIndicator size="large" color="#FFF" style={{ margin: 10 }} />
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  title: 'Subscriptions',
  tabBarLabel: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="tag" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
