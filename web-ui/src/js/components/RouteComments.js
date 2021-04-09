'use es6';

import React from 'react';
import { Card } from 'react-bootstrap';
import { useRouteComments } from '../hooks/useRouteComments';
import NewComment from './NewComment';

const Comment = ({ user, body, inserted_at }) => (
  <Card>
    <Card.Body>
      <p className="mb-1">{body}</p>
      <small>
        - {user.name} @ {inserted_at}
      </small>
    </Card.Body>
  </Card>
);
Comment.displayName = 'Comment';

const RouteComments = () => {
  const { comments } = useRouteComments();
  return (
    <div className="my-4">
      <h4>Comments</h4>
      {comments && comments.length
        ? comments.map((comment) => <Comment {...comment} key={comment.id} />)
        : 'No comments on this route'}
      <NewComment />
    </div>
  );
};
RouteComments.displayName = 'RouteComments';

export default RouteComments;
