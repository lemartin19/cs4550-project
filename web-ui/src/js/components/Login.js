'use es6';

import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin';
import MaybeError from './MaybeError';
import Nav from './Nav';

const Login = () => {
  const { login, setField, onSubmit, isLoading } = useLogin();
  return (
    <Container className="d-flex flex-column align-items-center">
      <Nav />
      <div className="w-50 my-4 pt-4">
        <h2 className="my-4">User Login</h2>
        <MaybeError error={login.error} />
        <Form onSubmit={onSubmit}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            onChange={({ target }) => setField('email', target.value)}
            value={login.email}
            className="mb-4"
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={({ target }) => setField('password', target.value)}
            value={login.password}
            className="mb-4"
          />
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};
Login.displayName = 'Login';

export default Login;
