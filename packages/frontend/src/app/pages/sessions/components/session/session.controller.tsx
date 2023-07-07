import { UserContext } from '../../../../contexts/userContext';
import { AthleteContext } from '../../../../contexts/athleteContext';
import { useContext, useEffect, useState } from 'react';
import { sessionActions } from '../../../../actions/sessionActions';

export const useSessionComponent = (id: string, assistants: string[], date: string) => {
  const { token } = useContext(UserContext);
  const { athlete } = useContext(AthleteContext);
  const [isTraining, setIsTraining] = useState(
    Boolean(assistants.find(assistant => assistant === athlete._id)),
  );

  const parsedDate = new Date(date);
  const hours = String(parsedDate.getHours());
  const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
  const currentDate = new Date();
  const hasPassed = parsedDate < currentDate;

  useEffect(() => {
    setIsTraining(Boolean(assistants.find(assistant => assistant === athlete._id)));
  }, [assistants, athlete._id]);

  const handleReserved = () =>
    sessionActions.bookSeat(id, athlete._id, token).then(() => setIsTraining(true));

  const handleCanceled = () =>
    sessionActions.cancelSeat(id, athlete._id, token).then(() => setIsTraining(false));

  return {
    isTraining,
    hours,
    minutes,
    hasPassed,
    handleReserved,
    handleCanceled,
  };
};
