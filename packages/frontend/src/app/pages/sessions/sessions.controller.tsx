import { SessionDTO } from '@fitbooking/contracts';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { UserContext } from '../../contexts/user-context';
import { AthleteContext } from '../../contexts/athlete-context';
import { boxActions } from '../../actions/box-actions';
import { sessionActions } from '../../actions/session-actions';

export const useSessionPage = () => {
  const socketReference = useRef<Socket>();
  const [sessions, setSessions] = useState<SessionDTO[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarIsShown, showCalendar] = useState(false);
  const [boxName, setBoxName] = useState('');
  const { boxId } = useParams();
  const { token, user } = useContext(UserContext);
  const { athlete } = useContext(AthleteContext);

  useEffect(() => {
    boxActions
      .findBoxById(boxId || '', token)
      .then(result => setBoxName(result.name))
      .catch(error => console.error(error));
  });

  useEffect(() => {
    const formattedDate = `${selectedDate.getFullYear()}-${
      selectedDate.getMonth() + 1
    }-${selectedDate.getDate()}`;

    sessionActions
      .findSessionsByDateAndBox(formattedDate, boxId || '', token)
      .then(result => setSessions(result))
      .catch(error => console.error(error));
  }, [selectedDate, token, boxId]);

  useEffect(() => {
    if (!socketReference.current) {
      const formattedDate = `${selectedDate.getFullYear()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`;
      socketReference.current = io('http://localhost:8080', {
        query: { boxId, date: formattedDate },
      });

      socketReference.current.on('connect', () => {
        console.log('Connected');
      });

      socketReference.current.on('exception', data => {
        console.log('event', data);
      });

      socketReference.current.on('disconnect', () => {
        console.log('Disconnected');
      });

      socketReference.current.on('classReserved', data => {
        setSessions(previousSessions => {
          const updatedSessions = [...previousSessions];
          const sessionIndex = updatedSessions.findIndex(
            session => session._id === data.sessionId,
          );
          if (sessionIndex !== -1) {
            const updatedSession = { ...updatedSessions[sessionIndex] };
            updatedSession.assistants = [
              ...updatedSession.assistants,
              data.assistantRegistered,
            ];
            updatedSessions[sessionIndex] = updatedSession;
          }
          return updatedSessions;
        });
      });

      socketReference.current.on('classCancelled', data => {
        setSessions(previousSessions => {
          const updatedSessions = [...previousSessions];
          const sessionIndex = updatedSessions.findIndex(
            session => session._id === data.sessionId,
          );
          if (sessionIndex !== -1) {
            const updatedSession = { ...updatedSessions[sessionIndex] };
            updatedSession.assistants = updatedSession.assistants.filter(
              assistant => assistant !== data.assistantCancelled,
            );
            updatedSessions[sessionIndex] = updatedSession;
          }
          return updatedSessions;
        });
      });
    }

    return () => {
      if (socketReference.current) {
        socketReference.current.close();
        socketReference.current = undefined;
      }
    };
  }, [boxId, selectedDate, sessions]);

  const handleSelectedDate = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    if (socketReference.current) {
      socketReference.current.emit('dateChanged', {
        boxId,
        date: formattedDate,
      });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('eS-ES', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  return {
    selectedDate,
    handleSelectedDate,
    calendarIsShown,
    showCalendar,
    formatDate,
    user,
    athlete,
    sessions,
    boxId: boxId || '',
    boxName,
  };
};
