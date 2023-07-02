import css from './imagegallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => {
  return (
    <div className={css.container}>
      <ul className={css.gallery}>
        {images.length !== 0 && <ImageGalleryItem images={images} />}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};
