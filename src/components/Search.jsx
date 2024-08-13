//NOTE:운동검색 컴포넌트
import { useEffect, useState } from 'react';
import Input from './Input';
import styles from './styles/Search.module.scss';
import searchIcon from '../picture/search.svg';
import useDebounce from '../hooks/useDebounce';
import useSearch from '../api/useSearch';
import { addExItem } from '../provider/slices/exitem';
import { useDispatch } from 'react-redux';

const Search = () => {
  const [search, setSearch] = useState('');
  const autoComplete = useDebounce(search, 500);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const onHandleChange = (e) => {
    setSearch(e.target.value);
  };
  const fetchExitem = async () => {
    try {
      const response = await useSearch(search);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchExitem();
  }, [autoComplete]);

  const insertExitem = (exitem_id, ex, met) => {
    const newItem = {
      exitem_id,
      ex,
      extime: 5,
      met,
    };
    dispatch(addExItem(newItem));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrapper}>
        <Input
          type="text"
          value={search}
          onChange={onHandleChange}
          placeholder="운동 검색"
          variant={'searchInput'}
        />
        <img src={searchIcon}></img>
      </div>
      <div className={styles.items}>
        {data && data.length > 0 ? (
          data.map((item) => (
            <div
              className={styles.itemWrapper}
              onClick={() => insertExitem(item.exitem_id, item.ex, item.met)}
              key={item.exitem_id}
            >
              {item.ex}
            </div>
          ))
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};
export default Search;
