import React from 'react';
import history from '../services/history';

const redirectPage = (route) => history.push(route);

export default function ButtonLink(props) {
  return (
    <a data-testid={ props.dataTestId } type="button" className="btn text-light" onClick={ () => redirectPage(props.route) }>
      { props.text }
    </a>
  );
}
