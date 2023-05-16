import './Searchbar.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className="searchbar">
      <form className="form" onSubmit={onSubmit}>
        <button type="submit" className="button-search">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
