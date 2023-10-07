/* eslint-disable react/jsx-props-no-spreading */
import "./OpenButton.scss";
import {FC} from 'react';

interface Props {
  [x: string]: any
};

const OpenButton: FC<Props> = ({ ...props }) => (
  <button
    {...props}
    className="open-button" 
    type="button"
  />
);

export default OpenButton;