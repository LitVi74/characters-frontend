/* eslint-disable react/jsx-props-no-spreading */
import "./OpenButton.scss";
import * as React from 'react';

type Props = {
  [x: string]: any
};

const OpenButton: React.FC<Props> = ({ ...props }) => (
  <button
    {...props}
    className="open-button" 
    type="button"
  />
);

export default OpenButton;