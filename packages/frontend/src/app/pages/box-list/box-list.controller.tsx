import { BoxDTO, BoxListDTO } from '@fitbooking/contracts';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import { AthleteContext } from '../../contexts/athleteContext';
import { boxActions } from '../../actions/boxActions';

export const useBoxListPage = () => {
  const navigate = useNavigate();
  const [boxes, setBoxes] = useState<BoxListDTO>([]);
  const { token, user } = useContext(UserContext);
  const { setAthlete } = useContext(AthleteContext);

  useEffect(() => {
    boxActions
      .findBoxByEmail(user.email, token)
      .then(res => {
        setBoxes(res);
      })
      .catch(err => console.error(err));
  }, [user.email, token]);

  const handleClick = (boxId: string) => {
    boxActions
      .findBoxById(boxId, token)
      .then((res: BoxDTO) => {
        const athleteFound = res.athletes.find(athlete => athlete.userId === user._id);

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
      .catch(err => console.error(err));
  };

  return { handleClick, boxes };
};
