import './ImageGalleryItem.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item, onClickImage }) => {
  const { webformatURL, largeImageURL, tags } = item;
  return (
    <li className="gallery-item">
      <img
        className="gallery-item__image"
        width="300px"
        data-bg-image={largeImageURL}
        src={webformatURL}
        alt={tags}
        onClick={onClickImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClickImage: PropTypes.func.isRequired,
};
