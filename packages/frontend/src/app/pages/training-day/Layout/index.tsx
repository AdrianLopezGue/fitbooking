import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import Session from '../Session';

type SessionDTO = {
  assistants: string[];
  maxCapacity: number;
  name: string;
};

const TrainingDay = () => {
  const socketRef = useRef<Socket>();
  const [sessions, setSessions] = useState<SessionDTO[]>([]);

  useEffect(() => {
    const cookieParsed = Cookies.get('fitbooking.token');
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    console.log(cookieParsed, formattedDate);

    fetch(
      `http://localhost:3333/api/sessions?date=${formattedDate}&boxId=b7c2881b-eafb-4be9-bf4e-99b1c1723f04`,
      {
        headers: { Authorization: `Bearer ${cookieParsed}` },
      },
    )
      .then(res => res.json())
      .then(res => setSessions(res))
      .catch(err => console.error(err));
  }, []);

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
      {/* Utiliza null en lugar de undefined */}
    </>
  );
};

export { TrainingDay };
