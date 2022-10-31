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
                {brandOptions.map((brand) => (
                    <div className={styles.brand} key={brand}>
                        <input
                            className={styles.brand_input}
                            type="checkbox"
                            value={brand}
                            onChange={onChange}
                        />
                        <p className={styles.brand_label}>{brand}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Brand;
