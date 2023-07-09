import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user-context';
import { AthleteContext } from '../../contexts/athlete-context';
import { useParams } from 'react-router-dom';
import { boxActions } from '../../actions/box-actions';

export const useAthletesList = () => {
  const { boxId } = useParams();
  const { user, token } = useContext(UserContext);
  const { athlete } = useContext(AthleteContext);
  const [boxName, setBoxName] = useState('');

  useEffect(() => {
    boxActions
      .findBoxById(boxId || '', token)
      .then(result => setBoxName(result.name))
      .catch(error => console.error(error));
  });

  return {
    user,
    athlete,
    boxId: boxId || '',
    boxName,
  };
};
