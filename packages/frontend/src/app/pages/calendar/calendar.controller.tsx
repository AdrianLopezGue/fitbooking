import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { boxActions } from '../../actions/box-actions';
import { AthleteContext } from '../../contexts/athlete-context';
import { UserContext } from '../../contexts/user-context';
import { SessionsBookedDTO } from '@fitbooking/contracts';
import { sessionActions } from '../../actions/session-actions';

export const useCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [boxName, setBoxName] = useState('');
  const [bookedSessions, setBookedSessions] = useState<SessionsBookedDTO>([]);
  const { boxId } = useParams();
  const { token, user } = useContext(UserContext);
  const { athlete } = useContext(AthleteContext);
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  useEffect(() => {
    boxActions
      .findBoxById(boxId || '', token)
      .then(result => setBoxName(result.name))
      .catch(error => console.error(error));
  }, [boxId, token]);

  useEffect(() => {
    sessionActions
      .findBookedSessionsByAthleteAndDate(athlete._id, month, year, token)
      .then(response => {
        setBookedSessions(response);
      });
  }, [athlete._id, month, year, token]);

  const handleSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('eN-EN', {
      month: 'long',
    });
  };

  return {
    user,
    month,
    year,
    selectedDate,
    handleSelectedDate,
    formatMonth,
    athlete,
    boxId: boxId || '',
    boxName,
    bookedSessions,
  };
};
