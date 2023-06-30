import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  Heading,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { useBoxListPage } from './box-list.controller';
import Sidebar from './components/navbar/navbar.component';

const BoxList = () => {
  const { user } = useContext(UserContext);
  const { handleClick, boxes } = useBoxListPage();

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
