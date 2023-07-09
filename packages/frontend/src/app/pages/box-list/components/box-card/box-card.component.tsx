import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { IoMdPin } from 'react-icons/io';

const BoxCard = ({
  handleClick,
  id,
  name,
  location,
  imageUrl,
}: {
  handleClick: MouseEventHandler<HTMLDivElement>;
  id: string;
  name: string;
  location: string;
  imageUrl: string;
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
      h="250px"
      _hover={{ filter: 'brightness(0.7)' }}
    >
      <Box
        h="100%"
        style={{ position: 'relative' }}
      >
        <Image
          src={imageUrl}
          alt="Gym"
          style={{
            filter: 'brightness(0.7)',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />

        <Box position="absolute" bottom="4" left="4" color="white">
          <Text fontSize="xl" fontWeight="bold" color="white" mb={1}>
            {name}
          </Text>
          <Flex gap={1}>
            <IoMdPin />
            <Text fontSize="sm" color="white">
              {location}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export { BoxCard };
