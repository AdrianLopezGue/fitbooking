import { Flex } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { AthleteContext } from '../../../contexts/athleteContext';
import { UserContext } from '../../../contexts/userContext';
import Sidebar from '../Navbar';
import Session from '../Session';

type SessionDTO = {
  assistants: string[];
  maxCapacity: number;
  name: string;
};

const TrainingDay = () => {
  const socketRef = useRef<Socket>();
  const [sessions, setSessions] = useState<SessionDTO[]>([]);
  const { boxId } = useParams();
  const { token, user } = useContext(UserContext);
  const { athlete } = useContext(AthleteContext);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    fetch(`http://localhost:3333/api/sessions?date=${formattedDate}&boxId=${boxId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(res => setSessions(res))
      .catch(err => console.error(err));
  }, [token, boxId]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:8080');

      socketRef.current.on('connect', () => {
        console.log('Connected');
      });

      socketRef.current.on('exception', data => {
        console.log('event', data);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected');
      });

      // socketRef.current.on('classReserved', data =>
      //   setAssistants([...assistants, data.assistantRegistered]),
      // );

      socketRef.current.on('classCancelled', data => {
        console.log(data);
        // setAssistants(
        //   assistants.filter(assistant => assistant !== data.assistantRegistered),
        // );
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = undefined;
      }
    };
  }, []);

  return (
    <>
      <Sidebar userName={user.name} role={athlete.role} />
      <Flex p={8} align={'center'} flexDirection={'column'}>
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
