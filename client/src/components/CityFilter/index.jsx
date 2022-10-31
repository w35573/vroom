import styles from "./styles.module.css";

const CityFilter = ({ city, setCity }) => {
  return (
    <div className={styles.container}>
      <i class="ri-map-pin-line"></i>
      <p className={styles.city_filter}>City:</p>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={styles.select}
      >
        <option value="bangalore">Bangalore</option>
        <option value="hyderabad">Hyderabad</option>
        <option value="chennai">Chennai</option>
        <option value="mumbai">Mumbai</option>
        <option value="delhi-ncr">Delhi-NCR</option>
        <option value="pune">Pune</option>
        <option value="kolkata">Kolkata</option>
        <option value="ahmedabad">Ahmedabad</option>
        <option value="bhubaneswar">Bhubaneswar</option>
        <option value="chandigarh">Chandigarh</option>
        <option value="coimbatore">Coimbatore</option>
        <option value="jaipur">Jaipur</option>
        <option value="kochi">Kochi</option>
        <option value="mangalore">Mangalore</option>
        <option value="mysore">Mysore</option>
        <option value="nagpur">Nagpur</option>
        <option value="tirupati">Tirupati</option>
        <option value="trivandrum">Trivandrum</option>
        <option value="vijayawada">Vijayawada</option>
        <option value="vizag">Vizag</option>
      </select>
    </div>
  );
};

export default CityFilter;
