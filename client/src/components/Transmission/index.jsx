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
        {transmissionOptions.map((t) => (
          <div className={styles.transmission} key={t}>
            <input
              className={styles.transmission_input}
              type="checkbox"
              value={t}
              checked={transmission.includes(t)}
              onChange={onChange}
            />
            <p className={styles.transmission_label}>{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transmission;
