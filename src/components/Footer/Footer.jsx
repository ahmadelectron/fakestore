import styles from "./Footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <h2>Modern Store 🌐</h2>
          <p>
            This project is based on <b>ReactJS, Vite & Sass.</b>
          </p>
          <p>
            The data on this store is collected from
            <a href="https://fakestoreapi.com/" target="_blank">
              {" "}
              fakestoreapi{" "}
            </a>
            and they are not real !
          </p>

          <br />
          <hr />
          <br />

          <p>
            Created By <b> Ahmad Sayahi.</b>
          </p>
        </div>

        <div className={styles.links}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>

        <div className={styles.social}>
          <h4>Follow Us</h4>
          <div className={styles.icons}>
            <span>GitHub</span>
            <span>LinkedIn</span>
            <span>Twitter</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {currentYear} Modern Store Project. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
