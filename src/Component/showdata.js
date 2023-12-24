import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filldata = () => {
  const [positionFilter, setPositionFilter] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
  };

  return (
    <div>
      <label>
        <h2>Nhập vị trí cần truy vấn :</h2>
        <input type="text" value={positionFilter} onChange={handleFilterChange} />
      </label>
      <div>
      <button onClick={handleFilterSubmit}>Submit</button>
      </div>

      <h3>Kết quả:</h3>
      <ul>
        {filteredData.map(item => (
          <li key={item._id}>
            <p>Time: {item.Public.Output.data.Time}</p>
            <p>Pulse: {item.Public.Output.data.value.Pulse}</p>
            <p>Position: {item.Public.Output.data.value.position}</p>
            <p>Area: {item.Public.Output.data.value.area}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Filldata;
