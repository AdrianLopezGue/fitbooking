import { Button, Flex, IconButton } from '@chakra-ui/react';
import { Session } from './components/session/session.component';
import { useSessionPage } from './sessions.controller';
import { ArrowBackIcon, ArrowForwardIcon, CalendarIcon } from '@chakra-ui/icons';
import { Calendar } from './components/calendar/calendar.component';
import { SidebarWithHeader } from './components/sidebar/sidebar.component';

const TrainingDay = () => {
  const {
    user,
    selectedDate,
    calendarIsShown,
    showCalendar,
    formatDate,
    handleSelectedDate,
    athlete,
    sessions,
    boxId,
    boxName,
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
              reservations={{
                1: ['10:00', '15:30'],
                5: ['14:00', '18:30'],
                10: ['09:30'],
                20: ['17:00'],
              }}
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
              onClick={() => showCalendar(!calendarIsShown)}
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
