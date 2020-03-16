import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.sass';
import { SIGN_UP } from '../../constants/routes';


const LandingPage = ({ history }) => {
  const joinButton = () => {
    history.push(SIGN_UP);
  };

  return (
    <div className="landing-container">
      <h1>
        Build a project with go-getters like you.
      </h1>
      <p>
        With no work experience, getting hired feels impossible, but there are ways to stand out
        from the crowd.
      </p>
      <button type="button" onClick={joinButton}>
        Join Squad
      </button>
      <h2>
        Find designers and developers to work together.
      </h2>
      <p>
        Get matched with people who are willing to commit to a project as much as you are.
      </p>
      <h2>
        Start building experience now.
      </h2>
      <p>
        Learn how projects start as sketches and become working products.
      </p>
      <h2>
        Diversify your portfolio.
      </h2>
      <p>
        Employers want to see unique projects that represent who you are.
      </p>
      <h2>
        Connect with people who want to grow.
      </h2>
      <button type="button" onClick={joinButton}>
        Find your Squad
      </button>
    </div>
  );
};

LandingPage.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(LandingPage);
