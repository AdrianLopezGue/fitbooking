import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  Heading,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AthleteContext } from '../../../contexts/athleteContext';
import { UserContext } from '../../../contexts/userContext';
import Sidebar from '../Navbar';

type BoxListDTO = {
  _id: string;
  name: string;
}[];

type AthleteDTO = {
  _id: string;
  userId: string;
  role: string;
};

type BoxDTO = {
  _id: string;
  name: string;
  athletes: AthleteDTO[];
};

const BoxList = () => {
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

        setAthlete({ _id: athleteFound._id, role: athleteFound.role });
        navigate(`/${boxId}/sessions`);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <Sidebar userName={user.name} />
      <Flex p={8} align={'center'} justifyContent="center">
        <Grid templateColumns="repeat(4, 1fr)" gap={4} maxW="800px">
          {boxes.length
            ? boxes.map(box => (
                <Card key={box._id}>
                  <CardHeader>
                    <Heading size="md">{box.name}</Heading>
                  </CardHeader>
                  <CardFooter>
                    <Button onClick={() => handleClick(box._id)}>Enter</Button>
                  </CardFooter>
                </Card>
              ))
            : undefined}
        </Grid>
      </Flex>
    </>
  );
};

export { BoxList };
