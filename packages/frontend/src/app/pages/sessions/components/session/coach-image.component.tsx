import { Box } from '@chakra-ui/react';

const CoachImage = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Box
      w="16"
      h="16"
      bgImage={`url(${imageUrl})`}
      bgSize="cover"
      bgPosition="center"
      borderRadius="md"
    />
  );
};

export { CoachImage };
