import { Flex } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { AthleteContext } from '../../../contexts/athleteContext';
import { UserContext } from '../../../contexts/userContext';
import Sidebar from '../Navbar';
import Session from '../Session';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type SessionDTO = {
  _id: string;
  assistants: string[];
  maxCapacity: number;
  name: string;
};

const TrainingDay = () => {
  const socketRef = useRef<Socket>();
  const [sessions, setSessions] = useState<SessionDTO[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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
        query: { boxId, athleteId: athlete._id, date: formattedDate },
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
  }, [athlete._id, boxId, selectedDate, sessions]);

  return (
    <>
      <Sidebar userName={user.name} role={athlete.role} />
      <Flex p={8} align={'center'} flexDirection={'column'}>
        <DatePicker
          selected={selectedDate}
          onChange={date => {
            if (date) {
              setSelectedDate(date);
            }
          }}
          inline
        />
        {sessions.length
          ? sessions.map((session, index) => (
              <Session
                key={index}
                name={session.name}
                maxCapacity={session.maxCapacity}
                assistants={session.assistants}
              />
            ))
          : undefined}{' '}
        {}
      </Flex>
    </>
  );
};

export { TrainingDay };
