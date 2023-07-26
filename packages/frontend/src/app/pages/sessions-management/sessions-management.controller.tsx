import { SessionDTO } from '@fitbooking/contracts';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { boxActions } from '../../actions/box-actions';
import { sessionActions } from '../../actions/session-actions';
import { AthleteContext } from '../../contexts/athlete-context';
import { UserContext } from '../../contexts/user-context';

export const useSessionsManagement = () => {
  const { boxId } = useParams();
  const { user, token } = useContext(UserContext);
  const { athlete } = useContext(AthleteContext);
  const [boxName, setBoxName] = useState('');
  const [sessions, setSessions] = useState<SessionDTO[]>([]);

  useEffect(() => {
    boxActions
      .findBoxById(boxId || '', token)
      .then(result => setBoxName(result.name))
      .catch(error => console.error(error));
  }, [boxId, token]);

  useEffect(() => {
    sessionActions
      .findSessionsByBox(boxId || '', token)
      .then(result => setSessions(result));
  }, [boxId, token]);

  return {
    user,
    athlete,
    sessions,
    boxId: boxId || '',
    boxName,
    token,
  };
};
