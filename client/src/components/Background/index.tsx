import { Center } from "@chakra-ui/react";
import { IChildren } from "../../providers/interfaces";

const Background = ({ children }: IChildren) => {
  return (
    <Center
      w="100%"
      h="auto"
      bg="gray.100"
      flexDirection="column"
      justifyContent="flex-start"
      gap="45px"
    >
      {children}
    </Center>
  );
};
export default Background;
