import { Button } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

const BookSeatButton = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button colorScheme={'teal'} color={'white'} onClick={onClick}>
      Train
    </Button>
  );
};

export { BookSeatButton };
