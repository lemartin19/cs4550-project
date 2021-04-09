'use es6';

import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNewComment } from '../hooks/useNewComment';
import MaybeError from './MaybeError';

const NewComment = () => {
  const {
    showForm,
    toggleShowForm,
    onSubmit,
    comment,
    setField,
    isLoading,
  } = useNewComment();
  return (
    <div className="my-2">
      {showForm ? (
        <Form onSubmit={onSubmit}>
          <MaybeError error={comment.error} />
          <Form.Control
            name="body"
            as="textarea"
            onChange={({ target }) => setField('body', target.value)}
            value={comment.body}
            className="nb-4"
          />
          <div className="d-flex mt-2">
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Post comment'}
            </Button>
            <Button
              variant="outline-secondary"
              disabled={isLoading}
              onClick={() => {
                setField('body', '');
                toggleShowForm();
              }}
              className="ml-2"
            >
              Cancel
            </Button>
          </div>
        </Form>
      ) : (
        <Button variant="primary" onClick={toggleShowForm}>
          Add a comment
        </Button>
      )}
    </div>
  );
};
NewComment.displayName = 'NewComment';

export default NewComment;
