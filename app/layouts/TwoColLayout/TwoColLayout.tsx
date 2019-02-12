import './TwoColLayout.css';
import React, { FunctionComponent } from 'react';

type Props = {
  columnOne: React.ReactChild | React.ReactChildren;
  columnTwo: React.ReactChild | React.ReactChildren;
};

const TwoColLayout: FunctionComponent<Props> = props => {
  return (
    <div styleName="container">
      <div styleName="col-left">{props.columnOne}</div>
      <div styleName="col-right">{props.columnTwo}</div>
    </div>
  );
};

export default TwoColLayout;
