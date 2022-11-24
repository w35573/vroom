import styles from "./styles.module.css";

const Fuel = ({ fuelOptions, fuel, setFuel }) => {
  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
      const state = [...fuel, input.value];
      setFuel(state);
    } else {
      const state = fuel.filter((val) => val !== input.value);
      setFuel(state);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Fuel:</h1>
      <div className={styles.fuel_container}>
        {fuelOptions.map((f) => (
          <div className={styles.fuel} key={f}>
            <input
              className={styles.fuel_input}
              type="checkbox"
              value={f}
              checked={fuel.includes(f)}
              onChange={onChange}
            />
            <p className={styles.fuel_label}>{f}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fuel;
