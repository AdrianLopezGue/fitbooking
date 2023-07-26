import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { SessionDTO } from '@fitbooking/contracts';
import { useForm } from 'react-hook-form';
import { boxActions } from '../../actions/box-actions';
import { SidebarWithHeader } from '../../shared/components/sidebar/sidebar.component';
import { useSessionsManagement } from './sessions-management.controller';

const DataTable = ({
  sessions,
  boxId,
  token,
}: {
  sessions: SessionDTO[];
  boxId: string;
  token: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm({
    defaultValues: {
      email: '',
    },
  });
  const toast = useToast();

  const onClick = form.handleSubmit(data => {
    boxActions
      .inviteAthlete(data.email, boxId, token)
      .then(() => {
        onClose();
        toast({
          title: 'Athlete invited.',
          status: 'success',
          isClosable: true,
          colorScheme: 'teal',
        });
      })
      .catch(error =>
        toast({
          title: `${(error as Error).message}`,
          status: 'error',
          isClosable: true,
        }),
      );
  });

  return (
    <Flex flexDirection={'column'} width={'70%'}>
      <Flex flexDirection={'row'} gap={4}>
        <Input placeholder="Search by email" onChange={value => value} mb={4} />
        <Button colorScheme="teal" onClick={onOpen}>
          Invite athlete
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Capacity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sessions
            ? sessions?.map(session => (
                <Tr key={session._id}>
                  <Td>{session.name}</Td>
                  <Td>{new Date(session.date).toDateString()}</Td>
                  <Td>{session.maxCapacity}</Td>
                </Tr>
              ))
            : []}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite new athlete</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input {...form.register('email')} placeholder="Insert Email" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClick}>
              Invite
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

const SessionsManagement = () => {
  const { user, athlete, sessions, boxId, boxName, token } = useSessionsManagement();

  return (
    <SidebarWithHeader
      boxId={boxId}
      userName={user.name}
      role={athlete.role}
      boxName={boxName}
    >
      <Flex p={4} align={'center'} flexDirection={'column'}>
        <DataTable sessions={sessions} boxId={boxId} token={token} />
      </Flex>
    </SidebarWithHeader>
  );
};

export { SessionsManagement };
