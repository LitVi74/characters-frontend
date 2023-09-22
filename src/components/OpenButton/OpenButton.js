/* eslint-disable react/jsx-props-no-spreading */
import "./OpenButton.scss";

export default function OpenButton({ ...props }) {
  return (
    <button
      {...props}
      className="open-button" 
      type="button"
     />
  );
}