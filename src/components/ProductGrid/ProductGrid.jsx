import styles from "./ProductGrid.module.scss";
import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = ({
  loading,
  error,
  products,
  onAddToCart,
  onShowDetail,
}) => {
  if (loading)
    return (
      <div className={styles.loading}>
        <h2>Loading Products... ⏳</h2>
      </div>
    );

  if (error)
    return (
      <div className={styles.error}>
        <h3>Error: {error} ❌</h3>
        <p>Please check your connection or VPN.</p>
      </div>
    );

  if (products.length === 0)
    return <p className={styles.empty}>No products found! 🔍</p>;

  return (
    <div className={styles.grid}>
      {products.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          onAddToCart={onAddToCart}
          onShowDetail={onShowDetail}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
