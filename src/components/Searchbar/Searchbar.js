import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const InputHandler = e => {
    setSearchName(e.target.value.toLowerCase());
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    if (searchName.trim() === '') {
      toast.error('Введите то, что хотите найти');
      return;
    }

    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmitHandler}>
        <button type="submit" className={s.SearchFormButton}>
          <ImSearch />
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={InputHandler}
        />
      </form>
    </header>
  );
}

export default Searchbar;
