
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CsvUploadHome from './components/CsvUploadHome';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<CsvUploadHome />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
