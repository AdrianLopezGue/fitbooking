import {
  Avatar,
  ClassContainer,
  ClassHeader,
  EmptyGridItem,
  GridContainer,
  GridItem,
} from './styles';
import { SessionProps } from './types';

const Session = ({ name, maxCapacity, assistants }: SessionProps) => {
  const renderGrid = () => {
    const gridItems = [];
    const totalRows = Math.ceil(maxCapacity / 5);

    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < 5; col++) {
        const index = row * 5 + col;
        if (row === totalRows - 1 && index === maxCapacity) {
          break;
        }
        const isEmpty = index >= assistants.length;

        gridItems.push(
          isEmpty ? (
            <EmptyGridItem key={index} />
          ) : (
            <GridItem key={index}>
              <Avatar
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                alt="Avatar"
              />
            </GridItem>
          ),
        );
      }
    }

    return gridItems;
  };

  return (
    <ClassContainer>
      <ClassHeader>{name}</ClassHeader>
      <GridContainer>{renderGrid()}</GridContainer>
      <p>Capacity: {maxCapacity}</p>
    </ClassContainer>
  );
};

export default Session;
