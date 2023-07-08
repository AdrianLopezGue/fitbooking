import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { AthleteContext } from '../../contexts/athleteContext';
import { useParams } from 'react-router-dom';

export const useAthletesList = () => {
  const { boxId } = useParams();
  const { user } = useContext(UserContext);
  const { athlete } = useContext(AthleteContext);

  return {
    user,
    athlete,
    boxId: boxId || '',
  };
};
