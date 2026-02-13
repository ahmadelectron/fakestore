import styles from "./ProductModal.module.scss";
import ProductCard from "../ProductCard/ProductCard";

const ProductModal = ({ product, allProducts, onClose, onAddToCart }) => {
  if (!product) return null;

  // Find up to 3 related products from the same category (excluding current product)
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>

        <div className={styles.content}>
          <img src={product.image} alt={product.title} />
          <div className={styles.info}>
            <h2>{product.title}</h2>
            <p className={styles.category}>Category: {product.category}</p>
            <p className={styles.description}>{product.description}</p>
            <span className={styles.price}>${product.price}</span>
            <button
              className={styles.addBtn}
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className={styles.relatedSection}>
            <h3>Related Products:</h3>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((p) => (
                <div key={p.id} className={styles.miniCard} onClick={() => {}}>
                  <img src={p.image} alt={p.title} />
                  <p>{p.title.substring(0, 20)}...</p>
                  <span>${p.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
