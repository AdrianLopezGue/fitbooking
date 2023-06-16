import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import Session from '../Session';

export const TrainingDay = () => {
  const [assistants, setAssistants] = useState<string[]>([]);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    fetch('http://localhost:3333/api/session/a3834756-6b7c-482a-9af0-3f8fce786849')
      .then(res => res.json())
      .then(res => {
        setAssistants(res.assistants);
        setMaxCapacity(res.maxCapacity);
      })
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

      socketRef.current.on('classReserved', data =>
        setAssistants([...assistants, data.assistantRegistered]),
      );

      socketRef.current.on('classCancelled', data => {
        console.log(data);
        setAssistants(
          assistants.filter(assistant => assistant !== data.assistantRegistered),
        );
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = undefined;
      }
    };
  }, [assistants]);

  return (
    <>
      <ol>
        {assistants.map((a, key) => (
          <li key={key}>{a}</li>
        ))}
      </ol>
      <Session maxCapacity={maxCapacity} assistants={assistants}></Session>
    </>
  );
};

export default TrainingDay;
