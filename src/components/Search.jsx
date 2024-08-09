//NOTE:운동검색 컴포넌트
import { useEffect, useState } from 'react';
import Input from './Input';
import styles from './styles/Search.module.scss';
import searchIcon from '../picture/search.svg';
import useDebounce from '../hooks/useDebounce';
import useSearch from '../api/useSearch';

const Search = () => {
  const [search, setSearch] = useState('');
  const autoComplete = useDebounce(search, 500);
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
            <div className={styles.itemWrapper} key={item.id}>
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
