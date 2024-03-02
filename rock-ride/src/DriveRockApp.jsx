import { BrowserRouter } from "react-router-dom";
import MainRouter from "./router/routes";
import moment from "moment";
import { ChakraProvider } from '@chakra-ui/react';
import "moment/locale/es";
moment.locale("es");

function DriveRockApp() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default DriveRockApp;
