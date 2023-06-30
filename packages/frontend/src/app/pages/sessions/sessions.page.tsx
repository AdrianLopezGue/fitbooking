import { Flex } from '@chakra-ui/react';
import Sidebar from './components/navbar/navbar.component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Session from './components/session/session.component';
import { useSessionPage } from './sessions.controller';

const TrainingDay = () => {
  const { user, selectedDate, handleSelectedDate, athlete, sessions } = useSessionPage();

  return (
    <>
      <Sidebar userName={user.name} role={athlete.role} />
      <Flex p={8} align={'center'} flexDirection={'column'}>
        <DatePicker
          selected={selectedDate}
          onChange={date => {
            if (date) {
              handleSelectedDate(date);
            }
          }}
          inline
        />
        {sessions.length
          ? sessions.map((session, index) => (
              <Session
                key={index}
                name={session.name}
                maxCapacity={session.maxCapacity}
                assistants={session.assistants}
              />
            ))
          : undefined}{' '}
        {}
      </Flex>
    </>
  );
};

export { TrainingDay };
