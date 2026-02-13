import styles from "./CartList.module.scss";

const CartList = ({ cart, onRemove, onUpdateQuantity }) => {
  if (cart.length === 0) return null;

  return (
    <div className={styles.cartWrapper}>
      <h3>Your Shopping List</h3>
      {cart.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <span className={styles.title}>{item.title}</span>

          <div className={styles.controls}>
            <div className={styles.quantityGroup}>
              <button
                onClick={() => onUpdateQuantity(item.id, -1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className={styles.qtyValue}>{item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
            </div>

            <div className={styles.priceInfo}>
              <span className={styles.itemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>

            <button
              className={styles.deleteBtn}
              onClick={() => onRemove(item.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
