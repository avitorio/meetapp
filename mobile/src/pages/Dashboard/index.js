import React, { useMemo, useEffect, useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { format, subDays, addDays } from 'date-fns';

import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import EmptyScreen from '~/components/EmptyScreen';

import { Container, List, DateScroller, CurrentDate } from './styles';

function Dashboard({ isFocused }) {
  if (Platform.OS !== 'ios') {
    StatusBar.setBackgroundColor('#181620');
  }

  const [loading, setLoading] = useState(true);
  const [loadedAll, setLoadedAll] = useState(false);
  const [date, setDate] = useState(new Date());
  const formattedDate = useMemo(() => format(date, 'do MMM'), [date]);
  const requestDate = useMemo(() => format(date, 'yyyy-MM-dd'), [date]);
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);

  function resetScreen() {
    setMeetups([]);
    setPage(1);
    setLoadedAll(false);
  }

  function handlePrevDay() {
    resetScreen();
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    resetScreen();
    setDate(addDays(date, 1));
  }

  function loadMore(loadPage) {
    if (!loadedAll) {
      setLoading(true);
      setPage(loadPage + 1);
    }
  }

  async function loadMeetups(loadDate, loadPage) {
    const meetupsResponse = await api.get(
      `meetups/?date=${loadDate}&page=${loadPage}`
    );

    if (meetupsResponse.data.length > 0) {
      setLoading(false);
      const subscriptions = await api.get('subscriptions');

      setMeetups(prevMeetups => [
        ...prevMeetups,
        ...meetupsResponse.data.map(meetup => {
          return subscriptions.data.some(e => e.meetup_id === meetup.id)
            ? {
                ...meetup,
                subscribed: true,
              }
            : {
                ...meetup,
                subscribed: false,
              };
        }),
      ]);
    } else if (loadPage === 1) {
      setMeetups(meetupsResponse.data);
      setLoadedAll(true);
      setLoading(false);
    } else {
      setLoadedAll(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups(requestDate, page);
    } else {
      resetScreen();
    }
  }, [isFocused, page, requestDate]);

  async function handleRSVP({ id, subscribed }) {
    if (!subscribed) {
      const response = await api
        .post('subscriptions', { meetup_id: id })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            Alert.alert(error.response.data.error);
          } else {
            // Something happened in setting up the request that triggered an Error
            Alert.alert('Error', 'Something went wrong.');
          }
        });

      if (response) {
        setMeetups(
          meetups.map(meetup =>
            meetup.id === id
              ? {
                  ...meetup,
                  subscribed: true,
                }
              : {
                  ...meetup,
                }
          )
        );
      }
    } else {
      const response = await api.delete(`subscriptions/${id}`).catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          Alert.alert(error.response.data.error);
        } else {
          // Something happened in setting up the request that triggered an Error
          Alert.alert('Error', 'Something went wrong.');
        }
      });

      if (response) {
        setMeetups(
          meetups.map(meetup =>
            meetup.id === id
              ? {
                  ...meetup,
                  subscribed: false,
                }
              : {
                  ...meetup,
                }
          )
        );
      }
    }
  }

  return (
    <Background>
      <Container>
        <DateScroller>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={50} color="#FFF" />
          </TouchableOpacity>
          <CurrentDate>{formattedDate}</CurrentDate>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={50} color="#FFF" />
          </TouchableOpacity>
        </DateScroller>
        {page === 1 && loadedAll === true ? (
          <EmptyScreen name="filter-drama" marginBottom="70px">
            {`There are no meetings on ${formattedDate}.`}
          </EmptyScreen>
        ) : (
          <List
            onEndReachedThreshold={0.1}
            onEndReached={() => loadMore(page)}
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup onSubscribe={() => handleRSVP(item)} data={item} />
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

Dashboard.navigationOptions = {
  title: 'Meetups',
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
