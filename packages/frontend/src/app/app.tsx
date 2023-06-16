import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
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
    fetch('http://localhost:3333/api/session/1937bad9-8726-45ca-a15b-27c5fd6391e5')
      .then(res => {
        console.debug(res);
        return res.json();
      })
      .then(res => {
        console.log(res);
        setAssistants(res.assistants);
      })
      .catch(err => console.error(err.message));
  }, []);

  return (
    <StyledApp>
      <ol>
        {assistants.map((a, key) => (
          <li key={key}>{a}</li>
        ))}
      </ol>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </StyledApp>
  );
}

export default App;
