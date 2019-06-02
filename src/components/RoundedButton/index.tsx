import React from 'react';
import './index.css';

interface IRounedButtonProps {
  title: string;
  handler: () => void;
}

const RoundedButton: React.FC<IRounedButtonProps> = (props) => {
  return (
    <div className="container">
      <div className="layout rounded" onClick={props.handler}>
        <span>
          {props.title}
        </span>
      </div>
    </div>
  );
};

export default RoundedButton;
