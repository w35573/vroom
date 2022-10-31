import styles from "./styles.module.css";

const Sort = ({ sort, setSort }) => {
  return (
    <div className={styles.container}>
      <i class="ri-sort-asc"></i>
      <p className={styles.sort_by}>Sort by:</p>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className={styles.select}
      >
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Sort;
