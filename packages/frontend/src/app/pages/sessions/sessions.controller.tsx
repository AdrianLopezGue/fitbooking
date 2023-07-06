import { SessionDTO } from '@fitbooking/contracts';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { UserContext } from '../../contexts/userContext';
import { AthleteContext } from '../../contexts/athleteContext';

export const useSessionPage = () => {
  const socketRef = useRef<Socket>();
  const [sessions, setSessions] = useState<SessionDTO[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarIsShown, showCalendar] = useState(false);
  const { boxId } = useParams();
  const { token, user } = useContext(UserContext);
  const { athlete } = useContext(AthleteContext);

  useEffect(() => {
    const formattedDate = `${selectedDate.getFullYear()}-${
      selectedDate.getMonth() + 1
    }-${selectedDate.getDate()}`;

    fetch(`http://localhost:3333/api/sessions?date=${formattedDate}&boxId=${boxId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
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
  };
};
