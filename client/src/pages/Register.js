import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import 'antd/dist/reset.css'


const Register = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage(); // ✅ Added for AntD v5

  // form submit
  const submitHandler = async (values) => {
    try {
      setloading(true);
      await axios.post('/users/register', values);
      messageApi.open({
        type: 'success',
        content: 'Registration Successful',
        duration: 2, // ✅ short alert (auto closes)
      });
      setloading(false);
      navigate('/login');
    } catch (error) {
      setloading(false);
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
        duration: 2,
      });
    }
  };

  // Prevent for logged-in user
  useEffect(() => {
    if (localStorage.getItem('user')) navigate('/');
  },[navigate]);

  return (
    <>
      {contextHolder} {/* ✅ Required for message API */}
      <div className='register-page'>
        {loading && <Spinner />}
        <Form layout='vertical' onFinish={submitHandler}>
          <h1>Register Form</h1>
          <Form.Item label='Name' name='name'>
            <Input />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input type='email' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input type='password' />
          </Form.Item>
          <div className='d-flex justify-content-between'>
            <Link to='/login'>Already registered ? Click here to login</Link>
            <button className='btn btn-primary'>Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
