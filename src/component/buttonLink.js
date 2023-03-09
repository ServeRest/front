import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ButtonLink(props) {
  const history = useNavigate();
  const redirectPage = (route) => history(route);

  return (
    <a data-testid={ props.dataTestId } type="button" className="btn text-light" onClick={ () => redirectPage(props.route) }>
      { props.text }
    </a>
  );
}
