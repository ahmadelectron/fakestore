import { useState, useEffect } from "react";
import Filters from "./components/Filters/Filters";
import CartList from "./components/CartList/CartList";
import ProductModal from "./components/ProductModal/ProductModal";
import Header from "./components/Header/Header"; // New
import ProductGrid from "./components/ProductGrid/ProductGrid"; // New
import Footer from "./components/Footer/Footer";

function App() {
  const [products, setProducts] = useState([]); // لیست کل محصولات دریافتی از سرور
  const [loading, setLoading] = useState(true); // وضعیت چرخش لودینگ
  const [error, setError] = useState(null); // برای ذخیره متن خطا اگر اینترنت وصل نشد
  const [selectedProduct, setSelectedProduct] = useState(null); // محصولی که در مودال نمایش داده می‌شود

  // سبد خرید و LocalStorage (حافظه بلندمدت)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("final_store_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Search و Debounce (تایپ کردن هوشمند)
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // فیلتر سقف قیمت (maxPrice)
  const [maxPrice, setMaxPrice] = useState(1000);

  // فیلتر دسته بندی (category)
  const [category, setCategory] = useState("all");

  //  دریافت داده‌ها از سرور (The Fetch Logic)
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true); // اول لودینگ را فعال کن
        setError(null);
        const response = await fetch("https://fakestoreapi.com/products"); // درخواست بفرست
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json(); // پاسخ را به فرمت جی‌سان تبدیل کن
        setProducts(data); //  داده‌ها را در حافظه (State) ذخیره کن
      } catch (err) {
        setError(err.message); // اگر خطایی رخ داد، ذخیره‌اش کن
      } finally {
        setLoading(false); // در هر صورت لودینگ را تمام کن
      }
    };
    getProducts();
  }, []); //  این آرایه خالی یعنی: فقط یکبار وقتی صفحه لود شد اجرا شو!

  // Local storage
  useEffect(() => {
    localStorage.setItem("final_store_cart", JSON.stringify(cart));
  }, [cart]);

  // تایمر نیم صانیه برای لرزش گیری بین تایپ و جستجو
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // (اضافه کردن هوشمند)
  const addToCart = (product) => {
    setCart((prev) => {
      const isExist = prev.find((item) => item.id === product.id); // جستجو در سبد فعلی
      if (isExist) {
        // اگر محصول از قبل وجود داشت
        return prev.map(
          (item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 } // فقط تعداد را زیاد کن
              : item, // فقط تعداد را زیاد کن
        );
      }
      return [...prev, { ...product, quantity: 1 }]; // اگر محصول جدید بود، با تعداد ۱ اضافه کن
    });
  };

  // مدیریت سبد خرید (Update Quantity)
  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      }),
    );
  };

  // (حذف آیتم های سبد خرید)
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  //  محاسبه قیمت کل سبد خرید
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // فیلترهای ترکیبی
  const filteredProducts = products.filter((p) => {
    const matchesName = p.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    const matchesPrice = p.price <= maxPrice;
    const matchesCategory = category === "all" || p.category === category;
    return matchesName && matchesPrice && matchesCategory;
  });

  return (
    <div dir="ltr" className="container">
      <ProductModal
        product={selectedProduct}
        allProducts={products}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <Header totalPrice={totalPrice} cartCount={cart.length} />

      <CartList
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        category={category}
        setCategory={setCategory}
      />

      <ProductGrid
        loading={loading}
        error={error}
        products={filteredProducts}
        onAddToCart={addToCart}
        onShowDetail={(p) => setSelectedProduct(p)}
      />

      <Footer />
    </div>
  );
}

export default App;
