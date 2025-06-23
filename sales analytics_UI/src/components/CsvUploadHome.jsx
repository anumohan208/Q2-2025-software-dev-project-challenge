import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CsvUploadHome.css';

const CsvUploadHome = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert(`Upload successful: ${response.data.message}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button type="submit">Upload CSV</button>
    </form>
  );
};

export default CsvUploadHome;