import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {DarkModeProvider } from './DarkModeContext'
import { useReducer, useState } from "react";
import Knapsack from "./pages/Knapsack/Knapsack";

function App() {


  return (
    <DarkModeProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<MainPage />} />
              <Route path="algorithms/"> 
                <Route path="knapsack" element={<Knapsack />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>

    </DarkModeProvider>
  );
}


export default App;
