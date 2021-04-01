'use es6';

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNav } from '../hooks/useNav';

const Nav = () => {
  const { name, handleLogout } = useNav();
  return (
    <div className="w-100 d-flex justify-content-between mt-2">
      <Link to="/" className="my-2">
        My events
      </Link>
      {name ? (
        <div className="d-flex flex-column align-items-end">
          Logged in as: {name}
          <Button variant="link" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-end">
          <Link to="/login">Login</Link>
          <Link to="/users/new">Register</Link>
        </div>
      )}
    </div>
  );
};
Nav.displayName = 'Nav';

export default Nav;
