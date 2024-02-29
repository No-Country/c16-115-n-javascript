
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./router/routes"
import moment from 'moment';
import "moment/locale/es";
moment.locale("es");


function DriveRockApp() {

  return (
    <BrowserRouter>
      <MainRouter />  
    </BrowserRouter>
  );
}

export default DriveRockApp;
