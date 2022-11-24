import styles from "./styles.module.css";

const Segment = ({ segmentOptions, segment, setSegment }) => {
  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
      const state = [...segment, input.value];
      setSegment(state);
    } else {
      const state = segment.filter((val) => val !== input.value);
      setSegment(state);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Segment:</h1>
      <div className={styles.segment_container}>
        {segmentOptions.map((seg) => (
          <div className={styles.segment} key={seg}>
            <input
              className={styles.segment_input}
              type="checkbox"
              value={seg}
              checked={segment.includes(seg)}
              onChange={onChange}
            />
            <p className={styles.segment_label}>{seg}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Segment;
