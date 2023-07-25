import { Box, useColorModeValue } from '@chakra-ui/react';

const Badge = ({ hour }: { hour: string }) => {
  return (
    <Box
      key={hour}
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('teal.500', 'white')}
      border="1px"
      borderColor={useColorModeValue('teal.500', 'teal.500')}
    >
      {hour}
    </Box>
  );
};

export { Badge };
