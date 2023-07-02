import css from './searchbar.module.css';
import searchIcon from '../../images/search.svg';

export const Searchbar = ({ findImages }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={findImages}>
        <button className={css.formBtn} type="submit">
          <img src={searchIcon} alt="search icon" width="15px" />
        </button>
        <input
          className={css.formInput}
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
