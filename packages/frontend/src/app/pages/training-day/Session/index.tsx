import { Avatar, Box, Grid, GridItem, Text } from '@chakra-ui/react';

export type SessionProps = {
  name: string;
  maxCapacity: number;
  assistants: string[];
};

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
            <GridItem w="100%" h="10" key={index} bg="green.500" />
          ) : (
            <GridItem w="100%" h="10" key={index}>
              <Avatar
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                boxSize={40}
              />
            </GridItem>
          ),
        );
      }
    }

    return gridItems;
  };

  return (
    <Box w="400px" borderWidth="1px" p={4} m={2}>
      <Text as="h2" fontSize="xl" fontWeight="bold" mb={0}>
        {name}
      </Text>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} mt={4}>
        {renderGrid()}
      </Grid>
    </Box>
  );
};

export default Session;
