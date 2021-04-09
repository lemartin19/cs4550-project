'use es6';

import React from 'react';
import { Card } from 'react-bootstrap';
import { useRouteComments } from '../hooks/useRouteComments';

const Comment = ({ user, body, inserted_at }) => (
  <Card>
    <Card.Text>{body}</Card.Text>
    <Card.Footer>
      - {user.name} @ {inserted_at}
    </Card.Footer>
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
    </div>
  );
};
RouteComments.displayName = 'RouteComments';

export default RouteComments;
