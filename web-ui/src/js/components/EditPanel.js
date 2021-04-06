'use es6';

import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useEditPanel } from '../hooks/useEditPanel';
import MaybeError from './MaybeError';

const EditPanel = () => {
  const { routeInfo, setField, isLoading, onSubmit } = useEditPanel();

  return (
    <Container id="EditPanel">
      <h2 className="my-4">Edit route</h2>
      <MaybeError variant="danger">{routeInfo.error}</MaybeError>
      <Form onSubmit={onSubmit}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          onChange={({ target }) => setField('name', target.value)}
          value={routeInfo.name}
          className="mb-4"
        />
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          onChange={({ target }) => setField('description', target.value)}
          value={routeInfo.description}
          className="mb-4"
        />
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Create'}
        </Button>
      </Form>
    </Container>
  );
};
EditPanel.displayName = 'EditPanel';

export default EditPanel;
