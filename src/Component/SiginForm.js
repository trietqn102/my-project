import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import axios from 'axios';

const schema = {
  title: 'Đăng ký User',
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: { type: 'string', title: 'UserName' },
    password: { type: 'string', title: 'Password', format: 'password' },
  },
};

const UserLogin = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = async ({ formData }) => {
    try {
      console.log('Dữ liệu gửi đi:', formData); // Log dữ liệu trước khi gửi để kiểm tra
      const response = await axios.post(
        'https://us-east-1.aws.data.mongodb-api.com/app/application-0-sznak/endpoint/newUsers',
        formData
      );

      console.log('Kết quả từ server:', response.data);

      // Reset form sau khi submit thành công
      setFormData({});
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
    }
  };

  return (
    <div className="auth-form-container">
      <Form
        schema={schema}
        validator={validator}
        formData={formData} // Truyền giá trị của form
        onChange={({ formData }) => setFormData(formData)} // Cập nhật state khi form thay đổi
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserLogin;