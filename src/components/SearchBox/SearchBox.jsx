import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';
import css from './SearchBox.module.css';

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filters.name);

  const handleFilterChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.container}>
      <p className={css.label}>Find contacts by name or number</p>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        className={css.input}
      />
    </div>
  );
}
