import { extendTheme } from "@chakra-ui/react";

const colors = {
  blue: {
    200: "#36ABD9",
    500: "#0367A6",
  },
  yellow: {
    500: "#F2C12E",
  },
  orange: {
    200: "#D9A566",
  },
  red: {
    500: "#F24C3D",
  },
  gray: {
    100: "#F4F3F2",
    400: "#D0D0D0",
    600: "#798694",
    700: "#70808c",
    800: "#35393d",
  },
};

const theme = extendTheme({ colors });

export default theme;
