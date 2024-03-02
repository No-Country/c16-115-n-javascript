import { BrowserRouter } from "react-router-dom";
import MainRouter from "./router/routes";
import moment from "moment";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "moment/locale/es";
import { store } from "./redux/store";
moment.locale("es");

function DriveRockApp() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={store}>
          <MainRouter />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default DriveRockApp;
