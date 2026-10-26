import { useMemo, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "The Everyday Blazer",
    category: "Women",
    price: 2499,
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Modern Minimalist",
    category: "Men",
    price: 1899,
    tag: "NEW ARRIVAL",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    name: "The Statement Look",
    category: "Women",
    price: 3299,
    tag: "EDITOR'S PICK",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    name: "Classic Streetwear",
    category: "Men",
    price: 1599,
    tag: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 5,
    name: "The Soft Knit",
    category: "Women",
    price: 1799,
    tag: "NEW ARRIVAL",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 6,
    name: "Urban Essentials",
    category: "Men",
    price: 2199,
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85",
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function App() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);

    return result;
  }, [category, search, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setNotice(`${product.name} added to your bag`);
    setTimeout(() => setNotice(""), 2200);
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleWishlist(id) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <div className="store">
      <div className="announcement">
        A LITTLE LUXURY, EVERY DAY. &nbsp; FREE SHIPPING ON ORDERS OVER ₹2,999
      </div>

      <header className="navbar">
        <a className="logo" href="#" aria-label="LAVÉ home">
          LAVÉ<span>.</span>
        </a>

        <nav className="nav-links">
          <a href="#collection">NEW IN</a>
          <a href="#collection" onClick={() => setCategory("Women")}>
            WOMEN
          </a>
          <a href="#collection" onClick={() => setCategory("Men")}>
            MEN
          </a>
          <a href="#story">OUR STORY</a>
        </nav>

        <div className="nav-actions">
          <label className="search-box">
            <span>⌕</span>
            <input
              aria-label="Search products"
              placeholder="Search pieces..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </label>

          <button
            className="icon-button"
            onClick={() => {
              document
                .getElementById("collection")
                ?.scrollIntoView({ behavior: "smooth" });
              setNotice(
                wishlist.length
                  ? `${wishlist.length} saved favorite(s)`
                  : "Your wishlist is waiting for a favorite"
              );
              setTimeout(() => setNotice(""), 2200);
            }}
            aria-label="Wishlist"
          >
            ♡ <sup>{wishlist.length || ""}</sup>
          </button>

          <button
            className="icon-button bag-button"
            onClick={() => setShowCart(true)}
            aria-label="Shopping bag"
          >
            ♧ <sup>{cartCount}</sup>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-image" />

          <div className="hero-content">
            <p className="eyebrow">THE NEW SEASON · 2026</p>
            <h1>
              Style is
              <br />
              your <em>signature.</em>
            </h1>
            <p className="hero-copy">
              Thoughtfully chosen pieces. Effortless silhouettes.
              A wardrobe that feels like you.
            </p>

            <a className="primary-button" href="#collection">
              EXPLORE THE COLLECTION <span>↗</span>
            </a>

            <div className="hero-note">
              <span className="note-line" />
              CURATED FOR YOUR EVERYDAY
            </div>
          </div>

          <div className="hero-index">
            <span>01</span> / 03
          </div>
        </section>

        <section className="benefits">
          <div>
            <span>✳</span>
            <p>Thoughtful Design</p>
          </div>
          <div>
            <span>◇</span>
            <p>Quality First</p>
          </div>
          <div>
            <span>↗</span>
            <p>Made for Everyday</p>
          </div>
        </section>

        <section className="collection section" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE LAVÉ EDIT</p>
              <h2>Pieces to <em>fall for.</em></h2>
              <p className="muted">
                The little things that make an outfit everything.
              </p>
            </div>

            <a className="text-link" href="#collection">
              DISCOVER YOUR STYLE ↗
            </a>
          </div>

          <div className="collection-toolbar">
            <div className="filters" aria-label="Filter by category">
              {["All", "Women", "Men"].map((item) => (
                <button
                  key={item}
                  className={category === item ? "filter active" : "filter"}
                  onClick={() => setCategory(item)}
                >
                  {item === "All" ? "All pieces" : item}
                </button>
              ))}
            </div>

            <label className="sort-control">
              <span>SORT BY</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </label>
          </div>

          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading={index > 2 ? "lazy" : "eager"}
                  />

                  <span className="product-tag">{product.tag}</span>

                  <button
                    className={
                      wishlist.includes(product.id)
                        ? "wishlist-button selected"
                        : "wishlist-button"
                    }
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      wishlist.includes(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {wishlist.includes(product.id) ? "♥" : "♡"}
                  </button>

                  <button
                    className="quick-add"
                    onClick={() => addToCart(product)}
                  >
                    ADD TO BAG <span>+</span>
                  </button>
                </div>

                <div className="product-info">
                  <div>
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <p className="product-price">{money(product.price)}</p>
                </div>
              </article>
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <div className="empty-results">
              <h3>No pieces found.</h3>
              <p>Try another search or explore the full collection.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                VIEW ALL PIECES
              </button>
            </div>
          )}
        </section>

        <section className="story" id="story">
          <div className="story-image" />

          <div className="story-content">
            <p className="eyebrow">LESS, BUT BETTER</p>
            <h2>
              Good style.
              <br />
              <em>Good feeling.</em>
            </h2>
            <p>
              We believe getting dressed should feel less like a decision
              and more like an expression of who you are. Discover
              thoughtfully curated styles that make every day feel special.
            </p>
            <a href="#collection" className="text-link">
              GET TO KNOW YOUR STYLE ↗
            </a>
          </div>
        </section>

        <section className="newsletter">
          <p className="eyebrow">A NOTE FROM LAVÉ</p>
          <h2>A little something <em>special.</em></h2>
          <p>Be the first to discover new collections and style edits.</p>

          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();
              setNotice("Thank you! Newsletter demo submitted.");
              event.target.reset();
              setTimeout(() => setNotice(""), 2500);
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              required
            />
            <button type="submit">JOIN US ↗</button>
          </form>
          <small>By subscribing, you agree to receive our demo newsletter.</small>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#">
          LAVÉ<span>.</span>
        </a>
        <p>THE ART OF DRESSING WELL.</p>
        <span>© 2026 LAVÉ STUDIO · PORTFOLIO DEMO</span>
      </footer>

      {notice && <div className="toast">{notice}</div>}

      {showCart && (
        <div
          className="cart-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowCart(false);
          }}
        >
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            <div className="cart-heading">
              <div>
                <p className="eyebrow">YOUR SELECTION</p>
                <h2>Your bag ({cartCount})</h2>
              </div>
              <button
                className="close-button"
                onClick={() => setShowCart(false)}
                aria-label="Close shopping bag"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>♡</span>
                <h3>Nothing here just yet.</h3>
                <p>Your next favorite piece is waiting.</p>
                <button
                  className="primary-button"
                  onClick={() => setShowCart(false)}
                >
                  EXPLORE THE COLLECTION
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p>{money(item.price)}</p>
                        <div className="quantity-control">
                          <button
                            onClick={() => changeQuantity(item.id, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => changeQuantity(item.id, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <strong>{money(item.price * item.quantity)}</strong>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>{money(cartTotal)}</strong>
                  </div>
                  <p>Shipping and taxes calculated at checkout.</p>
                  <button
                    className="primary-button checkout-button"
                    onClick={() => {
                      setShowCart(false);
                      setNotice(
                        "Demo checkout: no payment has been collected."
                      );
                      setTimeout(() => setNotice(""), 3000);
                    }}
                  >
                    CONTINUE TO CHECKOUT ↗
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}