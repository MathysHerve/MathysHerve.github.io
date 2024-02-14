import { HashRouter, Routes, Route } from "react-router-dom";
import HomeNavbar from "./components/HomeNavbar";
import HomePage from "./components/HomePage";
import ThreePage from "./components/ThreePage";
import ThreeNavbar from "./components/ThreeNavbar";
import ThreePlayground from "./components/threePlayground";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeNavbar />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="#/three" element={<ThreeNavbar />}>
          <Route index element={<ThreePage />} />
          <Route path="playground" element={<ThreePlayground />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
