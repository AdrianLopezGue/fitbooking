import {
  Avatar,
  Button,
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { AthleteListDTO } from '@fitbooking/contracts';
import { SidebarWithHeader } from '../../shared/components/sidebar/sidebar.component';
import { useAthletesList } from './athletes.controller';

const DataTable = ({ athletes }: { athletes: AthleteListDTO }) => {
  return (
    <Flex flexDirection={'column'} width={'70%'}>
      <Flex flexDirection={'row'} gap={4}>
        <Input placeholder="Search by email" onChange={value => value} mb={4} />
        <Button colorScheme="teal">Invite athlete</Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Photo</Th>
            <Th>Name</Th>
            <Th>Email</Th>
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
              <Td>{athlete.acceptedAt ? new Date(athlete.acceptedAt).toDateString() : undefined}</Td>
              <Td>{athlete.invitedAt ? new Date(athlete.invitedAt).toDateString() : undefined}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

const AthletesList = () => {
  const { user, athlete, athletes, boxId, boxName } = useAthletesList();

  return (
    <SidebarWithHeader
      boxId={boxId}
      userName={user.name}
      role={athlete.role}
      boxName={boxName}
    >
      <Flex p={4} align={'center'} flexDirection={'column'}>
        <DataTable athletes={athletes} />
      </Flex>
    </SidebarWithHeader>
  );
};

export { AthletesList };
