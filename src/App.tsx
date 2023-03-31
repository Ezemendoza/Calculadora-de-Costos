
import { Helmet } from "react-helmet";
import { ContextProvider } from "./Context";
import RouteGeneral from "./Routes/RouteGeneral";
import logo from "./Imagenes/logo.png"

function App() {
  return ( 
    <ContextProvider>
      <>
          <Helmet>
                <title>Nunchi</title>
                <link rel="icon" href={logo} />
              
        </Helmet>
         <RouteGeneral/>
         </>
   </ContextProvider>
  );
}

export default App;
