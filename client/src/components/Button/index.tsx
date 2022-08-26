import { Button as ChakraButton } from "@chakra-ui/react";
import { IButtonProps } from "./interfaces";

const Button = ({ children, ...props }: IButtonProps) => {
  return (
    <ChakraButton
      transition="0.3s"
      _hover={{
        filter: "brightness(1.2)",
      }}
      _active={{
        filter: "brightness(1.4)",
      }}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};
export default Button;
