import styles from "./styles.module.css";

const MinPrice = ({ min, setMin }) => {
  return (
    <div className={styles.container}>
      <p className={styles.min_price}>Min:</p>
      <select
        value={min}
        onChange={(e) => setMin(e.target.value)}
        className={styles.select}
      >
        <option value="10000">10,000</option>
        <option value="15000">15,000</option>
        <option value="20000">20,000</option>
        <option value="25000">25,000</option>
        <option value="30000">30,000</option>
        <option value="35000">35,000</option>
        <option value="40000">40,000</option>
        <option value="45000">45,000</option>
      </select>
    </div>
  );
};

export default MinPrice;
