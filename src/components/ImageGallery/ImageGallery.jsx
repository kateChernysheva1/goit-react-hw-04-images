import './ImageGallery.css';
import { memo } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onClickImage }) => {
  return (
    <>
      <ul className="gallery">
        {images.map(item => {
          return (
            <ImageGalleryItem
              key={item.id}
              item={item}
              onClickImage={onClickImage}
            />
          );
        })}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onClickImage: PropTypes.func.isRequired,
};

export default memo(ImageGallery);
