import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/userContext';
import Sidebar from '../Navbar';
import { useNavigate } from 'react-router-dom';

type BoxDTO = {
  _id: string;
  name: string;
};

const BoxList = () => {
  const navigate = useNavigate();
  const [boxes, setBoxes] = useState<BoxDTO[]>([]);
  const { token, user } = useContext(UserContext);

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

  return (
    <>
      <Sidebar userName={user.name} />
      <Flex p={8} align={'center'} flexDirection={'column'}>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
          {boxes.length
            ? boxes.map(box => (
                <Card>
                  <CardHeader>
                    <Heading size="md">{box.name}</Heading>
                  </CardHeader>
                  <CardFooter>
                    <Button onClick={() => navigate(`/${box._id}/sessions`)}>
                      Enter
                    </Button>
                  </CardFooter>
                </Card>
              ))
            : undefined}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export { BoxList };
