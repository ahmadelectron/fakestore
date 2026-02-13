import styles from "./ProductCard.module.scss";

// Receiving props including onShowDetail
const ProductCard = ({ product, onAddToCart, onShowDetail }) => {
  return (
    <div className={styles.card}>
      {/* onClick added to the image for details */}
      <img
        src={product.image}
        alt={product.title}
        className={styles.image}
        onClick={() => onShowDetail(product)}
        style={{ cursor: "pointer" }}
      />

      {/* onClick added to the title for details */}
      <h3
        className={styles.title}
        onClick={() => onShowDetail(product)}
        style={{ cursor: "pointer" }}
      >
        {product.title}
      </h3>

      <span className={styles.price}>${product.price}</span>

      <button className={styles.addBtn} onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
