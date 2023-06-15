'use client';

import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import io, { Socket } from 'socket.io-client';

const StyledPage = styled.div`
  .page {
  }
`;

const Index = () => {
  const [isClassReserved, setIsClassReserved] = useState(false);
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

      socketRef.current.on('classReserved', () => {
        setIsClassReserved(true);
      });

      socketRef.current.on('classReleased', () => {
        setIsClassReserved(false);
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
    <StyledPage>
      <>
        <h1>WebSocket Chat {assistants.length}</h1>
        <h3>
          <ol>
            {assistants.map((a, key) => (
              <li key={key}>{a}</li>
            ))}
          </ol>
        </h3>
      </>
    </StyledPage>
  );
};

export default Index;
