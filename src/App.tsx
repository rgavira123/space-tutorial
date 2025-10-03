import { SpaceProvider } from "space-react-client";
import MainPage from "./pages/MainPage";

function App() {

  const spaceConfig = {
    url: "http://localhost:3000",
    apiKey: "9cedd24632167a021667df44a26362dfb778c1566c3d4564e132cb58770d8c67",
    allowConnectionWithSpace: true
  }

  return (
    <SpaceProvider config={spaceConfig}>
        <MainPage />
    </SpaceProvider>
  );
}

export default App;
