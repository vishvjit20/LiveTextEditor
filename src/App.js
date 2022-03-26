import React from "react";
import EditorPage from "./pages/EditorPage";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{ success: { theme: { primary: "#4aed88" } } }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/editor/:roomId" exact element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
