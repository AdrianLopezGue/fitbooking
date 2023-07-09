import { Grid, GridItem } from '@chakra-ui/react';

const AssistantsGrid = ({
  maxCapacity,
  assistants,
}: {
  maxCapacity: number;
  assistants: string[];
}) => {
  const renderGrid = () => {
    const maxNumberOfCeils = 5;
    const gridItems = [];
    const totalRows = Math.ceil(maxCapacity / maxNumberOfCeils);

    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < maxNumberOfCeils; col++) {
        const index = row * maxNumberOfCeils + col;
        if (row === totalRows - 1 && index === maxCapacity) {
          break;
        }
        const isEmpty = index >= assistants.length;

        gridItems.push(
          <GridItem
            h={100 / 5}
            key={index}
            bg={isEmpty ? 'teal.500' : 'transparent'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="md"
            bgImage={
              isEmpty
                ? ''
                : `url(https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50)`
            }
          ></GridItem>,
        );
      }
    }

    return gridItems;
  };

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4} mt={4} mb={4}>
      {renderGrid()}
    </Grid>
  );
};

export { AssistantsGrid };
