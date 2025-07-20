import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CsvUploadHome.css';

const CsvUploadHome = () => {
  const [file, setFile] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/order/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert(`Upload successful: ${response.data.message}`);
      fetchOrders(); 
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed.');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/order/top10');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept=".csv" onChange={handleFileChange} className="upload-input" />
        <button type="submit" className="upload-button">Upload CSV</button>
      </form>

      {orders.length > 0 && (
        <div className="table-wrapper">
          <h3>Uploaded Orders</h3>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Date</th>
                <th>User ID</th>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Amount</th>
                <th>Country</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.orderDate}</td>
                  <td>{order.userId}</td>
                  <td>{order.productId}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.country}</td>
                  <td>{order.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CsvUploadHome;
