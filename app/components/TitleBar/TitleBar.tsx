import './TitleBar.css';
import React, { FunctionComponent } from 'react';

type Props = {
  link?: React.ReactChild | React.ReactChildren;
};

const TitleBar: FunctionComponent<Props> = props => {
  return (
    <header styleName="container">
      <h1 styleName="heading">{props.children}</h1>
      {props.link && <span>{props.link}</span>}
    </header>
  );
};

export default TitleBar;
