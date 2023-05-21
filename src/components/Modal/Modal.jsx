import { memo } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';

const Modal = ({ data, closeModal }) => {
  const { img, alt } = data;

  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modal">
        <img src={img} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  data: PropTypes.exact({
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  closeModal: PropTypes.func.isRequired,
};

export default memo(Modal);
