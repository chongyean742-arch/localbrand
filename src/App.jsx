import { useEffect, useMemo, useState } from 'react';
import './App.css';

const products = [
  { id: 1, name: 'The Everyday Tote', category: 'Bags', price: 128, oldPrice: 160, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85', tag: 'Bestseller', color: 'Cognac', stock: 18, description: 'A quietly confident carryall, thoughtfully made from supple, responsibly sourced leather.' },
  { id: 2, name: 'Sculpted Leather Loafer', category: 'Shoes', price: 145, image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=900&q=85', tag: 'New', color: 'Espresso', stock: 12, description: 'A modern classic with a softly structured shape and considered details.' },
  { id: 3, name: 'The Weekender', category: 'Travel', price: 215, oldPrice: 260, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85', tag: 'Limited', color: 'Olive', stock: 7, description: 'Room for the long way round. Our durable weekender makes every departure feel considered.' },
  { id: 4, name: 'Everyday Mini Crossbody', category: 'Bags', price: 98, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85', tag: 'New', color: 'Sand', stock: 24, description: 'Your most reached-for essentials, beautifully in hand.' },
  { id: 5, name: 'Soft Knit Cardigan', category: 'Clothing', price: 168, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85', tag: 'Bestseller', color: 'Oat', stock: 15, description: 'A feather-soft layer to wear on repeat, knit from a breathable cotton blend.' },
  { id: 6, name: 'Classic Court Sneaker', category: 'Shoes', price: 110, oldPrice: 138, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', tag: 'Sale', color: 'Chalk / Rose', stock: 9, description: 'An effortless everyday sneaker with a cushioned insole and a considered profile.' },
  { id: 7, name: 'Everyday Gold Hoops', category: 'Accessories', price: 58, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85', tag: 'Bestseller', color: 'Gold', stock: 30, description: 'The finishing touch you will never want to take off.' },
  { id: 8, name: 'Soft Structure Shoulder Bag', category: 'Bags', price: 178, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85', tag: 'New', color: 'Black', stock: 11, description: 'Clean lines meet everyday ease in a soft, structured silhouette.' },
];

const adminLinks = [
  ['Overview', 'Dashboard'], ['Products', 'Products'], ['Categories', 'Categories'],
  ['Orders', 'Orders'], ['Customers', 'Customers'], ['Payments', 'Payments'],
  ['Reviews', 'Reviews'], ['Promotions', 'Promotions'], ['CMS', 'CMS'],
  ['Reports', 'Reports'], ['Settings', 'Settings'],
];
const money = (amount) => `$${Number(amount).toFixed(2)}`;
const readSaved = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Unable to read saved ${key}.`, error);
    return fallback;
  }
};
const getAccounts = () => readSaved('localbrand-accounts', []);
const hashPassword = async (password, salt) => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: encoder.encode(salt), iterations: 120000, hash: 'SHA-256' },
    key,
    256,
  );
  return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, '0')).join('');
};
const Icon = ({ name, size = 19 }) => {
  const paths = {
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    heart: <path d="M20.8 8.7c0 5.1-8.8 10.3-8.8 10.3S3.2 13.8 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.3 4.3" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" /></>,
    arrow: <><path d="M4 12h15" /><path d="m13 5 7 7-7 7" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" /><path d="m19 15 1 2.5 2 1-2 1-1 2.5-1-2.5-2-1 2-1 1-2.5Z" /></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
};

function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState(() => readSaved('localbrand-cart', readSaved('atelier-cart', [])));
  const [wishlist, setWishlist] = useState(() => readSaved('localbrand-wishlist', readSaved('atelier-wishlist', [])));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [notice, setNotice] = useState('');
  const [adminSection, setAdminSection] = useState('Overview');
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [accountSection, setAccountSection] = useState('Profile');
  const [signedInEmail, setSignedInEmail] = useState(() => readSaved('localbrand-session', ''));
  const [orderNumber, setOrderNumber] = useState('');
  const [authMode, setAuthMode] = useState('Login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { localStorage.setItem('localbrand-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('localbrand-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => (category === 'All' || product.category === category)
      && `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'newest') filtered.sort((a, b) => Number(b.tag === 'New') - Number(a.tag === 'New'));
    return filtered;
  }, [category, search, sort]);

  const go = (nextPage) => {
    setPage(nextPage);
    setMobileMenuOpen(false);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...product, quantity }];
    });
    setNotice(`${product.name} added to your bag`);
  };
  const updateQuantity = (id, change) => setCart((current) => current
    .map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item)
    .filter((item) => item.quantity > 0));
  const toggleWishlist = (product) => {
    const exists = wishlist.includes(product.id);
    setWishlist((current) => exists ? current.filter((id) => id !== product.id) : [...current, product.id]);
    setNotice(exists ? 'Removed from your wishlist' : 'Saved to your wishlist');
  };
  const showProduct = (product) => {
    setDetailQuantity(1);
    setSelectedProduct(product);
  };
  const startCheckout = () => {
    if (!cart.length) return;
    go('checkout');
  };
  const placeOrder = (event) => {
    event.preventDefault();
    if (!cart.length) return;
    setOrderNumber(`AT-${Math.floor(100000 + Math.random() * 900000)}`);
    setCart([]);
    setCouponApplied(false);
    setCoupon('');
    go('confirmation');
  };
  const applyCoupon = (event) => {
    event.preventDefault();
    if (coupon.trim().toUpperCase() === 'WELCOME10') {
      setCouponApplied(true);
      setNotice('Welcome! Your 10% discount has been applied.');
    } else {
      setCouponApplied(false);
      setNotice('That code did not work. Try WELCOME10.');
    }
  };
  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email')).trim().toLowerCase();
    const password = String(form.get('password') || '');
    try {
      if (authMode === 'Forgot password') {
        setNotice('Password reset emails need a connected authentication service. For this local demo, create a new account instead.');
        return;
      }
      const accounts = getAccounts();
      if (!Array.isArray(accounts)) {
        throw new Error('Saved account data is invalid. Clear the localbrand-accounts entry in browser storage and try again.');
      }
      if (authMode === 'Register') {
        if (password !== form.get('confirmPassword')) {
          setNotice('Your passwords do not match.');
          return;
        }
        if (accounts.some((account) => account.email === email)) {
          setNotice('An account with this email already exists. Please sign in.');
          return;
        }
        const saltBytes = crypto.getRandomValues(new Uint8Array(16));
        const salt = Array.from(saltBytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
        const passwordHash = await hashPassword(password, salt);
        localStorage.setItem('localbrand-accounts', JSON.stringify([...accounts, { email, salt, passwordHash }]));
        localStorage.setItem('localbrand-session', JSON.stringify(email));
        setSignedInEmail(email);
        setAccountSection('Profile');
        setNotice('Your account is ready. Welcome to Localbrand!');
        go('account');
        return;
      }
      const account = accounts.find((savedAccount) => savedAccount.email === email);
      if (!account) {
        setNotice('We could not find an account with that email. Create an account first.');
        return;
      }
      const passwordHash = await hashPassword(password, account.salt);
      if (passwordHash !== account.passwordHash) {
        setNotice('That password is not correct. Please try again.');
        return;
      }
      localStorage.setItem('localbrand-session', JSON.stringify(email));
      setSignedInEmail(email);
      setAccountSection('Profile');
      setNotice('You are signed in.');
      go('account');
    } catch (error) {
      console.error('Account authentication failed.', error);
      setNotice(error instanceof Error ? error.message : 'We could not complete that account request.');
    }
  };
  const logout = () => {
    try {
      localStorage.removeItem('localbrand-session');
      setSignedInEmail('');
      setAccountSection('Profile');
      setNotice('You have been logged out.');
      go('home');
    } catch (error) {
      console.error('Could not sign out.', error);
      setNotice('Could not sign out. Please try again.');
    }
  };

  const openShop = (selectedCategory = 'All') => {
    setCategory(selectedCategory);
    setSearch('');
    go('shop');
  };
  const openAdmin = () => {
    setAdminSection('Overview');
    go(adminAuthenticated ? 'admin' : 'admin-login');
  };

  const Header = () => (
    <>
      <div className="announcement">A little something for your first order — take 10% off with <strong>WELCOME10</strong></div>
      <header className="site-header">
        <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Icon name={mobileMenuOpen ? 'close' : 'menu'} /></button>
        <button className="wordmark" onClick={() => go('home')} aria-label="Localbrand home">localbrand<span>.</span></button>
        <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <button onClick={() => go('home')}>Home</button>
          <button onClick={() => openShop()}>Shop</button>
          <button onClick={() => openShop('Clothing')}>Clothing</button>
          <button onClick={() => openShop('Bags')}>Bags</button>
          <button onClick={() => openShop('Accessories')}>Accessories</button>
        </nav>
        <div className="header-actions">
          <label className="header-search"><Icon name="search" /><input aria-label="Search products" placeholder="Search" value={search} onChange={(event) => { setSearch(event.target.value); setPage('shop'); }} onFocus={() => page !== 'shop' && go('shop')} /></label>
          <button className="icon-button header-account" aria-label="My account" onClick={() => go('account')}><Icon name="user" /></button>
          <button className="icon-button wishlist-action" aria-label="Wishlist" onClick={() => go('wishlist')}><Icon name="heart" /><span className="count-badge">{wishlist.length}</span></button>
          <button className="icon-button bag-action" aria-label="Shopping bag" onClick={() => go('cart')}><Icon name="bag" /><span className="count-badge">{cartCount}</span></button>
        </div>
      </header>
    </>
  );

  const ProductCard = ({ product }) => (
    <article className="product-card">
      <div className="product-image-wrap">
        <button className="product-image-button" onClick={() => showProduct(product)} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </button>
        <span className={`product-tag ${product.tag === 'Sale' ? 'sale-tag' : ''}`}>{product.tag}</span>
        <button className={`product-heart ${wishlist.includes(product.id) ? 'is-saved' : ''}`} aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => toggleWishlist(product)}><Icon name="heart" /></button>
        <button className="quick-add" onClick={() => addToCart(product)}>Add to bag <span>+</span></button>
      </div>
      <button className="product-info" onClick={() => showProduct(product)}>
        <span className="product-category">{product.category} <span>·</span> {product.color}</span>
        <span className="product-name">{product.name}</span>
        <span className="product-price">{money(product.price)} {product.oldPrice && <del>{money(product.oldPrice)}</del>}</span>
      </button>
    </article>
  );

  const ProductGrid = ({ items }) => items.length
    ? <div className="product-grid">{items.map((product) => <div className="product-card-slot" key={product.id}>{ProductCard({ product })}</div>)}</div>
    : <div className="empty-state"><span className="empty-icon">⌕</span><h3>Nothing here just yet</h3><p>Try a different search or explore all of our pieces.</p><button className="button button-dark" onClick={() => openShop()}>Explore the collection</button></div>;

  const Footer = () => (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand"><button className="wordmark footer-wordmark" onClick={() => go('home')}>localbrand<span>.</span></button><p>Considered pieces for the everyday. Designed with care, made to be kept.</p><span className="footer-social">Instagram&nbsp;&nbsp; Pinterest</span></div>
        <div className="footer-column"><h4>Discover</h4><button onClick={() => openShop()}>Shop all</button><button onClick={() => openShop('Bags')}>Bags</button><button onClick={() => openShop('Clothing')}>Clothing</button><button onClick={() => openShop('Accessories')}>Accessories</button></div>
        <div className="footer-column"><h4>Here to help</h4><button onClick={() => go('account')}>My account</button><button onClick={() => { setAccountSection('Order tracking'); go('account'); }}>Order tracking</button><button onClick={() => setNotice('We are here for you at hello@localbrand.example')}>Contact us</button><button onClick={() => setNotice('Questions? Write to hello@localbrand.example')}>FAQs</button></div>
        <div className="footer-newsletter"><h4>A note from us</h4><p>New arrivals, thoughtful reads, and 10% off your first order.</p><form onSubmit={(event) => { event.preventDefault(); setNotice('You are on the list. Talk soon!'); }}><input aria-label="Email for newsletter" type="email" required placeholder="Your email address" /><button aria-label="Subscribe"><Icon name="arrow" /></button></form><small>By subscribing, you agree to our privacy policy.</small></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Localbrand. Made with intention.</span><div><button onClick={() => setNotice('Terms and conditions coming soon.')}>Terms</button><button onClick={() => setNotice('Privacy policy coming soon.')}>Privacy</button><button onClick={() => setNotice('Shipping and returns information coming soon.')}>Shipping & returns</button></div><span>USD&nbsp; · &nbsp;English</span></div>
    </footer>
  );

  const SectionHeading = ({ eyebrow, title, text, action, onAction }) => (
    <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="section-description">{text}</p>}</div>{action && <button className="text-link" onClick={onAction}>{action} <Icon name="arrow" size={16} /></button>}</div>
  );

  const HomePage = () => (
    <>
      <main>
        <section className="hero">
          <div className="hero-content"><p className="eyebrow">The good things, made to last</p><h1>Less, but<br /><em>so much better.</em></h1><p className="hero-copy">Thoughtfully made essentials for the life you actually live. Good materials, lovely details, no fuss.</p><button className="button button-dark" onClick={() => openShop()}>Find your everyday <Icon name="arrow" size={16} /></button><div className="hero-note"><span>✳</span> Made to be lived in. Made to be loved.</div></div>
          <div className="hero-image"><img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=90" alt="A beautifully made everyday leather bag" /><span className="hero-image-caption">A little more considered. A lot more you.</span><span className="hero-image-index">01 — 04</span></div>
          <span className="hero-vertical">THE EVERYDAY EDIT · EST. 2026</span>
        </section>
        <section className="promise-strip"><div><span>01</span><p>Made with intention</p></div><div><span>02</span><p>Free shipping over $150</p></div><div><span>03</span><p>Easy, considered returns</p></div><div><span>04</span><p>Pieces you'll keep forever</p></div></section>
        <section className="home-section category-section">{SectionHeading({ eyebrow: 'A place for everything', title: 'A little something for every day.', action: 'Shop everything', onAction: () => openShop() })}<div className="category-grid">{[['Bags', 'The right bag changes everything.', 'photo-1584917865442-de89df76afd3'], ['Clothing', 'Your new off-duty favourites.', 'photo-1576566588028-4147f3842f27'], ['Shoes', 'A good day starts from the ground up.', 'photo-1542291026-7eec264c27ff'], ['Accessories', 'It’s the little things.', 'photo-1535632066927-ab7c9ab60908']].map(([name, subtitle, image], index) => <button key={name} className={`category-card category-card-${index + 1}`} onClick={() => openShop(name)}><img src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=85`} alt="" /><span className="category-overlay"><span className="category-kicker">EXPLORE THE EDIT</span><strong>{name}</strong><span className="category-subtitle">{subtitle}</span></span><span className="category-arrow"><Icon name="arrow" /></span></button>)}</div></section>
        <section className="home-section bestsellers-section">{SectionHeading({ eyebrow: 'The ones you keep coming back to', title: 'Good things, on repeat.', text: 'Thoughtfully designed. Worn on repeat. Made to make every day feel a little more like you.', action: 'Shop all pieces', onAction: () => openShop() })}{ProductGrid({ items: products.slice(0, 4) })}</section>
        <section className="story-banner"><div className="story-image"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85" alt="Sunlit independent localbrand studio" /></div><div className="story-copy"><p className="eyebrow">A little more thoughtful</p><h2>Buy less.<br /><em>Love longer.</em></h2><p>We believe the best things are the ones you reach for every morning. So we make fewer of them, make them carefully, and make them to stay.</p><button className="text-link" onClick={() => setNotice('Our story is coming soon. Stay a little while.')}>Get to know us <Icon name="arrow" size={16} /></button><span className="story-mark">A</span></div></section>
        <section className="home-section arrivals-section">{SectionHeading({ eyebrow: 'Just found their way here', title: 'New, and already lovely.', action: 'See what’s new', onAction: () => { setSort('newest'); openShop(); } })}{ProductGrid({ items: products.filter((product) => product.tag === 'New') })}</section>
        <section className="promo-banner"><div className="promo-text"><p className="eyebrow">A small thank you</p><h2>Something good<br />is in your <em>inbox.</em></h2><p>Take 10% off your first order. No big speeches, just a little something from us to you.</p><button className="button button-outline" onClick={() => document.querySelector('.footer-newsletter input')?.focus()}>Count me in <Icon name="arrow" size={16} /></button></div><div className="promo-decoration"><span>10</span><small>% OFF<br />YOUR FIRST ORDER</small><i>✳</i></div></section>
      </main>
    </>
  );

  const ShopPage = () => (
    <main className="page-container shop-page"><div className="page-intro"><p className="eyebrow">Good things live here</p><h1>Shop the collection<span>.</span></h1><p>A thoughtfully edited collection of things you'll reach for every day.</p></div><div className="shop-toolbar"><div className="category-filters">{['All', 'Bags', 'Clothing', 'Shoes', 'Accessories', 'Travel'].map((name) => <button key={name} className={category === name ? 'filter-active' : ''} onClick={() => setCategory(name)}>{name}</button>)}</div><div className="sort-control"><span>{filteredProducts.length} pieces</span><select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div></div>{ProductGrid({ items: filteredProducts })}</main>
  );

  const CartPage = () => (
    <main className="page-container checkout-page"><p className="eyebrow">Your good things</p><h1>Your bag<span>.</span></h1>{!cart.length ? <div className="empty-state"><span className="empty-icon"><Icon name="bag" size={30} /></span><h3>It's looking a little empty.</h3><p>Some lovely things are waiting to come home with you.</p><button className="button button-dark" onClick={() => openShop()}>Find your something <Icon name="arrow" size={16} /></button></div> : <div className="checkout-layout"><div className="cart-items">{cart.map((item) => <article className="cart-item" key={item.id}><button className="cart-image" onClick={() => setSelectedProduct(item)}><img src={item.image} alt={item.name} /></button><div className="cart-item-copy"><p className="product-category">{item.category} · {item.color}</p><h3>{item.name}</h3><p>{money(item.price)}</p><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, -1)}><Icon name="minus" size={14} /></button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => updateQuantity(item.id, 1)}><Icon name="plus" size={14} /></button></div></div><button className="remove-item" onClick={() => setCart((current) => current.filter((product) => product.id !== item.id))}>Remove</button></article>)}</div><aside className="order-summary"><h2>A little summary</h2><div className="coupon-field"><form onSubmit={applyCoupon}><input placeholder="Gift card or discount code" aria-label="Discount code" value={coupon} onChange={(event) => setCoupon(event.target.value)} /><button>Apply</button></form><small>Try WELCOME10 for 10% off your first order.</small></div>{couponApplied && <p className="discount-note">Welcome discount <span>−{money(discount)}</span></p>}<div className="summary-row"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="summary-row"><span>Shipping</span><span>{subtotal >= 150 ? 'On us' : 'Calculated at checkout'}</span></div><div className="summary-total"><span>Total</span><strong>{money(subtotal - discount)}</strong></div><button className="button button-dark full-button" onClick={startCheckout}>Continue to checkout <Icon name="arrow" size={16} /></button><div className="secure-note">✳&nbsp; A secure, easy checkout. Always.</div></aside></div>}</main>
  );

  const CheckoutPage = () => (
    <main className="page-container checkout-page"><p className="eyebrow">Nearly yours</p><h1>Checkout<span>.</span></h1><div className="checkout-layout"><form className="checkout-form" onSubmit={placeOrder}><div className="checkout-form-section"><p className="eyebrow">01 — Where to?</p><h2>Shipping details</h2><div className="form-grid"><label>First name<input required autoComplete="given-name" placeholder="Jane" /></label><label>Last name<input required autoComplete="family-name" placeholder="Smith" /></label><label className="form-span">Email address<input required type="email" autoComplete="email" placeholder="jane@example.com" /></label><label className="form-span">Street address<input required autoComplete="street-address" placeholder="123 Anywhere Street" /></label><label>City<input required autoComplete="address-level2" placeholder="Brooklyn" /></label><label>ZIP / Postal code<input required autoComplete="postal-code" placeholder="11201" /></label><label className="form-span">Country<select required defaultValue=""><option value="" disabled>Select your country</option><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option></select></label></div></div><div className="checkout-form-section"><p className="eyebrow">02 — The important bit</p><h2>Payment method</h2><label className="payment-option"><input type="radio" name="payment" defaultChecked /> <span><strong>Credit or debit card</strong><small>Visa, Mastercard, American Express</small></span><span>VISA&nbsp; · &nbsp;MC</span></label><label className="payment-option"><input type="radio" name="payment" /> <span><strong>PayPal</strong><small>You'll be redirected to PayPal to pay.</small></span><span>PayPal</span></label><p className="demo-payment-note">Demo checkout — no real payment will be collected.</p></div><button className="button button-dark full-button">Place your order <Icon name="arrow" size={16} /></button></form><aside className="order-summary"><h2>In your bag</h2>{cart.map((item) => <div className="summary-product" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><small>Qty {item.quantity} · {item.color}</small></div><span>{money(item.price * item.quantity)}</span></div>)}<div className="summary-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>{couponApplied && <div className="summary-row discount-note"><span>Welcome discount</span><span>−{money(discount)}</span></div>}<div className="summary-row"><span>Shipping</span><span>{subtotal >= 150 ? 'On us' : '$8.00'}</span></div><div className="summary-total"><span>Total</span><strong>{money(Math.max(0, subtotal - discount) + (subtotal >= 150 ? 0 : 8))}</strong></div></aside></div></main>
  );

  const WishlistPage = () => <main className="page-container shop-page"><p className="eyebrow">A little list of lovely things</p><h1>Your wishlist<span>.</span></h1>{wishlist.length ? ProductGrid({ items: products.filter((product) => wishlist.includes(product.id)) }) : <div className="empty-state"><span className="empty-icon"><Icon name="heart" size={30} /></span><h3>Keep the things you love close.</h3><p>Tap the little heart on any piece to save it for later.</p><button className="button button-dark" onClick={() => openShop()}>Explore the collection <Icon name="arrow" size={16} /></button></div>}</main>;

  const AccountPage = () => {
    const accountTabs = ['Profile', 'My orders', 'Order tracking', 'Addresses', 'Change password', 'Wishlist'];
    return <main className="page-container account-page"><p className="eyebrow">Your little corner</p><h1>My account<span>.</span></h1><div className="account-layout"><nav className="account-nav">{accountTabs.map((tab) => <button className={accountSection === tab ? 'account-tab-active' : ''} key={tab} onClick={() => tab === 'Wishlist' ? go('wishlist') : setAccountSection(tab)}>{tab}<span>→</span></button>)}{signedInEmail && <button onClick={logout}>Log out <span>→</span></button>}</nav><section className="account-content">{accountSection === 'Profile' && <><p className="eyebrow">{signedInEmail ? 'You are signed in' : 'Welcome to your account'}</p><h2>{signedInEmail ? 'Hello there.' : 'Hello there.'}</h2>{signedInEmail ? <><p>Signed in as <strong>{signedInEmail}</strong>. Your Localbrand account is ready.</p><button className="button button-light" onClick={logout}>Log out</button></> : <><p>Sign in or create an account to keep all your lovely things in one place.</p><div className="account-actions"><button className="button button-dark" onClick={() => { setAuthMode('Login'); go('auth'); }}>Sign in <Icon name="arrow" size={16} /></button><button className="button button-light" onClick={() => { setAuthMode('Register'); go('auth'); }}>Create account</button></div></>}</>}{accountSection === 'My orders' && <><p className="eyebrow">Your order history</p><h2>Orders</h2><div className="account-empty"><span>✳</span><p>Your orders will find their way here.</p><button className="text-link" onClick={() => go('cart')}>Go to your bag <Icon name="arrow" size={16} /></button></div></>}{accountSection === 'Order tracking' && <><p className="eyebrow">On its way to you</p><h2>Track an order</h2><form onSubmit={(event) => { event.preventDefault(); setNotice('No order found. Sign in to see your recent orders.'); }} className="tracking-form"><label>Order number<input required placeholder="e.g. AT-123456" value={orderNumber} onChange={(event) => setOrderNumber(event.target.value)} /></label><button className="button button-dark">Find my order <Icon name="arrow" size={16} /></button></form></>}{accountSection === 'Addresses' && <><p className="eyebrow">Ready when you are</p><h2>Your addresses</h2><p>{signedInEmail ? 'Saved addresses will appear here.' : 'Sign in to save an address for a quicker checkout.'}</p></>}{accountSection === 'Change password' && <><p className="eyebrow">A little account housekeeping</p><h2>Change password</h2><button className="button button-dark" onClick={() => { setAuthMode('Forgot password'); go('auth'); }}>Send a reset link <Icon name="arrow" size={16} /></button></>}</section></div></main>;
  };

  const AuthPage = () => <main className="auth-page"><div className="auth-card"><p className="eyebrow">A lovely place to come back to</p><h1>{authMode}<span>.</span></h1><p>{authMode === 'Login' ? 'Good to see you again.' : authMode === 'Register' ? 'Make room for the good things.' : 'We’ll send a little help your way.'}</p><form onSubmit={handleAuthSubmit}><label>Email address<input name="email" required type="email" autoComplete="email" placeholder="you@example.com" /></label>{authMode !== 'Forgot password' && <label>Password<input name="password" required type="password" minLength="8" autoComplete={authMode === 'Register' ? 'new-password' : 'current-password'} placeholder="At least 8 characters" /></label>}{authMode === 'Register' && <label>Confirm password<input name="confirmPassword" required type="password" minLength="8" autoComplete="new-password" placeholder="Once more, just to be sure" /></label>}<button className="button button-dark full-button">{authMode === 'Login' ? 'Sign in' : authMode === 'Register' ? 'Create account' : 'Send reset link'} <Icon name="arrow" size={16} /></button></form><div className="auth-switch">{authMode === 'Login' ? <><button onClick={() => setAuthMode('Forgot password')}>Forgot password?</button><span>New around here? <button onClick={() => setAuthMode('Register')}>Create an account</button></span></> : <span>Already have an account? <button onClick={() => setAuthMode('Login')}>Sign in</button></span>}</div><p className="auth-storage-note">Demo account is stored in this browser only. Use a non-sensitive password.</p></div></main>;

  const ConfirmationPage = () => <main className="confirmation-page"><div className="confirmation-mark"><Icon name="check" size={32} /></div><p className="eyebrow">A very good choice</p><h1>It's all yours<span>.</span></h1><p className="confirmation-copy">Thank you for your order. We are already getting the good things ready.</p><div className="confirmation-number"><span>YOUR ORDER NUMBER</span><strong>{orderNumber}</strong></div><button className="button button-dark" onClick={() => go('account')}>See your order <Icon name="arrow" size={16} /></button><button className="text-link confirmation-continue" onClick={() => openShop()}>Keep looking around <Icon name="arrow" size={16} /></button></main>;

  const AdminLoginPage = () => <main className="admin-login-page"><form className="admin-login-card" onSubmit={(event) => { event.preventDefault(); setAdminAuthenticated(true); go('admin'); }}><button type="button" className="admin-login-brand" onClick={() => go('home')}>localbrand<span>.</span></button><p className="eyebrow">STUDIO ADMIN</p><h1>Welcome back<span>.</span></h1><p className="admin-login-copy">Sign in to take a look around your store.</p><label>Email address<input required type="email" placeholder="you@yourstore.com" /></label><label>Password<input required type="password" minLength="8" placeholder="Your password" /></label><button className="button button-dark full-button">Sign in to your store <Icon name="arrow" size={16} /></button><small>Preview access only — connect secure authentication before launch.</small></form></main>;

  const AdminPage = () => {
    const data = {
      Products: { description: 'A thoughtful edit, from our studio to the world.', columns: ['Product', 'Category', 'Price', 'Stock', 'Status'], rows: products.map((p) => [p.name, p.category, money(p.price), p.stock, p.tag]) },
      Categories: { description: 'The little collections that make up our world.', columns: ['Category', 'Products', 'Visibility'], rows: [['Bags', 3, 'Published'], ['Clothing', 1, 'Published'], ['Shoes', 2, 'Published'], ['Accessories', 2, 'Published'], ['Travel', 1, 'Published']] },
      Orders: { description: 'A little overview of what is on its way.', columns: ['Order', 'Customer', 'Date', 'Total', 'Status'], rows: [['#AT-10481', 'Olivia Martin', 'Today, 10:42 am', '$273.00', 'Processing'], ['#AT-10480', 'James Wilson', 'Today, 09:18 am', '$145.00', 'Confirmed'], ['#AT-10479', 'Sofia Chen', 'Yesterday', '$98.00', 'Shipped'], ['#AT-10478', 'Amelia Brown', 'Oct 01, 2026', '$326.00', 'Delivered']] },
      Customers: { description: 'The lovely people who make it all possible.', columns: ['Customer', 'Email', 'Orders', 'Spent'], rows: [['Olivia Martin', 'olivia@example.com', 3, '$482.00'], ['James Wilson', 'james@example.com', 1, '$145.00'], ['Sofia Chen', 'sofia@example.com', 2, '$226.00'], ['Amelia Brown', 'amelia@example.com', 5, '$814.00']] },
      Payments: { description: 'A clear picture of every payment.', columns: ['Payment', 'Order', 'Date', 'Amount', 'Status'], rows: [['PAY-2091', '#AT-10481', 'Today', '$273.00', 'Paid'], ['PAY-2090', '#AT-10480', 'Today', '$145.00', 'Paid'], ['PAY-2089', '#AT-10479', 'Yesterday', '$98.00', 'Pending'], ['PAY-2088', '#AT-10478', 'Oct 01', '$326.00', 'Paid']] },
      Reviews: { description: 'A few kind words, and a couple waiting for a look.', columns: ['Customer', 'Product', 'Rating', 'Date', 'Status'], rows: [['Emma W.', 'The Everyday Tote', '★★★★★', 'Today', 'Published'], ['Olivia M.', 'Everyday Mini Crossbody', '★★★★☆', 'Yesterday', 'Pending'], ['Sophie R.', 'Classic Court Sneaker', '★★★★★', 'Sep 29', 'Published']] },
      Promotions: { description: "Small ways to make someone's day.", columns: ['Code', 'Offer', 'Usage', 'Expires', 'Status'], rows: [['WELCOME10', '10% off first order', '126 uses', 'No expiry', 'Active'], ['AUTUMN15', '15% off selected pieces', '48 uses', 'Oct 31, 2026', 'Active']] },
      CMS: { description: 'Words, images, and little details around the shop.', columns: ['Page', 'Last updated', 'Visibility'], rows: [['Home banner', 'Oct 04, 2026', 'Published'], ['About us', 'Sep 28, 2026', 'Published'], ['Terms & conditions', 'Sep 14, 2026', 'Published'], ['Privacy policy', 'Sep 14, 2026', 'Published'], ['Contact us', 'Aug 30, 2026', 'Published']] },
      Reports: { description: 'The bigger picture, at a glance.', columns: ['Report', 'Period', 'Result', 'Change'], rows: [['Sales report', 'Last 30 days', '$24,580.00', '+12.8%'], ['Order report', 'Last 30 days', '186 orders', '+8.2%'], ['Product report', 'Best seller', 'The Everyday Tote', '42 sold'], ['Customer report', 'Returning customers', '38%', '+4.1%']] },
      Settings: { description: 'All the little things that make this shop yours.', columns: ['Setting', 'Current value', 'Status'], rows: [['Store settings', 'Localbrand · USD', 'Configured'], ['Admin profile', 'hello@localbrand.example', 'Active'], ['Users & roles', '2 team members', 'Manage'], ['Payment settings', 'Card · PayPal', 'Configured'], ['Shipping settings', 'Free over $150', 'Configured']] },
    };
    const sectionData = data[adminSection];
    return <div className="admin-layout"><aside className="admin-sidebar"><button className="admin-brand" onClick={() => go('home')}>localbrand<span>.</span><small>STUDIO ADMIN</small></button><p className="admin-sidebar-label">WORKSPACE</p><nav>{adminLinks.map(([icon, label]) => <button key={label} className={adminSection === label ? 'admin-link-active' : ''} onClick={() => setAdminSection(label)}><span className="admin-link-icon">{icon === 'Overview' ? '◫' : icon === 'Products' ? '◇' : icon === 'Categories' ? '▦' : icon === 'Orders' ? '▤' : icon === 'Customers' ? '♙' : icon === 'Payments' ? '＄' : icon === 'Reviews' ? '☆' : icon === 'Promotions' ? '%' : icon === 'CMS' ? '▧' : icon === 'Reports' ? '▥' : '⚙'}</span>{label}{label === 'Orders' && <span className="admin-nav-count">4</span>}</button>)}</nav><div className="admin-sidebar-bottom"><div className="admin-profile"><span className="admin-avatar">A</span><span><strong>Alex Morgan</strong><small>Store administrator</small></span><span>···</span></div><button className="back-to-store" onClick={() => go('home')}>←&nbsp; Back to store</button></div></aside><main className="admin-main"><header className="admin-topbar"><div className="admin-breadcrumb">Studio <span>/</span> {adminSection}</div><div className="admin-top-actions"><span className="admin-store-status"><i /> Store is live</span><button onClick={() => go('home')}>View your store ↗</button><span className="admin-top-avatar">A</span></div></header><div className="admin-content"><div className="admin-page-title"><div><p className="eyebrow">SUNDAY, OCTOBER 4, 2026</p><h1>{adminSection === 'Overview' ? 'A good morning, Alex' : adminSection}<span>.</span></h1><p>{adminSection === 'Overview' ? 'Here’s what’s happening in your little corner of the internet.' : sectionData?.description}</p></div><button className="admin-date-button">↗&nbsp; Last 30 days&nbsp;⌄</button></div>{adminSection === 'Overview' ? <><div className="admin-metrics">{[['Total sales', '$24,580', '+12.8%', '01'], ['Orders', '186', '+8.2%', '02'], ['Products', '42', '4 low in stock', '03'], ['Customers', '1,284', '+18.4%', '04']].map(([label, number, change, index]) => <article className="admin-metric" key={label}><span>{label}<small>{index}</small></span><strong>{number}</strong><p className={change.includes('low') ? 'metric-warning' : ''}>{change.includes('low') ? '●' : '↗'} &nbsp;{change} <span>vs last month</span></p></article>)}</div><div className="admin-dashboard-grid"><section className="admin-panel sales-panel"><div className="admin-panel-heading"><div><h2>Sales over time</h2><p>A little upward momentum. We like to see it.</p></div><button>Weekly ⌄</button></div><div className="sales-chart"><div className="chart-y-labels"><span>$8k</span><span>$6k</span><span>$4k</span><span>$2k</span><span>$0</span></div><div className="chart-plot"><div className="chart-gridlines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 700 210" preserveAspectRatio="none" role="img" aria-label="Sales have risen over the past six months"><defs><linearGradient id="salesFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#65795f" stopOpacity=".2" /><stop offset="100%" stopColor="#65795f" stopOpacity="0" /></linearGradient></defs><path d="M0 172 C45 163 60 152 100 159 S150 130 190 140 S235 110 280 125 S330 91 370 104 S430 79 470 89 S525 47 560 68 S620 33 660 42 S685 20 700 24 L700 210 L0 210Z" fill="url(#salesFill)" /><path d="M0 172 C45 163 60 152 100 159 S150 130 190 140 S235 110 280 125 S330 91 370 104 S430 79 470 89 S525 47 560 68 S620 33 660 42 S685 20 700 24" fill="none" stroke="#65795f" strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg><div className="chart-x-labels"><span>Sep 05</span><span>Sep 10</span><span>Sep 15</span><span>Sep 20</span><span>Sep 25</span><span>Sep 30</span><span>Oct 04</span></div></div></div></section><section className="admin-panel top-products"><div className="admin-panel-heading"><div><h2>Lovely little bestsellers</h2><p>Your most-loved pieces this month</p></div><button onClick={() => setAdminSection('Products')}>View all →</button></div>{products.slice(0, 4).map((product, index) => <div className="top-product" key={product.id}><span className="top-product-rank">0{index + 1}</span><img src={product.image} alt="" /><div><strong>{product.name}</strong><small>{product.category} · {product.stock} in stock</small></div><span>{money(product.price)}</span></div>)}</section></div><section className="admin-panel recent-orders"><div className="admin-panel-heading"><div><h2>Recent orders</h2><p>The latest good things going out.</p></div><button onClick={() => setAdminSection('Orders')}>All orders →</button></div>{AdminTable({ data: data.Orders })}</section></> : <section className="admin-panel admin-table-panel"><div className="admin-panel-heading"><div><h2>{adminSection === 'Products' ? 'All products' : adminSection === 'Orders' ? 'All orders' : `All ${adminSection.toLowerCase()}`}</h2><p>{sectionData?.description}</p></div><div className="admin-table-actions"><input aria-label={`Search ${adminSection}`} placeholder="⌕  Search..." /><button className="admin-add-button" onClick={() => setNotice(adminSection === 'Products' ? 'Product editor is ready to connect to your store backend.' : `${adminSection} management is ready to connect to your store backend.`)}>＋&nbsp; {adminSection === 'Products' ? 'Add product' : adminSection === 'Categories' ? 'Add category' : adminSection === 'Promotions' ? 'Create promotion' : 'Export'}</button></div></div>{sectionData && AdminTable({ data: sectionData })}</section>}</div></main></div>;
  };

  const AdminTable = ({ data }) => <div className="admin-table-scroll"><table className="admin-table"><thead><tr>{data.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{data.rows.map((row, index) => <tr key={`${row[0]}-${index}`}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cellIndex === row.length - 1 && ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Paid', 'Pending', 'Active', 'Published'].includes(cell) ? <span className={`status-pill ${cell.toLowerCase()}`}>{cell}</span> : cellIndex === 0 && data.columns.includes('Product') ? <span className="table-product-name"><img src={products.find((product) => product.name === cell)?.image || products[0].image} alt="" />{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div>;

  return <>
    {page !== 'admin' && page !== 'admin-login' && Header()}
    {page === 'home' && HomePage()}
    {page === 'shop' && ShopPage()}
    {page === 'cart' && CartPage()}
    {page === 'checkout' && CheckoutPage()}
    {page === 'wishlist' && WishlistPage()}
    {page === 'account' && AccountPage()}
    {page === 'auth' && AuthPage()}
    {page === 'confirmation' && ConfirmationPage()}
    {page === 'admin-login' && AdminLoginPage()}
    {page === 'admin' && AdminPage()}
    {page !== 'admin' && page !== 'admin-login' && Footer()}
    {page !== 'admin' && page !== 'admin-login' && <div className="admin-entry"><button onClick={openAdmin}>Store admin <span>↗</span></button></div>}
    {page === 'admin-login' && <button className="admin-login-back" onClick={() => go('home')}>←&nbsp; Back to store</button>}
    {page === 'admin' && <button className="admin-logout" onClick={() => { setAdminAuthenticated(false); go('home'); }}>Log out&nbsp; ↗</button>}
    {selectedProduct && <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setSelectedProduct(null); }}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-label={selectedProduct.name}>
        <button className="modal-close icon-button" aria-label="Close product details" onClick={() => setSelectedProduct(null)}><Icon name="close" /></button>
        <div className="modal-image"><img src={selectedProduct.image} alt={selectedProduct.name} /></div>
        <div className="modal-details">
          <p className="eyebrow">{selectedProduct.category} · {selectedProduct.color}</p>
          <h2>{selectedProduct.name}</h2>
          <p className="modal-price">{money(selectedProduct.price)} {selectedProduct.oldPrice && <del>{money(selectedProduct.oldPrice)}</del>}</p>
          <p className="review-summary"><span>★★★★★</span> 4.9 <button onClick={() => document.querySelector('.review-preview')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>26 reviews</button></p>
          <p className="modal-description">{selectedProduct.description}</p>
          <p className="stock-note"><span /> {selectedProduct.stock} in stock and ready to find its way to you</p>
          <div className="detail-quantity"><span>Quantity</span><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setDetailQuantity((quantity) => Math.max(1, quantity - 1))}><Icon name="minus" size={14} /></button><span>{detailQuantity}</span><button aria-label="Increase quantity" onClick={() => setDetailQuantity((quantity) => Math.min(selectedProduct.stock, quantity + 1))}><Icon name="plus" size={14} /></button></div></div>
          <button className="button button-dark full-button" onClick={() => { addToCart(selectedProduct, detailQuantity); setSelectedProduct(null); }}>Add to bag <Icon name="bag" size={16} /></button>
          <button className="modal-wishlist" onClick={() => toggleWishlist(selectedProduct)}><Icon name="heart" size={17} /> {wishlist.includes(selectedProduct.id) ? 'Saved to your wishlist' : 'Add to wishlist'}</button>
          <div className="modal-perks"><span>✳ Thoughtfully made</span><span>✳ Easy returns</span><span>✳ Free shipping over $150</span></div>
          <div className="review-preview"><strong>What people are saying</strong><p>★★★★★ &nbsp; “Beautifully made, and even lovelier in person.”</p><small>Verified localbrand customer</small></div>
          <div className="related-preview"><strong>You might also like</strong><div>{products.filter((product) => product.id !== selectedProduct.id && product.category === selectedProduct.category).slice(0, 2).map((product) => <button key={product.id} onClick={() => showProduct(product)}><img src={product.image} alt="" /><span>{product.name}</span><small>{money(product.price)}</small></button>)}</div></div>
        </div>
      </section>
    </div>}
    {notice && <div className="toast" role="status"><span>✳</span>{notice}<button aria-label="Dismiss notification" onClick={() => setNotice('')}><Icon name="close" size={15} /></button></div>}
  </>;
}

export default App;
