import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  // ✅ Ant Design v5 message API
  const [messageApi, contextHolder] = message.useMessage();

  // form submit
  const submitHandler = async (values) => {
    try {
      setloading(true);
      const { data } = await axios.post('/users/login', values);
      setloading(false);

      // ✅ Success popup
      messageApi.open({
        type: 'success',
        content: 'Login successful!',
        duration: 2,
      });

      // Small delay before navigation
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
        navigate('/');
      }, 1000);
    } catch (error) {
      setloading(false);

      // ✅ Error popup
      messageApi.open({
        type: 'error',
        content: 'Something went wrong! Please try again.',
        duration: 2,
      });
    }
  };

  // Prevent login for already logged-in user
  useEffect(() => {
    if (localStorage.getItem('user')) navigate('/');
  }, [navigate]);

  return (
    <>
      {contextHolder} {/* ✅ Required for message API */}
      <div className='register-page'>
        {loading && <Spinner />}
        <Form layout='vertical' onFinish={submitHandler}>
          <h1>Login Form</h1>
          <Form.Item label='Email' name='email'>
            <Input type='email' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input type='password' />
          </Form.Item>
          <div className='d-flex justify-content-between'>
            <Link to='/register'>Not a user? Click here to register</Link>
            <button className='btn btn-primary'>Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
