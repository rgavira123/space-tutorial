import { SpaceProvider } from "space-react-client";
import MainPage from "./pages/MainPage";

function App() {

  const spaceConfig = {
    url: "http://localhost:5403",
    apiKey: "c52a83122dc0403567dc1d1af2f261da5dce9c49bee7e199b96ce3f4bfc85ac6",
    allowConnectionWithSpace: true
  }

  return (
    <SpaceProvider config={spaceConfig}>
        <MainPage />
    </SpaceProvider>
  );
}

export default App;
