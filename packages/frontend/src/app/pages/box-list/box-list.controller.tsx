import { BoxDTO, BoxListDTO } from '@fitbooking/contracts';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import { AthleteContext } from '../../contexts/athleteContext';

export const useBoxListPage = () => {
  const navigate = useNavigate();
  const [boxes, setBoxes] = useState<BoxListDTO>([]);
  const { token, user } = useContext(UserContext);
  const { setAthlete } = useContext(AthleteContext);

  useEffect(() => {
    fetch(`http://localhost:3333/api/box?email=${user.email}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(res => {
        setBoxes(res);
      })
      .catch(err => console.error(err));
  }, [user.email, token]);

  const handleClick = (boxId: string) => {
    fetch(`http://localhost:3333/api/box/${boxId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
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
