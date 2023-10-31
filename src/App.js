import React, { useState } from "react";
import Create from "./components/crud/Create";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, List, createTheme } from "@mui/material";
import Update from "./components/crud/Update";
import Delete from "./components/crud/Delete";
import ScpDetails from "./components/crud/ScpDetails";
import Catalog from "./components/Catalog";
import Home from "./pages/Home";
import { themeOptions } from "./utils/Theme";
import { ThemeProvider } from "@emotion/react";
import Footer from "./components/Footer";

function App() {
  const theme = createTheme(themeOptions);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        <List />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home searchQuery={searchQuery || " "} />}
          />
          <Route path="/create" element={<Create />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/detail/:itemId" element={<ScpDetails />} />
          <Route path="/update/:itemId" element={<Update />} />
          <Route path="/delete/:itemId" element={<Delete />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
