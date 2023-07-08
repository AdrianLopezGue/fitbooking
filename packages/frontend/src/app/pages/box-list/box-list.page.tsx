import { Flex, Grid } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { useBoxListPage } from './box-list.controller';
import { BoxCard } from './components/box-card/box-card.component';
import { NavBar } from './components/navbar/navbar.component';

const BoxList = () => {
  const { user } = useContext(UserContext);
  const { handleClick, boxes } = useBoxListPage();

  return (
    <>
      <NavBar userName={user.name} />
      <Flex p={8} align={'center'} justifyContent="center">
        <Grid templateColumns="repeat(4, 1fr)" gap={4} maxW="70%">
          {boxes.length
            ? boxes.map(box => (
                <BoxCard
                  id={box._id}
                  name={box.name}
                  handleClick={() => handleClick(box._id)}
                />
              ))
            : undefined}
        </Grid>
      </Flex>
    </>
  );
};

export { BoxList };
