import React from 'react';
import history from '../services/history';

const redirectPage = (route) => history.push(route);

export default function buttonLink(props) {
  return (
    <a data-testid={ props.dataTestId } type="button" className="btn btn-link" onClick={ () => redirectPage(props.route) }>
      { props.text }
    </a>
  );
}
