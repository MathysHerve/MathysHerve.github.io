
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeNavbar from "./components/HomeNavbar";
import HomePage from "./components/HomePage";

function App() {


  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeNavbar />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}


export default App;
