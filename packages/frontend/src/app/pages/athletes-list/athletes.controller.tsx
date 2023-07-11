import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user-context';
import { AthleteContext } from '../../contexts/athlete-context';
import { useParams } from 'react-router-dom';
import { boxActions } from '../../actions/box-actions';
import { AthleteListDTO } from '@fitbooking/contracts';

export const useAthletesList = () => {
  const { boxId } = useParams();
  const { user, token } = useContext(UserContext);
  const { athlete } = useContext(AthleteContext);
  const [boxName, setBoxName] = useState('');
  const [athletes, setAthletes] = useState<AthleteListDTO>([]);

  useEffect(() => {
    boxActions
      .findBoxById(boxId || '', token)
      .then(result => setBoxName(result.name))
      .catch(error => console.error(error));
  }, [boxId, token]);

  useEffect(() => {
    boxActions.findAthletesByBox(boxId || '', token).then(result => setAthletes(result));
  }, [boxId, token]);

  return {
    user,
    athlete,
    athletes,
    boxId: boxId || '',
    boxName,
    token,
  };
};
