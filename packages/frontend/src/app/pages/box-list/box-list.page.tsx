import { Flex, Grid } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context';
import { useBoxListPage } from './box-list.controller';
import { BoxCard } from './components/box-card/box-card.component';
import { NavBar } from '../../shared/components/navbar/navbar.component';
import { CreateBoxCard } from './components/box-card/create-box-card.component';
import { useNavigate } from 'react-router-dom';

const BoxList = () => {
  const { user } = useContext(UserContext);
  const { handleClick, boxes } = useBoxListPage();
  const navigate = useNavigate();

  return (
    <>
      <NavBar userName={user.name} />
      <Flex p={8} align={'center'} justifyContent="center">
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {boxes.length > 0
            ? boxes.map(box => (
                <BoxCard
                  id={box._id}
                  name={box.name}
                  handleClick={() => handleClick(box._id)}
                  imageUrl="https://gripcrossfit.com/wp-content/uploads/2021/08/123268008_141401847673085_3971044477539622376_n.jpg"
                  location={box.location}
                />
              ))
            : undefined}
          <CreateBoxCard handleClick={() => navigate(`/box-creation`)} />
        </Grid>
      </Flex>
    </>
  );
};

export { BoxList };
