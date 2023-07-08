import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { IoMdPin } from 'react-icons/io';

const BoxCard = ({
  handleClick,
  id,
  name,
}: {
  handleClick: MouseEventHandler<HTMLDivElement>;
  id: string;
  name: string;
}) => {
  return (
    <Box
      id={id}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      onClick={handleClick}
      cursor="pointer"
    >
      <Image
        src="https://gripcrossfit.com/wp-content/uploads/2021/08/123268008_141401847673085_3971044477539622376_n.jpg"
        alt="Gym"
        style={{ filter: 'brightness(0.7)' }}
      />

      <Box position="absolute" bottom="4" left="4" color="white">
        <Text fontSize="xl" fontWeight="bold" color="white" mb={1}>
          {name}
        </Text>
        <Flex gap={1}>
          <IoMdPin />
          <Text fontSize="sm" color="white">
            Córdoba
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export { BoxCard };
