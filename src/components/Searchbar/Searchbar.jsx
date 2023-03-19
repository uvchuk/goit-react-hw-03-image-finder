import { Notify } from 'notiflix';
import { BiSearch } from 'react-icons/bi';
import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = { query: '' };

  handleGetQuery = evt => {
    this.setState({ query: evt.target.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.query.trim() === '') {
      Notify.warning('Search query cannot be empty');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.header}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>{BiSearch()}</span>
          </button>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleGetQuery}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
