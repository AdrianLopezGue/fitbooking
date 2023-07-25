import { useColorModeValue, Text, Box } from '@chakra-ui/react';
import { Badge } from './badge.component';

const CalendarDay = ({
  index,
  reservations,
}: {
  index: number;
  reservations: string[] | null;
}) => {
  const renderBadges = () =>
    reservations?.map((hour, index) => <Badge hour={hour} key={index} />);

  return (
    <Box
      key={`date-${index}`}
      textAlign="center"
      bg={useColorModeValue('white', 'gray.800')}
      border="1px"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      p={2}
      height="100%"
      minHeight="70px"
      width="100%"
    >
      <Text fontWeight="bold">{index + 1}</Text>
      {renderBadges()}
    </Box>
  );
};

export { CalendarDay };
