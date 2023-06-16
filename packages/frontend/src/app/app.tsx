import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const [assistants, setAssistants] = useState([]);
  const socketRef = useRef<Socket>();

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
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    fetch('http://localhost:3333/api/session/011be8cb-5784-4db4-b0ce-ea43a6cc3138')
      .then(res => res.json())
      .then(res => setAssistants(res.assistants))
      .catch(err => console.error(err));
  }, []);

  return (
    <StyledApp>
      <ol>
        {assistants.map((a, key) => (
          <li key={key}>{a}</li>
        ))}
      </ol>
    </StyledApp>
  );
}

export default App;
