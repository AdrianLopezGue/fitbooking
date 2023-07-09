import { Flex, Text } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

const CreateBoxCard = ({
  handleClick,
}: {
  handleClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <Flex
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      onClick={handleClick}
      cursor="pointer"
      h="250px"
      bgColor={'teal'}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
      _hover={{ filter: 'brightness(0.7)' }}
    >
      <Text fontSize="xl" fontWeight="bold" color="white" mb={1}>
        Create Box
      </Text>
      <IoIosAddCircleOutline color="white" size="40" />
    </Flex>
  );
};

export { CreateBoxCard };
