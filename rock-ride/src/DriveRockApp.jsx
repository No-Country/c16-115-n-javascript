import { BrowserRouter } from "react-router-dom";
import MainRouter from "./router/routes";
import moment from "moment";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "moment/locale/es";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
moment.locale("es");

function DriveRockApp() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainRouter />
        </PersistGate>
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default DriveRockApp;
