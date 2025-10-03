import { ShowAdsProvider } from "./context/showAdsContext";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <ShowAdsProvider>
      <MainPage />
    </ShowAdsProvider>
  );
}

export default App;
