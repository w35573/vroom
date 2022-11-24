import styles from "./styles.module.css";

const Brand = ({
    brandOptions,
    brand,
    setBrand,
}) => {
    const onChange = ({ currentTarget: input }) => {
        if (input.checked) {
            const state = [...brand, input.value];
            setBrand(state);
        } else {
            const state = brand.filter((val) => val !== input.value);
            setBrand(state);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Brand:</h1>
            <div className={styles.brand_container}>
                {brandOptions.map((b) => (
                    <div className={styles.brand} key={b}>
                        <input
                            className={styles.brand_input}
                            type="checkbox"
                            value={b}
                            checked={brand.includes(b)}
                            onChange={onChange}
                        />
                        <p className={styles.brand_label}>{b}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Brand;
