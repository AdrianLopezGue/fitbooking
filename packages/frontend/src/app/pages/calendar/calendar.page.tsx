import { Button, Flex } from '@chakra-ui/react';
import { SidebarWithHeader } from '../../shared/components/sidebar/sidebar.component';
import { Calendar } from '../../shared/components/calendar/calendar.component';
import { useCalendarPage } from './calendar.controller';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const CalendarPage = () => {
  const {
    user,
    month,
    year,
    athlete,
    boxId,
    boxName,
    bookedSessions,
    selectedDate,
    handleSelectedDate,
    formatMonth,
  } = useCalendarPage();

  const nextMonth = new Date(selectedDate);
  nextMonth.setMonth(selectedDate.getMonth() + 1);

  const previousMonth = new Date(selectedDate);
  previousMonth.setMonth(selectedDate.getMonth() - 1);

  return (
    <SidebarWithHeader
      boxId={boxId}
      userName={user.name}
      role={athlete.role}
      boxName={boxName}
    >
      <Flex justify={'space-between'} mb={4} mt={4}>
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="outline"
          onClick={() => handleSelectedDate(previousMonth)}
        >
          {formatMonth(previousMonth)}
        </Button>
        <Button
          rightIcon={<ArrowForwardIcon />}
          variant="outline"
          onClick={() => handleSelectedDate(nextMonth)}
        >
          {formatMonth(nextMonth)}
        </Button>
      </Flex>
      <Calendar month={month} year={year} reservations={bookedSessions} />
    </SidebarWithHeader>
  );
};

export { CalendarPage };
