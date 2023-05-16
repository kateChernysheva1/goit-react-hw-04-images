import './Button.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <>
      <button className="button" type="button" onClick={onClick}>
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
