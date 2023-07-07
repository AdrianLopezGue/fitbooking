import { Button } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

const CancelSeatButton = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button colorScheme={'red'} color={'white'} onClick={onClick}>
      Cancel
    </Button>
  );
};

export { CancelSeatButton };
