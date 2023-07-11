import { ArrowBackIcon, ArrowForwardIcon, CalendarIcon } from '@chakra-ui/icons';
import { Button, Flex, IconButton } from '@chakra-ui/react';
import { SidebarWithHeader } from '../../shared/components/sidebar/sidebar.component';
import { Calendar } from './components/calendar/calendar.component';
import { Session } from './components/session/session.component';
import { useSessionPage } from './sessions.controller';

const TrainingDay = () => {
  const {
    user,
    selectedDate,
    calendarIsShown,
    formatDate,
    handleSelectedDate,
    athlete,
    sessions,
    boxId,
    boxName,
    bookedSessions,
    handleOnClick,
  } = useSessionPage();
  const currentMonth = selectedDate.getMonth() + 1;
  const currentYear = selectedDate.getFullYear();
  const tomorrow = new Date(selectedDate);
  tomorrow.setDate(selectedDate.getDate() + 1);

  const yesterday = new Date(selectedDate);
  yesterday.setDate(selectedDate.getDate() - 1);

  return (
    <SidebarWithHeader
      boxId={boxId}
      userName={user.name}
      role={athlete.role}
      boxName={boxName}
    >
      <Flex p={4} align={'center'} flexDirection={'column'}>
        <Flex flexDirection={'column'} width={'500px'}>
          {calendarIsShown ? (
            <Calendar
              month={currentMonth}
              year={currentYear}
              reservations={bookedSessions}
            />
          ) : undefined}
          <Flex justify={'space-between'} mb={4} mt={4}>
            <Button
              leftIcon={<ArrowBackIcon />}
              variant="outline"
              onClick={() => handleSelectedDate(yesterday)}
            >
              {formatDate(yesterday)}
            </Button>
            <IconButton
              variant="outline"
              icon={<CalendarIcon />}
              aria-label="Open calendar"
              onClick={() => handleOnClick(currentMonth, currentYear)}
            />
            <Button
              rightIcon={<ArrowForwardIcon />}
              variant="outline"
              onClick={() => handleSelectedDate(tomorrow)}
            >
              {formatDate(tomorrow)}
            </Button>
          </Flex>
          <Flex flexDirection="column" gap={4}>
            {sessions.length > 0
              ? sessions.map((session, index) => (
                  <Session
                    key={index}
                    id={session._id}
                    name={session.name}
                    maxCapacity={session.maxCapacity}
                    assistants={session.assistants}
                    date={session.date.toString()}
                  />
                ))
              : undefined}{' '}
            {}
          </Flex>
        </Flex>
      </Flex>
    </SidebarWithHeader>
  );
};

export { TrainingDay };
