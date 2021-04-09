'use es6';

import moment from 'moment';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouteComments } from '../hooks/useRouteComments';
import NewComment from './NewComment';

const Comment = ({
  id,
  user,
  body,
  inserted_at,
  onDelete,
  ownsRouteOrComment,
}) => (
  <Card className="m-1">
    <Card.Body>
      <p className="mb-1">{body}</p>
      <div>
        <small>
          - {user.name} @ {moment(inserted_at).format('MMMM D, YYYY h:mm a')}
        </small>
        {ownsRouteOrComment(user.id) ? (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(id)}
            className="ml-2"
          >
            Delete
          </Button>
        ) : null}
      </div>
    </Card.Body>
  </Card>
);
Comment.displayName = 'Comment';

const RouteComments = () => {
  const { comments, onDelete, ownsRouteOrComment } = useRouteComments();
  return (
    <div className="my-4">
      <h4>Comments</h4>
      {comments && comments.length
        ? [...comments]
            .sort(
              (a, b) =>
                moment(a.inserted_at).format('YYYYMMDDHHmmSS') -
                moment(b.inserted_at).format('YYYYMMDDHHmmSS')
            )
            .map((comment) => (
              <Comment
                {...comment}
                onDelete={onDelete}
                ownsRouteOrComment={ownsRouteOrComment}
                key={comment.id}
              />
            ))
        : 'No comments on this route'}
      <NewComment />
    </div>
  );
};
RouteComments.displayName = 'RouteComments';

export default RouteComments;
