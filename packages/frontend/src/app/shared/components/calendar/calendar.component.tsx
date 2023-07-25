import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { CalendarDay } from './calendar-day.component';

const Calendar = ({
  month,
  year,
  reservations,
}: {
  month: number;
  year: number;
  reservations: { [date: string]: string[] };
}) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Box>
      <Flex justify="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">{`${month}/${year}`}</Text>
      </Flex>
      <Grid templateColumns="repeat(7, 1fr)" gap={2} mb={4}>
        {daysOfWeek.map(day => (
          <Box key={day} textAlign="center" fontWeight="bold">
            {day}
          </Box>
        ))}
      </Grid>
      <Grid templateColumns={`repeat(7, 1fr)`}>
        {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 })
          .fill(undefined)
          .map((_, index) => (
            <Box key={`empty-${index}`} />
          ))}
        {Array.from({ length: daysInMonth })
          .fill(undefined)
          .map((_, index) => (
            <CalendarDay
              index={index}
              key={index}
              reservations={reservations[(index + 1).toString()]}
            />
          ))}
      </Grid>
    </Box>
  );
};

export { Calendar };
