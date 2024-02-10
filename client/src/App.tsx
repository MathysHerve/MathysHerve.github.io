import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeNavbar from "./components/HomeNavbar";
import HomePage from "./components/HomePage";
import ThreePage from "./components/ThreePage";
import ThreeNavbar from "./components/ThreeNavbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeNavbar />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/three" element={<ThreeNavbar />}>
          <Route index element={<ThreePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
