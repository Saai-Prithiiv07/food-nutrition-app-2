import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useReducer } from "react";

import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import SavedPage from "./pages/SavedPage";
import NavBar from "./components/NavBar";

import { savedReducer, initialState } from "./reducers/savedReducer";

export default function App() {
  const [state, dispatch] = useReducer(savedReducer, initialState);

  return (
    <BrowserRouter>
      <NavBar savedCount={state.saved.length} />
      
      <Routes>
        <Route path="/" element={<HomePage dispatch={dispatch} />} />
        <Route path="/product/:barcode" element={<DetailPage dispatch={dispatch} />} />
        <Route path="/saved" element={<SavedPage state={state} dispatch={dispatch} />} />
      </Routes>
    </BrowserRouter>
  );
}