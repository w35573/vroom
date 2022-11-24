import styles from "./styles.module.css";

const Availability = ({ availability, setAvailability }) => {
  return (
    <div className={styles.container}>
      <i className="ri-calendar-check-line"></i>
      <p className={styles.availability_filter}>Car Availability:</p>
      <select
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        className={styles.select}
      >
        <option value="3">In 3 days</option>
        <option value="7">In 7 days</option>
        <option value="15">In 15 days</option>
        <option value="30">In 30 days</option>
      </select>
    </div>
  );
};

export default Availability;
