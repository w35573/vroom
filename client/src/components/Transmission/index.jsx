import styles from "./styles.module.css";

const Transmission = ({
  transmissionOptions,
  transmission,
  setTransmission,
}) => {
  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
      const state = [...transmission, input.value];
      setTransmission(state);
    } else {
      const state = transmission.filter((val) => val !== input.value);
      setTransmission(state);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Transmission:</h1>
      <div className={styles.transmission_container}>
        {transmissionOptions.map((transmission) => (
          <div className={styles.transmission} key={transmission}>
            <input
              className={styles.transmission_input}
              type="checkbox"
              value={transmission}
              onChange={onChange}
            />
            <p className={styles.transmission_label}>{transmission}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transmission;
