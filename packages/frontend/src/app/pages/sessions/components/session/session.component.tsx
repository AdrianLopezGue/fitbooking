import { Box, Flex, Text } from '@chakra-ui/react';
import { BookSeatButton } from '../buttons/book-seat-button.component';
import { CancelSeatButton } from '../buttons/cancel-seat-button.component';
import { CoachImage } from './coach-image.component';
import { FinishedSessionButton } from '../buttons/finished-session-button.component';
import { useSessionComponent } from './session.controller';
import { AssistantsGrid } from './assistants-grid.component';

export type SessionProperties = {
  id: string;
  name: string;
  maxCapacity: number;
  assistants: string[];
  date: string;
};
const Session = ({ id, name, maxCapacity, assistants, date }: SessionProperties) => {
  const { isTraining, handleReserved, handleCanceled, hours, minutes, hasPassed } =
    useSessionComponent(id, assistants, date);

  return (
    <Box borderWidth="1px" borderColor="teal" borderRadius="md" p={4}>
      <Flex alignItems="center">
        <Flex flexGrow="1" alignItems="center">
          <CoachImage
            imageUrl={'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'}
          />
          <Text as="h2" fontSize="xl" fontWeight="bold" ml={4}>
            {name}
          </Text>
        </Flex>
        <Text as="h2" fontSize="xl" fontWeight="bold">
          {`${hours}:${minutes}`}
        </Text>
      </Flex>
      <AssistantsGrid maxCapacity={maxCapacity} assistants={assistants} />
      {hasPassed ? (
        <FinishedSessionButton />
      ) : isTraining ? (
        <CancelSeatButton onClick={() => handleCanceled()} />
      ) : (
        <BookSeatButton onClick={() => handleReserved()} />
      )}
    </Box>
  );
};

export { Session };
