import { SessionDTO } from '@fitbooking/contracts';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { UserContext } from '../../contexts/userContext';
import { AthleteContext } from '../../contexts/athleteContext';
import { boxActions } from '../../actions/boxActions';
import { sessionActions } from '../../actions/sessionActions';

export const useSessionPage = () => {
  const socketRef = useRef<Socket>();
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
      .then(res => setBoxName(res.name))
      .catch(err => console.error(err));
  });

  useEffect(() => {
    const formattedDate = `${selectedDate.getFullYear()}-${
      selectedDate.getMonth() + 1
    }-${selectedDate.getDate()}`;

    sessionActions
      .findSessionsByDateAndBox(formattedDate, boxId || '', token)
      .then(res => setSessions(res))
      .catch(err => console.error(err));
  }, [selectedDate, token, boxId]);

  useEffect(() => {
    if (!socketRef.current) {
      const formattedDate = `${selectedDate.getFullYear()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`;
      socketRef.current = io('http://localhost:8080', {
        query: { boxId, date: formattedDate },
      });

      socketRef.current.on('connect', () => {
        console.log('Connected');
      });

      socketRef.current.on('exception', data => {
        console.log('event', data);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected');
      });

      socketRef.current.on('classReserved', data => {
        setSessions(prevSessions => {
          const updatedSessions = [...prevSessions];
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

      socketRef.current.on('classCancelled', data => {
        setSessions(prevSessions => {
          const updatedSessions = [...prevSessions];
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
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = undefined;
      }
    };
  }, [boxId, selectedDate, sessions]);

  const handleSelectedDate = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    if (socketRef.current) {
      socketRef.current.emit('dateChanged', {
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
