import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import Session from '../Session';

export const TrainingDay = () => {
  const [assistants, setAssistants] = useState<string[]>([]);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [name, setName] = useState('');
  const socketRef = useRef<Socket>();

  useEffect(() => {
    fetch('http://localhost:3333/api/session/ef6f99ff-aae9-4831-a619-979f4d971be0')
      .then(res => res.json())
      .then(res => {
        setAssistants(res.assistants);
        setMaxCapacity(res.maxCapacity);
        setName(res.name);
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
      <Session name={name} maxCapacity={maxCapacity} assistants={assistants}></Session>
    </>
  );
};

export default TrainingDay;
