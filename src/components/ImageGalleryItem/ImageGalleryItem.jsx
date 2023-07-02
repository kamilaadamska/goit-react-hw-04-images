import css from './imagegalleryitem.module.css';
import PropTypes from 'prop-types';
import { useModalContext } from 'hooks/modalContext';

export const ImageGalleryItem = ({ images }) => {
  const { toggleModal } = useModalContext();

  return (
    <>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li className={css.photoCard} key={id}>
          <img
            src={webformatURL}
            alt={tags}
            className={css.photo}
            onClick={toggleModal}
            data-imageurl={largeImageURL}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};
