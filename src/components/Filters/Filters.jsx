import styles from "./Filters.module.scss";

const Filters = ({
  searchTerm,
  setSearchTerm,
  maxPrice,
  setMaxPrice,
  category,
  setCategory,
}) => {
  return (
    <div className={styles.filterContainer}>
      {/* Search Section */}
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search products..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Selection */}
      <div className={styles.selectWrapper}>
        <select
          className={styles.categorySelect}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>

      {/* Price Filter Section */}
      <div className={styles.rangeGroup}>
        <label>
          Max Price: <b>${maxPrice}</b>
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;
