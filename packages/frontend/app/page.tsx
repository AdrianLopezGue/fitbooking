'use client';

import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import io, { Socket } from 'socket.io-client';

const StyledPage = styled.div`
  .page {
  }
`;

const Index = () => {
  const [isReservedByClient, setIsReservedByClient] = useState(false);
  const [isClassReserved, setIsClassReserved] = useState(false);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:8081');

      socketRef.current.on('connect', () => {
        console.log('Connected');
      });

      socketRef.current.on('exception', data => {
        console.log('event', data);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected');
      });

      socketRef.current.on('reservationStatus', status => {
        setIsReservedByClient(status);
      });

      socketRef.current.on('classReserved', () => {
        setIsClassReserved(true);
      });

      socketRef.current.on('classReleased', () => {
        setIsClassReserved(false);
      });

      socketRef.current.emit('getReservations');
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = undefined;
      }
    };
  }, []);

  const handleReserveClass = () => {
    if (!isClassReserved && socketRef.current) {
      socketRef.current.emit('reserveClass');
    }
  };

  const handleReleaseClass = () => {
    if (isClassReserved && socketRef.current) {
      socketRef.current.emit('releaseClass');
    }
  };

  return (
    <StyledPage>
      <h1>WebSocket Chat</h1>
      <button disabled={isClassReserved} onClick={handleReserveClass}>
        {isClassReserved ? 'Class Reserved' : 'Reserve Class'}
      </button>
      {isReservedByClient && isClassReserved && (
        <button onClick={handleReleaseClass}>Release Class</button>
      )}
    </StyledPage>
  );
};

export default Index;
