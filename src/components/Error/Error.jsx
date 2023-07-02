import css from './error.module.css';
import noMatches from '../../images/noMatches.png';

export const Error = () => {
  return (
    <img
      src={noMatches}
      alt="Sorry, no matches found"
      width="50%"
      className={css.errorImg}
    />
  );
};
