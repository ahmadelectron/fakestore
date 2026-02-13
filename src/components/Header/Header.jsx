import styles from "./Header.module.scss";

const Header = ({ totalPrice, cartCount }) => {
  return (
    <header className={styles.header}>
      <h1>Modern Store 🌐</h1>
      <div className={styles.summary}>
        <span className={styles.total}>Total: ${totalPrice.toFixed(2)}</span>
        <small>{cartCount} Items in Cart</small>
      </div>
    </header>
  );
};

export default Header;
