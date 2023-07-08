import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SidebarWithHeader } from '../sessions/components/sidebar/sidebar.component';
import { useAthletesList } from './athletes.controller';

const athletesData = [
  {
    id: 1,
    foto: 'ruta-a-la-imagen',
    nombre: 'Nombre del Atleta 1',
    email: 'atleta1@example.com',
    joinedAt: '2022-01-01',
  },
  // Aquí puedes agregar más datos de atletas
];

const DataTable = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrar los atletas por email
  const filteredAthletes = athletesData.filter(athlete =>
    athlete.email.toLowerCase().includes(searchEmail.toLowerCase()),
  );

  // Calcular el índice del último elemento en la página
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calcular el índice del primer elemento en la página
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Obtener los atletas de la página actual
  const currentAthletes = filteredAthletes.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Box flex="row" width={'70%'}>
      <Input
        placeholder="Buscar por email"
        value={searchEmail}
        onChange={e => setSearchEmail(e.target.value)}
        mb={4}
      />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Foto</Th>
            <Th>Nombre</Th>
            <Th>Email</Th>
            <Th>Joined At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentAthletes.map(athlete => (
            <Tr key={athlete.id}>
              <Td>
                <Avatar name={athlete.nombre} src="https://bit.ly/dan-abramov" />
              </Td>
              <Td>{athlete.nombre}</Td>
              <Td>{athlete.email}</Td>
              <Td>{athlete.joinedAt}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack mt={4}>
        {Array.from({ length: Math.ceil(filteredAthletes.length / itemsPerPage) }).map(
          (_, index) => (
            <Button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Button>
          ),
        )}
      </HStack>
    </Box>
  );
};

const AthletesList = () => {
  const { user, athlete, boxId } = useAthletesList();

  return (
    <SidebarWithHeader boxId={boxId} userName={user.name} role={athlete.role}>
      <Flex p={4} align={'center'} flexDirection={'column'}>
        <DataTable />
      </Flex>
    </SidebarWithHeader>
  );
};

export { AthletesList };
