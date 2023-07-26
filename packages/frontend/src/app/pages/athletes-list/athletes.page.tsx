import {
  Avatar,
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
import { AthleteListDTO } from '@fitbooking/contracts';
import { useForm } from 'react-hook-form';
import { boxActions } from '../../actions/box-actions';
import { SidebarWithHeader } from '../../shared/components/sidebar/sidebar.component';
import { useAthletesList } from './athletes.controller';

const DataTable = ({
  athletes,
  boxId,
  token,
}: {
  athletes: AthleteListDTO;
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
            <Th>Photo</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Accepted At</Th>
            <Th>Invited At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {athletes.map(athlete => (
            <Tr key={athlete._id}>
              <Td>
                <Avatar name={athlete.name} src="https://bit.ly/dan-abramov" />
              </Td>
              <Td>{athlete.name}</Td>
              <Td>{athlete.email}</Td>
              <Td>{athlete.role}</Td>
              <Td>
                {athlete.acceptedAt
                  ? new Date(athlete.acceptedAt).toDateString()
                  : undefined}
              </Td>
              <Td>
                {athlete.invitedAt
                  ? new Date(athlete.invitedAt).toDateString()
                  : undefined}
              </Td>
            </Tr>
          ))}
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

const AthletesList = () => {
  const { user, athlete, athletes, boxId, boxName, token } = useAthletesList();

  return (
    <SidebarWithHeader
      boxId={boxId}
      userName={user.name}
      role={athlete.role}
      boxName={boxName}
    >
      <Flex p={4} align={'center'} flexDirection={'column'}>
        <DataTable athletes={athletes} boxId={boxId} token={token} />
      </Flex>
    </SidebarWithHeader>
  );
};

export { AthletesList };
