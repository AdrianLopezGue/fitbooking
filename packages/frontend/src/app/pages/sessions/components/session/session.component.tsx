import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react';

export type SessionProps = {
  name: string;
  maxCapacity: number;
  assistants: string[];
  date: string;
};

const ImageBox = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Box
      w="16"
      h="16"
      bgImage={`url(${imageUrl})`}
      bgSize="cover"
      bgPosition="center"
      borderRadius="md"
    />
  );
};

const Session = ({ name, maxCapacity, assistants, date }: SessionProps) => {
  const parsedDate = new Date(date);
  const hours = String(parsedDate.getHours());
  const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
  const currentDate = new Date();

  const hasPassed = parsedDate < currentDate;

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
          >
            {!isEmpty && (
              <ImageBox
                imageUrl={
                  'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
                }
              />
            )}
          </GridItem>,
        );
      }
    }

    return gridItems;
  };

  return (
    <Box borderWidth="1px" borderColor="teal" borderRadius="md" p={4}>
      <Box display="flex" alignItems="center">
        <Box display="flex" flexGrow="1" alignItems="center">
          <ImageBox
            imageUrl={'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'}
          />
          <Text as="h2" fontSize="xl" fontWeight="bold" ml={4}>
            {name}
          </Text>
        </Box>
        <Text as="h2" fontSize="xl" fontWeight="bold">
          {`${hours}:${minutes}`}
        </Text>
      </Box>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} mt={4} mb={4}>
        {renderGrid()}
      </Grid>
      <Button colorScheme={'teal'} color={'white'} isDisabled={hasPassed}>
        {hasPassed ? 'Finished' : 'Train'}
      </Button>
    </Box>
  );
};

export { Session };
