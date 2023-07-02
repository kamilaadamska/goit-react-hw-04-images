import css from './button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <div className={css.containerBtn}>
      <button type="button" className={css.loadMore} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
