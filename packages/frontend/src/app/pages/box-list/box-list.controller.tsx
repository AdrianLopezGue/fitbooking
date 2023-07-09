import { BoxDTO, BoxListDTO } from '@fitbooking/contracts';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user-context';
import { AthleteContext } from '../../contexts/athlete-context';
import { boxActions } from '../../actions/box-actions';

export const useBoxListPage = () => {
  const navigate = useNavigate();
  const [boxes, setBoxes] = useState<BoxListDTO>([]);
  const { token, user } = useContext(UserContext);
  const { setAthlete } = useContext(AthleteContext);

  useEffect(() => {
    boxActions
      .findBoxByEmail(user.email, token)
      .then(result => {
        setBoxes(result);
      })
      .catch(error => console.error(error));
  }, [user.email, token]);

  const handleClick = (boxId: string) => {
    boxActions
      .findBoxById(boxId, token)
      .then((result: BoxDTO) => {
        const athleteFound = result.athletes.find(athlete => athlete.userId === user._id);

        if (!athleteFound) {
          return;
        }

        setAthlete({
          _id: athleteFound._id,
          userId: athleteFound.userId,
          role: athleteFound.role,
        });
        navigate(`/${boxId}/sessions`);
      })
      .catch(error => console.error(error));
  };

  return { handleClick, boxes };
};
