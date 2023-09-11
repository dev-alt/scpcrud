import React from 'react';
import Create from './components/crud/Create';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { List } from '@mui/material';
import Read from './components/crud/Read';
import Update from './components/crud/Update';
import Delete from './components/crud/Delete';
import ScpDetails from './components/crud/ScpDetails';
import Catalog from './components/Catalog';
import Home from './pages/Home';
function App() {
  return (
    <Router>

      <Header />

      <List />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/items" element={<Read />} />
        <Route path="/create" element={<Create />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/detail/:itemId" element={<ScpDetails />} />
        <Route path="/update/:itemId" element={<Update />} />
        <Route path="/delete/:itemId" element={<Delete />} />
      </Routes>
    </Router>

  );
}

export default App;