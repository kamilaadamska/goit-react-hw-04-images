import css from './modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ imgUrl, tagsForAlt, hideModal, onKeyDown }) => {
  return (
    <div className={css.overlay} onClick={hideModal}>
      <div className={css.modal} tabIndex={1} onKeyDown={onKeyDown} id="modal">
        <img src={imgUrl} alt={tagsForAlt} className={css.modalImg} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imgUrl: PropTypes.string,
  tagsForAlt: PropTypes.string,
  hideModal: PropTypes.func,
  onKeyDown: PropTypes.func,
};
