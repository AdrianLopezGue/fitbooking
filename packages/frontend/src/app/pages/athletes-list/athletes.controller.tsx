import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import { AthleteContext } from '../../contexts/athleteContext';
import { useParams } from 'react-router-dom';
import { boxActions } from '../../actions/boxActions';

export const useAthletesList = () => {
  const { boxId } = useParams();
  const { user, token } = useContext(UserContext);
  const { athlete } = useContext(AthleteContext);
  const [boxName, setBoxName] = useState('');

  useEffect(() => {
    boxActions
      .findBoxById(boxId || '', token)
      .then(res => setBoxName(res.name))
      .catch(err => console.error(err));
  });

  return {
    user,
    athlete,
    boxId: boxId || '',
    boxName,
  };
};
