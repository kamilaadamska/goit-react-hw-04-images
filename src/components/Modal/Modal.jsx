import css from './modal.module.css';
import PropTypes from 'prop-types';
import { useModalContext } from 'hooks/modalContext';

export const Modal = ({ imgDetails, onKeyDown }) => {
  const { toggleModal } = useModalContext();
  const { imgUrl, tags } = imgDetails;

  return (
    <div className={css.overlay} onClick={toggleModal}>
      <div className={css.modal} tabIndex={1} onKeyDown={onKeyDown} id="modal">
        <img src={imgUrl} alt={tags} className={css.modalImg} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imgDetails: PropTypes.shape({
    imgUrl: PropTypes.string,
    tags: PropTypes.string,
  }),
  onKeyDown: PropTypes.func,
};
