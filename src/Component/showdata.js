import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './showdata.css'

const Filldata = () => {
  const [positionFilter, setPositionFilter] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://us-east-1.aws.data.mongodb-api.com/app/application-0-sznak/endpoint/finddata');
      setData(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const handleFilterChange = (event) => {
    setPositionFilter(event.target.value);
  };

  const handleFilterSubmit = () => {
    const filteredResults = data.filter(item => item.Public.Output.data.value.position === parseInt(positionFilter, 10));
    setFilteredData(filteredResults);
    setTotalResults(filteredResults.length);
  };

  return (
<div>
  <label>
    <h2>Nhập vị trí cần truy vấn :</h2>
    <input type="text" value={positionFilter} onChange={handleFilterChange} />
  </label>
  <div>
    <br />
    <button onClick={handleFilterSubmit}>Submit</button>
  </div>
  <h3>Tổng số lượng của vị trí truy vấn: {totalResults}</h3>
  <div className="result-list">
    {filteredData.map(item => (
      <div key={item._id} className="result-item">
        <p><strong>Time:</strong> {item.Public.Output.data.Time}</p>
        <p><strong>DOA:</strong> {item.Public.Input.Data.DOA}</p>
        <p><strong>Pulse:</strong> {item.Public.Output.data.value.Pulse}</p>
        <p><strong>Position:</strong> {item.Public.Output.data.value.position}</p>
        <p><strong>Area:</strong> {item.Public.Output.data.value.area}</p>
        
      </div>
    ))}
  </div>
</div>
  );
};

export default Filldata;
