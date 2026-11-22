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

const cambodiaProvinces = [
  'Phnom Penh (រាជធានីភ្នំពេញ)',
  'Siem Reap (ខេត្តសៀមរាប)',
  'Battambang (ខេត្តបាត់ដំបង)',
  'Preah Sihanouk (ខេត្តព្រះសីហនុ)',
  'Kampot (ខេត្តកំពត)',
  'Kandal (ខេត្តកណ្តាល)',
  'Kampong Cham (ខេត្តកំពង់ចាម)',
  'Kampong Speu (ខេត្តកំពង់ស្ពឺ)',
  'Kampong Chhnang (ខេត្តកំពង់ឆ្នាំង)',
  'Kampong Thom (ខេត្តកំពង់ធំ)',
  'Takeo (ខេត្តតាកែវ)',
  'Prey Veng (ខេត្តព្រៃវែង)',
  'Svay Rieng (ខេត្តស្វាយរៀង)',
  'Pursat (ខេត្តពោធិ៍សាត់)',
  'Koh Kong (ខេត្តកោះកុង)',
  'Kratie (ខេត្តក្រចេះ)',
  'Stung Treng (ខេត្តស្ទឹងត្រែង)',
  'Mondulkiri (ខេត្តមណ្ឌលគិរី)',
  'Ratanakiri (ខេត្តរតនគិរី)',
  'Preah Vihear (ខេត្តព្រះវិហារ)',
  'Oddar Meanchey (ខេត្តឧត្តរមានជ័យ)',
  'Banteay Meanchey (ខេត្តបន្ទាយមានជ័យ)',
  'Pailin (ខេត្តប៉ៃលិន)',
  'Tboung Khmum (ខេត្តត្បូងឃ្មុំ)',
  'Kep (ខេត្តកែប)',
];

const money = (amount) => `$${Number(amount).toFixed(2)}`;
const toRiel = (amount) => `៛${(Math.round(Number(amount) * 4100)).toLocaleString()}`;
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

  // Cambodia Localization States
  const [shippingCarrier, setShippingCarrier] = useState('VET'); // 'VET' (VET Express) or 'JND' (J&T Express)
  const [paymentMethod, setPaymentMethod] = useState('KHQR'); // 'KHQR', 'ABA', 'ACLEDA', 'COD'
  const [selectedProvince, setSelectedProvince] = useState(cambodiaProvinces[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerDistrict, setCustomerDistrict] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [lastOrder, setLastOrder] = useState(null);

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

  const isPhnomPenh = selectedProvince.includes('Phnom Penh');
  const baseShippingFee = isPhnomPenh
    ? (shippingCarrier === 'VET' ? 1.50 : 1.75)
    : (shippingCarrier === 'VET' ? 2.00 : 2.50);
  const shippingFee = (subtotal - discount) >= 50 ? 0 : baseShippingFee;
  const grandTotal = Math.max(0, subtotal - discount) + (cart.length ? shippingFee : 0);

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
    setNotice(`${product.name} បានបញ្ចូលទៅកន្ត្រក`);
  };
  const updateQuantity = (id, change) => setCart((current) => current
    .map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item)
    .filter((item) => item.quantity > 0));
  const toggleWishlist = (product) => {
    const exists = wishlist.includes(product.id);
    setWishlist((current) => exists ? current.filter((id) => id !== product.id) : [...current, product.id]);
    setNotice(exists ? 'បានដកចេញពីបញ្ជីចង់បាន' : 'បានរក្សាទុកក្នុងបញ្ជីចង់បាន');
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
    const prefix = shippingCarrier === 'VET' ? 'VET' : 'JT';
    const newOrderNum = `${prefix}-KH${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      orderNumber: newOrderNum,
      items: [...cart],
      total: grandTotal,
      subtotal: subtotal - discount,
      shippingFee,
      shippingCarrier,
      paymentMethod,
      customerName: customerName || 'អតិថិជន (Customer)',
      customerPhone: customerPhone || '012 345 678',
      selectedProvince,
      customerDistrict: customerDistrict || 'Khan/District',
      customerAddress: customerAddress || 'Address',
      customerNote,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setOrderNumber(newOrderNum);
    setLastOrder(orderData);
    setCart([]);
    setCouponApplied(false);
    setCoupon('');
    go('confirmation');
  };
  const applyCoupon = (event) => {
    event.preventDefault();
    if (coupon.trim().toUpperCase() === 'WELCOME10') {
      setCouponApplied(true);
      setNotice('សូមស្វាគមន៍! លោកអ្នកទទួលបានការបញ្ចុះតម្លៃ 10%');
    } else {
      setCouponApplied(false);
      setNotice('កូដមិនត្រឹមត្រូវ។ សាកល្បង WELCOME10');
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

  const KhqrCard = ({ amount, orderId, method = 'KHQR' }) => (
    <div className="khqr-card">
      <div className="khqr-card-header">
        <span>KHQR</span>
        <span>Bakong 🇰🇭</span>
      </div>
      <div className="khqr-card-body">
        <div className="khqr-merchant">LOCALBRAND OFFICIAL</div>
        <div className="khqr-amount-usd">{money(amount)}</div>
        <div className="khqr-amount-khr">≈ {toRiel(amount)}</div>
        <div className="khqr-qr-frame">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#fff" />
            <rect x="15" y="15" width="45" height="45" rx="6" fill="#1c1d18" />
            <rect x="23" y="23" width="29" height="29" rx="3" fill="#fff" />
            <rect x="30" y="30" width="15" height="15" rx="2" fill="#e1251b" />
            <rect x="140" y="15" width="45" height="45" rx="6" fill="#1c1d18" />
            <rect x="148" y="23" width="29" height="29" rx="3" fill="#fff" />
            <rect x="155" y="30" width="15" height="15" rx="2" fill="#e1251b" />
            <rect x="15" y="140" width="45" height="45" rx="6" fill="#1c1d18" />
            <rect x="23" y="148" width="29" height="29" rx="3" fill="#fff" />
            <rect x="30" y="155" width="15" height="15" rx="2" fill="#e1251b" />
            <g fill="#1c1d18">
              <rect x="70" y="20" width="8" height="8" /><rect x="85" y="20" width="8" height="8" /><rect x="100" y="20" width="8" height="8" /><rect x="115" y="20" width="8" height="8" />
              <rect x="70" y="35" width="8" height="8" /><rect x="95" y="35" width="8" height="8" /><rect x="110" y="35" width="8" height="8" /><rect x="125" y="35" width="8" height="8" />
              <rect x="75" y="50" width="8" height="8" /><rect x="90" y="50" width="8" height="8" /><rect x="120" y="50" width="8" height="8" />
              <rect x="20" y="70" width="8" height="8" /><rect x="35" y="70" width="8" height="8" /><rect x="50" y="70" width="8" height="8" /><rect x="65" y="70" width="8" height="8" /><rect x="130" y="70" width="8" height="8" /><rect x="145" y="70" width="8" height="8" /><rect x="160" y="70" width="8" height="8" /><rect x="175" y="70" width="8" height="8" />
              <rect x="20" y="85" width="8" height="8" /><rect x="40" y="85" width="8" height="8" /><rect x="60" y="85" width="8" height="8" /><rect x="135" y="85" width="8" height="8" /><rect x="155" y="85" width="8" height="8" /><rect x="170" y="85" width="8" height="8" />
              <rect x="25" y="100" width="8" height="8" /><rect x="45" y="100" width="8" height="8" /><rect x="130" y="100" width="8" height="8" /><rect x="150" y="100" width="8" height="8" /><rect x="165" y="100" width="8" height="8" />
              <rect x="20" y="115" width="8" height="8" /><rect x="55" y="115" width="8" height="8" /><rect x="140" y="115" width="8" height="8" /><rect x="160" y="115" width="8" height="8" />
              <rect x="70" y="140" width="8" height="8" /><rect x="85" y="140" width="8" height="8" /><rect x="105" y="140" width="8" height="8" /><rect x="120" y="140" width="8" height="8" />
              <rect x="75" y="155" width="8" height="8" /><rect x="95" y="155" width="8" height="8" /><rect x="115" y="155" width="8" height="8" /><rect x="140" y="155" width="8" height="8" /><rect x="165" y="155" width="8" height="8" />
              <rect x="70" y="170" width="8" height="8" /><rect x="90" y="170" width="8" height="8" /><rect x="110" y="170" width="8" height="8" /><rect x="130" y="170" width="8" height="8" /><rect x="150" y="170" width="8" height="8" /><rect x="170" y="170" width="8" height="8" />
            </g>
            <circle cx="100" cy="100" r="18" fill="#fff" stroke="#e1251b" strokeWidth="2.5" />
            <rect x="91" y="93" width="18" height="14" rx="2" fill="#e1251b" />
            <text x="100" y="103" fill="#fff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">KHQR</text>
          </svg>
        </div>
        <p className="khqr-note">
          ស្កេនទូទាត់ជាមួយ <strong>{method === 'ABA' ? 'ABA Mobile' : method === 'ACLEDA' ? 'ACLEDA Mobile' : 'ABA, ACLEDA ឬ App ធនាគារណាមួយ'}</strong><br />
          <small style={{ color: '#8d8b82' }}>Ref: {orderId || 'LOCALBRAND-KH'}</small>
        </p>
        <div className="khqr-actions">
          <button type="button" className="khqr-btn khqr-btn-primary" onClick={() => setNotice('បានរក្សាទុក QR Code')}>ទាញយក QR / Save</button>
          <button type="button" className="khqr-btn khqr-btn-outline" onClick={() => setNotice(method === 'ACLEDA' ? 'ACLEDA: 012 345 678 (LOCALBRAND CO.)' : 'ABA: 001 888 999 (LOCALBRAND SHOP)')}>ចម្លងលេខគណនី</button>
        </div>
      </div>
    </div>
  );

  const Header = () => (
    <>
      <div className="announcement">🇰🇭 ដឹកជញ្ជូនទូទាំង 25 ខេត្ត/ក្រុង តាម <strong>VET Express</strong> & <strong>J&T Express</strong> · ទូទាត់តាម <strong>KHQR, ABA & ACLEDA</strong> (Free delivery $50+)</div>
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
        <span className="product-price">{money(product.price)} <small className="riel-sub">({toRiel(product.price)})</small> {product.oldPrice && <del>{money(product.oldPrice)}</del>}</span>
      </button>
    </article>
  );

  const ProductGrid = ({ items }) => items.length
    ? <div className="product-grid">{items.map((product) => <div className="product-card-slot" key={product.id}>{ProductCard({ product })}</div>)}</div>
    : <div className="empty-state"><span className="empty-icon">⌕</span><h3>មិនមានទំនិញនៅឡើយទេ</h3><p>សូមសាកល្បងស្វែងរកឈ្មោះផ្សេង ឬពិនិត្យមើលគ្រប់មុខទំនិញរបស់យើង។</p><button className="button button-dark" onClick={() => openShop()}>មើលទំនិញទាំងអស់</button></div>;

  const Footer = () => (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand"><button className="wordmark footer-wordmark" onClick={() => go('home')}>localbrand<span>.</span></button><p>ម៉ូដទាន់សម័យ និងប្រកបដោយគុណភាពសម្រាប់ជីវិតប្រចាំថ្ងៃ។ ដឹកជញ្ជូនទូទាំង 25 ខេត្ត/ក្រុង តាម VET Express & J&T Express។</p><span className="footer-social">Telegram: @localbrand_kh · Facebook</span></div>
        <div className="footer-column"><h4>ទំនិញទាំងអស់</h4><button onClick={() => openShop()}>មើលទាំងអស់</button><button onClick={() => openShop('Bags')}>កាតាប & កាបូប (Bags)</button><button onClick={() => openShop('Clothing')}>សម្លៀកបំពាក់ (Clothing)</button><button onClick={() => openShop('Accessories')}>គ្រឿងតុបតែង (Accessories)</button></div>
        <div className="footer-column"><h4>សេវាកម្ម & ជំនួយ</h4><button onClick={() => go('account')}>គណនីរបស់ខ្ញុំ</button><button onClick={() => { setAccountSection('Order tracking'); go('account'); }}>តាមដានការដឹកជញ្ជូន</button><button onClick={() => setNotice('ទំនាក់ទំនង Telegram: @localbrand_kh ឬ 012 345 678')}>ទំនាក់ទំនង</button><button onClick={() => setNotice('ទូទាត់តាម KHQR, ABA, ACLEDA ឬ COD ពេលទទួលទំនិញ')}>វិធីសាស្ត្រទូទាត់</button></div>
        <div className="footer-newsletter"><h4>ទទួលបានការបញ្ចុះតម្លៃ</h4><p>ទទួលបានដំណឹងទំនិញថ្មីៗ និងការបញ្ចុះតម្លៃ 10% សម្រាប់ការកុម្ម៉ង់ដំបូង។</p><form onSubmit={(event) => { event.preventDefault(); setNotice('អ្នកបានចុះឈ្មោះជោគជ័យ។ អរគុណ!'); }}><input aria-label="Email for newsletter" type="email" required placeholder="អ៊ីមែល ឬលេខទូរស័ព្ទ" /><button aria-label="Subscribe"><Icon name="arrow" /></button></form><small>យើងខ្ញុំគោរពសិទ្ធិឯកជនភាព និងសុវត្ថិភាពទិន្នន័យរបស់អ្នក។</small></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Localbrand Cambodia. All rights reserved.</span><div><button onClick={() => setNotice('VET Express & J&T Express: រយៈពេល 1-2 ថ្ងៃ')}>ការដឹកជញ្ជូន</button><button onClick={() => setNotice('បង់តាម KHQR / ABA / ACLEDA / COD')}>ការទូទាត់</button><button onClick={() => setNotice('អាចប្តូរទំនិញក្នុងរយៈពេល 7 ថ្ងៃ')}>គោលការណ៍ប្តូរ</button></div><span>USD & KHR (៛)&nbsp; · &nbsp;Cambodia 🇰🇭</span></div>
    </footer>
  );

  const SectionHeading = ({ eyebrow, title, text, action, onAction }) => (
    <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="section-description">{text}</p>}</div>{action && <button className="text-link" onClick={onAction}>{action} <Icon name="arrow" size={16} /></button>}</div>
  );

  const HomePage = () => (
    <>
      <main>
        <section className="hero">
          <div className="hero-content"><p className="eyebrow">The good things, made to last · ប្រណីតភាពប្រចាំថ្ងៃ</p><h1>Less, but<br /><em>so much better.</em></h1><p className="hero-copy">ផលិតផលដែលរចនាឡើងយ៉ាងយកចិត្តទុកដាក់សម្រាប់ជីវិតរស់នៅប្រចាំថ្ងៃ។ គុណភាពខ្ពស់ ស្រស់ស្អាត និងធន់យូរអង្វែង។</p><button className="button button-dark" onClick={() => openShop()}>ស្វែងរកទំនិញពេញនិយម <Icon name="arrow" size={16} /></button><div className="hero-note"><span>✳</span> ដឹកជញ្ជូនរហ័សទូទាំង 25 ខេត្ត/ក្រុង តាម VET & J&T Express</div></div>
          <div className="hero-image"><img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=90" alt="A beautifully made everyday leather bag" /><span className="hero-image-caption">A little more considered. A lot more you.</span><span className="hero-image-index">01 — 04</span></div>
          <span className="hero-vertical">THE EVERYDAY EDIT · CAMBODIA 2026</span>
        </section>
        <section className="promise-strip"><div><span>01</span><p>ផលិតផលគុណភាពខ្ពស់ 100%</p></div><div><span>02</span><p>ដឹកតាម VET & J&T Express</p></div><div><span>03</span><p>ស្កេនទូទាត់ KHQR, ABA & ACLEDA</p></div><div><span>04</span><p>ដឹកទូទាំង 25 ខេត្ត/ក្រុង</p></div></section>
        <section className="home-section category-section">{SectionHeading({ eyebrow: 'A place for everything', title: 'ជ្រើសរើសតាមប្រភេទ (Categories)', action: 'មើលទាំងអស់', onAction: () => openShop() })}<div className="category-grid">{[['Bags', 'The right bag changes everything.', 'photo-1584917865442-de89df76afd3'], ['Clothing', 'Your new off-duty favourites.', 'photo-1576566588028-4147f3842f27'], ['Shoes', 'A good day starts from the ground up.', 'photo-1542291026-7eec264c27ff'], ['Accessories', 'It’s the little things.', 'photo-1535632066927-ab7c9ab60908']].map(([name, subtitle, image], index) => <button key={name} className={`category-card category-card-${index + 1}`} onClick={() => openShop(name)}><img src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=85`} alt="" /><span className="category-overlay"><span className="category-kicker">EXPLORE THE EDIT</span><strong>{name}</strong><span className="category-subtitle">{subtitle}</span></span><span className="category-arrow"><Icon name="arrow" /></span></button>)}</div></section>
        <section className="home-section bestsellers-section">{SectionHeading({ eyebrow: 'The ones you keep coming back to', title: 'ទំនិញលក់ដាច់បំផុត (Bestsellers)', text: 'រចនាឡើងយ៉ាងពិសេសសម្រាប់អ្នក ពេញនិយម និងមានការគាំទ្រយ៉ាងច្រើនពីអតិថិជន។', action: 'មើលទំនិញទាំងអស់', onAction: () => openShop() })}{ProductGrid({ items: products.slice(0, 4) })}</section>
        <section className="story-banner"><div className="story-image"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85" alt="Sunlit independent localbrand studio" /></div><div className="story-copy"><p className="eyebrow">A little more thoughtful</p><h2>Buy less.<br /><em>Love longer.</em></h2><p>យើងជឿជាក់ថាទំនិញដែលល្អបំផុត គឺជាទំនិញដែលអ្នកចង់ប្រើរាល់ថ្ងៃ។ ដូច្នេះហើយ ទើបយើងផលិតដោយផ្ចិតផ្ចង់ និងប្រើប្រាស់វត្ថុធាតុដើមមានគុណភាព។</p><button className="text-link" onClick={() => setNotice('ទាក់ទងមកយើងខ្ញុំតាម Telegram: @localbrand_kh')}>ស្វែងយល់បន្ថែម <Icon name="arrow" size={16} /></button><span className="story-mark">A</span></div></section>
        <section className="home-section arrivals-section">{SectionHeading({ eyebrow: 'Just found their way here', title: 'ទំនិញមកដល់ថ្មី (New Arrivals)', action: 'មើលទំនិញថ្មីៗ', onAction: () => { setSort('newest'); openShop(); } })}{ProductGrid({ items: products.filter((product) => product.tag === 'New') })}</section>
        <section className="promo-banner"><div className="promo-text"><p className="eyebrow">A small thank you</p><h2>Something good<br />is in your <em>inbox.</em></h2><p>ទទួលបានការបញ្ចុះតម្លៃ 10% សម្រាប់ការកុម្ម៉ង់ដំបូង ដោយប្រើកូដ WELCOME10។</p><button className="button button-outline" onClick={() => document.querySelector('.footer-newsletter input')?.focus()}>ទទួលការបញ្ចុះតម្លៃ <Icon name="arrow" size={16} /></button></div><div className="promo-decoration"><span>10</span><small>% OFF<br />YOUR FIRST ORDER</small><i>✳</i></div></section>
      </main>
    </>
  );

  const ShopPage = () => (
    <main className="page-container shop-page"><div className="page-intro"><p className="eyebrow">Good things live here · គ្រប់មុខទំនិញ</p><h1>Shop the collection<span>.</span></h1><p>បណ្តុំទំនិញរចនាឡើងយ៉ាងសម្រិតសម្រាំងសម្រាប់ជីវិតប្រចាំថ្ងៃរបស់អ្នក។</p></div><div className="shop-toolbar"><div className="category-filters">{['All', 'Bags', 'Clothing', 'Shoes', 'Accessories', 'Travel'].map((name) => <button key={name} className={category === name ? 'filter-active' : ''} onClick={() => setCategory(name)}>{name}</button>)}</div><div className="sort-control"><span>{filteredProducts.length} មុខទំនិញ</span><select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="newest">ថ្មីបំផុត (Newest)</option><option value="price-low">តម្លៃ៖ ទាបទៅខ្ពស់</option><option value="price-high">តម្លៃ៖ ខ្ពស់ទៅទាប</option></select></div></div>{ProductGrid({ items: filteredProducts })}</main>
  );

  const CartPage = () => (
    <main className="page-container checkout-page">
      <p className="eyebrow">Your good things · កន្ត្រកទំនិញ</p>
      <h1>Your bag<span>.</span></h1>
      {!cart.length ? (
        <div className="empty-state">
          <span className="empty-icon"><Icon name="bag" size={30} /></span>
          <h3>កន្ត្រកទំនិញរបស់អ្នកនៅទទេ</h3>
          <p>មិនទាន់មានទំនិញក្នុងកន្ត្រកនៅឡើយទេ។ ជ្រើសរើសទំនិញដែលអ្នកពេញចិត្តឥឡូវនេះ។</p>
          <button className="button button-dark" onClick={() => openShop()}>មើលទំនិញទាំងអស់ <Icon name="arrow" size={16} /></button>
        </div>
      ) : (
        <div className="checkout-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <button className="cart-image" onClick={() => setSelectedProduct(item)}>
                  <img src={item.image} alt={item.name} />
                </button>
                <div className="cart-item-copy">
                  <p className="product-category">{item.category} · {item.color}</p>
                  <h3>{item.name}</h3>
                  <p>{money(item.price)} <small className="riel-sub">({toRiel(item.price)})</small></p>
                  <div className="quantity-control">
                    <button aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, -1)}><Icon name="minus" size={14} /></button>
                    <span>{item.quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => updateQuantity(item.id, 1)}><Icon name="plus" size={14} /></button>
                  </div>
                </div>
                <button className="remove-item" onClick={() => setCart((current) => current.filter((product) => product.id !== item.id))}>លុប</button>
              </article>
            ))}
          </div>
          <aside className="order-summary">
            <h2>សង្ខេបការកុម្ម៉ង់ (Order Summary)</h2>
            <div className="coupon-field">
              <form onSubmit={applyCoupon}>
                <input placeholder="កូដបញ្ចុះតម្លៃ (Discount code)" aria-label="Discount code" value={coupon} onChange={(event) => setCoupon(event.target.value)} />
                <button>Apply</button>
              </form>
              <small>ប្រើ WELCOME10 ដើម្បីទទួលបានការបញ្ចុះតម្លៃ 10%។</small>
            </div>
            {couponApplied && <p className="discount-note">បញ្ចុះតម្លៃ (Discount 10%) <span>−{money(discount)} ({toRiel(discount)})</span></p>}
            <div className="summary-row">
              <span>តម្លៃទំនិញសរុប (Subtotal)</span>
              <span>{money(subtotal)} <small className="riel-sub">({toRiel(subtotal)})</small></span>
            </div>
            <div className="summary-row">
              <span>សេវាដឹក (Shipping)</span>
              <span>{(subtotal - discount) >= 50 ? 'Free (លើស $50)' : 'VET / J&T Express ($1.50 - $2.50)'}</span>
            </div>
            <div className="summary-total">
              <span>ទឹកប្រាក់សរុប (Total)</span>
              <div>
                <strong>{money(subtotal - discount)}</strong>
                <div style={{ fontSize: '12px', color: '#7a786f', fontWeight: '500', marginTop: '2px' }}>
                  ≈ {toRiel(subtotal - discount)}
                </div>
              </div>
            </div>
            <button className="button button-dark full-button" onClick={startCheckout}>
              បន្តទៅទូទាត់ប្រាក់ (Checkout) <Icon name="arrow" size={16} />
            </button>
            <div className="secure-note" style={{ textAlign: 'left', lineHeight: '1.6', marginTop: '16px' }}>
              🚚 ដឹកជញ្ជូនរហ័ស 25 ខេត្ត/ក្រុង តាម <strong>VET Express</strong> & <strong>J&T Express</strong><br />
              💳 ទូទាត់តាម <strong>KHQR, ABA & ACLEDA</strong> ឬ <strong>បង់ប្រាក់ពេលទទួល (COD)</strong>
            </div>
          </aside>
        </div>
      )}
    </main>
  );

  const CheckoutPage = () => (
    <main className="page-container checkout-page">
      <p className="eyebrow">Almost yours · រៀបចំរួចរាល់</p>
      <h1>Checkout<span>.</span></h1>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          {/* SECTION 01: Shipping Address */}
          <div className="checkout-form-section">
            <p className="eyebrow">01 — ព័ត៌មានដឹកជញ្ជូន / Shipping Details</p>
            <h2>អាសយដ្ឋានអ្នកទទួលទំនិញ</h2>
            <div className="form-grid">
              <label>
                ឈ្មោះអ្នកទទួល (Full Name) *
                <input required autoComplete="name" placeholder="ឧ. ចាន់ សុខា" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
              </label>
              <label>
                លេខទូរស័ព្ទ / Telegram *
                <input required type="tel" autoComplete="tel" placeholder="ឧ. 012 345 678" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
              </label>
              <label className="form-span">
                រាជធានី / ខេត្ត (Province / City) *
                <select required value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
                  {cambodiaProvinces.map((prov) => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </label>
              <label>
                ខណ្ឌ / ស្រុក / សង្កាត់ (District / Khan) *
                <input required placeholder="ឧ. ខណ្ឌទួលគោក / សង្កាត់បឹងកក់២" value={customerDistrict} onChange={(e) => setCustomerDistrict(e.target.value)} />
              </label>
              <label>
                ផ្ទះលេខ ផ្លូវ ឬទីតាំងសម្គាល់ (Street / Landmark) *
                <input required placeholder="ឧ. ផ្ទះលេខ 12 ផ្លូវ 289 ក្បែរផ្សារ" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
              </label>
              <label className="form-span">
                ចំណាំដឹកជញ្ជូន (Delivery Note - Optional)
                <input placeholder="ឧ. ហៅទូរស័ព្ទមុនមកដល់ ឬផ្ញើទុកនៅសាខា VET Express" value={customerNote} onChange={(e) => setCustomerNote(e.target.value)} />
              </label>
            </div>
          </div>

          {/* SECTION 02: Delivery Partner */}
          <div className="checkout-form-section">
            <p className="eyebrow">02 — សេវាដឹកជញ្ជូន / Delivery Partner</p>
            <h2>ជ្រើសរើសសេវាដឹកជញ្ជូន (VET Express & J&T Express)</h2>
            <label className={`method-card ${shippingCarrier === 'VET' ? 'is-selected' : ''}`}>
              <input type="radio" name="shippingCarrier" checked={shippingCarrier === 'VET'} onChange={() => setShippingCarrier('VET')} />
              <div className="method-info">
                <div className="method-title-row">
                  <span className="badge-carrier badge-vet">VET Express</span>
                  <strong>VET Express (វីរៈប៊ុនថាំ)</strong>
                </div>
                <small>ដឹកជញ្ជូនរហ័សទូទាំង 25 ខេត្ត/ក្រុង និងមានសាខាទទួលទូទាំងប្រទេស (1 - 2 ថ្ងៃ)</small>
              </div>
              <span className="method-price">{shippingFee === 0 && shippingCarrier === 'VET' ? 'Free' : (isPhnomPenh ? '$1.50' : '$2.00')}</span>
            </label>
            <label className={`method-card ${shippingCarrier === 'JND' ? 'is-selected' : ''}`}>
              <input type="radio" name="shippingCarrier" checked={shippingCarrier === 'JND'} onChange={() => setShippingCarrier('JND')} />
              <div className="method-info">
                <div className="method-title-row">
                  <span className="badge-carrier badge-jnt">J&T Express</span>
                  <strong>J&T Express (JND Express)</strong>
                </div>
                <small>សេវាដឹកជញ្ជូនផ្ទាល់ដល់មាត់ទ្វារផ្ទះ ឬកន្លែងធ្វើការ (Door-to-door Delivery 1 - 2 ថ្ងៃ)</small>
              </div>
              <span className="method-price">{shippingFee === 0 && shippingCarrier === 'JND' ? 'Free' : (isPhnomPenh ? '$1.75' : '$2.50')}</span>
            </label>
          </div>

          {/* SECTION 03: Payment Method */}
          <div className="checkout-form-section">
            <p className="eyebrow">03 — វិធីសាស្ត្រទូទាត់ / Payment Method</p>
            <h2>ជ្រើសរើសការបង់ប្រាក់ (ABA, ACLEDA, KHQR, COD)</h2>
            <label className={`method-card ${paymentMethod === 'KHQR' ? 'is-selected' : ''}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'KHQR'} onChange={() => setPaymentMethod('KHQR')} />
              <div className="method-info">
                <div className="method-title-row">
                  <span className="badge-carrier badge-khqr">KHQR</span>
                  <strong>KHQR (Bakong) — ស្កេនទូទាត់គ្រប់ធនាគារ</strong>
                </div>
                <small>ស្កេនទូទាត់ងាយស្រួលជាមួយ ABA, ACLEDA, Sathapana, Wing, Canadia, TrueMoney...</small>
              </div>
            </label>
            <label className={`method-card ${paymentMethod === 'ABA' ? 'is-selected' : ''}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'ABA'} onChange={() => setPaymentMethod('ABA')} />
              <div className="method-info">
                <div className="method-title-row">
                  <span className="badge-carrier badge-aba">ABA Mobile</span>
                  <strong>ABA Mobile (ABA PayWay / KHQR)</strong>
                </div>
                <small>ទូទាត់ផ្ទាល់តាម ABA Mobile App (គណនី: 001 888 999 - LOCALBRAND SHOP)</small>
              </div>
            </label>
            <label className={`method-card ${paymentMethod === 'ACLEDA' ? 'is-selected' : ''}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'ACLEDA'} onChange={() => setPaymentMethod('ACLEDA')} />
              <div className="method-info">
                <div className="method-title-row">
                  <span className="badge-carrier badge-acleda">ACLEDA</span>
                  <strong>ACLEDA Mobile (ACLEDA QR)</strong>
                </div>
                <small>ទូទាត់តាម ACLEDA Mobile App (គណនី: 012 345 678 - LOCALBRAND CO., LTD)</small>
              </div>
            </label>
            <label className={`method-card ${paymentMethod === 'COD' ? 'is-selected' : ''}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
              <div className="method-info">
                <div className="method-title-row">
                  <span className="badge-carrier badge-cod">COD</span>
                  <strong>Cash on Delivery (បង់ប្រាក់ពេលទទួលទំនិញ)</strong>
                </div>
                <small>ទូទាត់ប្រាក់សុទ្ធជូនអ្នកដឹកជញ្ជូន {shippingCarrier === 'VET' ? 'VET Express' : 'J&T Express'} ពេលទំនិញមកដល់ដៃ</small>
              </div>
            </label>

            {paymentMethod !== 'COD' && (
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '12.5px', color: '#68675f', margin: '8px 0 12px' }}>
                  ✳ ក្រោយចុចបញ្ជាទិញ លោកអ្នកអាចស្កេន QR Code ខាងក្រោម ឬលើផ្ទាំងបញ្ជាក់ការបញ្ជាទិញ៖
                </p>
                {KhqrCard({ amount: grandTotal, orderId: 'ORDER-PENDING', method: paymentMethod })}
              </div>
            )}
          </div>

          <button className="button button-dark full-button" type="submit">
            បញ្ជាទិញឥឡូវនេះ (Confirm Order) · {money(grandTotal)} <Icon name="arrow" size={16} />
          </button>
        </form>

        <aside className="order-summary">
          <h2>ទំនិញក្នុងកន្ត្រក ({cartCount})</h2>
          {cart.map((item) => (
            <div className="summary-product" key={item.id}>
              <img src={item.image} alt="" />
              <div>
                <strong>{item.name}</strong>
                <small>Qty {item.quantity} · {item.color}</small>
              </div>
              <span>{money(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>តម្លៃទំនិញ (Subtotal)</span>
            <span>{money(subtotal)}</span>
          </div>
          {couponApplied && (
            <div className="summary-row discount-note">
              <span>បញ្ចុះតម្លៃ (Discount 10%)</span>
              <span>−{money(discount)}</span>
            </div>
          )}
          <div className="summary-row">
            <span>សេវាដឹក ({shippingCarrier === 'VET' ? 'VET Express' : 'J&T Express'})</span>
            <span>{shippingFee === 0 ? 'Free' : money(shippingFee)}</span>
          </div>
          <div className="summary-total">
            <span>ទឹកប្រាក់សរុប (Total)</span>
            <div>
              <strong>{money(grandTotal)}</strong>
              <div style={{ fontSize: '12px', color: '#7a786f', fontWeight: '500', marginTop: '2px' }}>
                ≈ {toRiel(grandTotal)}
              </div>
            </div>
          </div>
          <div className="secure-note" style={{ textAlign: 'left', lineHeight: '1.6', marginTop: '18px' }}>
            🚚 <strong>សេវាដឹកជញ្ជូន៖</strong> {shippingCarrier === 'VET' ? 'VET Express (វីរៈប៊ុនថាំ)' : 'J&T Express (JND)'}<br />
            💳 <strong>វិធីសាស្ត្រទូទាត់៖</strong> {paymentMethod === 'KHQR' ? 'KHQR (Bakong)' : paymentMethod === 'ABA' ? 'ABA Mobile' : paymentMethod === 'ACLEDA' ? 'ACLEDA Mobile' : 'Cash on Delivery (COD)'}<br />
            📍 <strong>ខេត្ត/ក្រុង៖</strong> {selectedProvince.split(' ')[0]}
          </div>
        </aside>
      </div>
    </main>
  );

  const WishlistPage = () => <main className="page-container shop-page"><p className="eyebrow">A little list of lovely things · បញ្ជីចង់បាន</p><h1>Your wishlist<span>.</span></h1>{wishlist.length ? ProductGrid({ items: products.filter((product) => wishlist.includes(product.id)) }) : <div className="empty-state"><span className="empty-icon"><Icon name="heart" size={30} /></span><h3>មិនទាន់មានទំនិញក្នុងបញ្ជីចង់បាន</h3><p>ចុចលើរូបបេះដូងលើទំនិញណាមួយដើម្បីរក្សាទុកសម្រាប់ថ្ងៃក្រោយ។</p><button className="button button-dark" onClick={() => openShop()}>មើលទំនិញទាំងអស់ <Icon name="arrow" size={16} /></button></div>}</main>;

  const AccountPage = () => {
    const accountTabs = ['Profile', 'My orders', 'Order tracking', 'Addresses', 'Change password', 'Wishlist'];
    return <main className="page-container account-page"><p className="eyebrow">Your little corner · គណនី</p><h1>My account<span>.</span></h1><div className="account-layout"><nav className="account-nav">{accountTabs.map((tab) => <button className={accountSection === tab ? 'account-tab-active' : ''} key={tab} onClick={() => tab === 'Wishlist' ? go('wishlist') : setAccountSection(tab)}>{tab}<span>→</span></button>)}{signedInEmail && <button onClick={logout}>ចាកចេញ (Log out) <span>→</span></button>}</nav><section className="account-content">{accountSection === 'Profile' && <><p className="eyebrow">{signedInEmail ? 'You are signed in' : 'Welcome to your account'}</p><h2>{signedInEmail ? 'សួស្តី!' : 'សួស្តី!'}</h2>{signedInEmail ? <><p>បានចូលប្រើប្រាស់ជា <strong>{signedInEmail}</strong>។</p><button className="button button-light" onClick={logout}>Log out</button></> : <><p>ចូលប្រើ ឬបង្កើតគណនីថ្មីដើម្បីរក្សាទុកប្រវត្តិទិញទំនិញ និងអាសយដ្ឋានដឹកជញ្ជូន។</p><div className="account-actions"><button className="button button-dark" onClick={() => { setAuthMode('Login'); go('auth'); }}>Sign in <Icon name="arrow" size={16} /></button><button className="button button-light" onClick={() => { setAuthMode('Register'); go('auth'); }}>Create account</button></div></>}</>}{accountSection === 'My orders' && <><p className="eyebrow">Your order history</p><h2>ការកុម្ម៉ង់របស់ខ្ញុំ</h2><div className="account-empty"><span>✳</span><p>{lastOrder ? `ការកុម្ម៉ង់ចុងក្រោយ៖ #${lastOrder.orderNumber} ដឹកតាម ${lastOrder.shippingCarrier === 'VET' ? 'VET Express' : 'J&T Express'}` : 'ប្រវត្តិនៃការកុម្ម៉ង់ទំនិញនឹងបង្ហាញនៅទីនេះ។'}</p><button className="text-link" onClick={() => go('cart')}>ទៅកាន់កន្ត្រកទំនិញ <Icon name="arrow" size={16} /></button></div></>}{accountSection === 'Order tracking' && <><p className="eyebrow">On its way to you</p><h2>តាមដានការដឹកជញ្ជូន (VET & J&T Express)</h2><form onSubmit={(event) => { event.preventDefault(); setNotice(orderNumber ? `ទំនិញ #${orderNumber} កំពុងដំណើរការដឹកជញ្ជូន!` : 'សូមបញ្ចូលលេខកូដកុម្ម៉ង់។'); }} className="tracking-form"><label>លេខកូដកុម្ម៉ង់ (Order Number)<input required placeholder="ឧ. VET-KH123456 ឬ JT-KH123456" value={orderNumber} onChange={(event) => setOrderNumber(event.target.value)} /></label><button className="button button-dark">ស្វែងរកការដឹកជញ្ជូន <Icon name="arrow" size={16} /></button></form></>}{accountSection === 'Addresses' && <><p className="eyebrow">Ready when you are</p><h2>អាសយដ្ឋានដឹកជញ្ជូន</h2><p>{customerAddress ? `${customerAddress}, ${customerDistrict}, ${selectedProvince}` : 'លោកអ្នកអាចបញ្ចូលអាសយដ្ឋាននៅពេលទូទាត់ប្រាក់ (Checkout)។'}</p></>}{accountSection === 'Change password' && <><p className="eyebrow">Housekeeping</p><h2>ប្តូរពាក្យសម្ងាត់</h2><button className="button button-dark" onClick={() => { setAuthMode('Forgot password'); go('auth'); }}>ផ្ញើតំណភ្ជាប់ប្តូរពាក្យសម្ងាត់ <Icon name="arrow" size={16} /></button></>}</section></div></main>;
  };

  const AuthPage = () => <main className="auth-page"><div className="auth-card"><p className="eyebrow">Welcome to localbrand Cambodia</p><h1>{authMode}<span>.</span></h1><p>{authMode === 'Login' ? 'រីករាយដែលបានជួបលោកអ្នកម្តងទៀត។' : authMode === 'Register' ? 'បង្កើតគណនីថ្មីសម្រាប់ការទិញទំនិញ។' : 'យើងនឹងផ្ញើតំណភ្ជាប់ជួយលោកអ្នក។'}</p><form onSubmit={handleAuthSubmit}><label>អ៊ីមែល (Email address)<input name="email" required type="email" autoComplete="email" placeholder="you@example.com" /></label>{authMode !== 'Forgot password' && <label>ពាក្យសម្ងាត់ (Password)<input name="password" required type="password" minLength="8" autoComplete={authMode === 'Register' ? 'new-password' : 'current-password'} placeholder="យ៉ាងហោចណាស់ 8 តួអក្សរ" /></label>}{authMode === 'Register' && <label>បញ្ជាក់ពាក្យសម្ងាត់<input name="confirmPassword" required type="password" minLength="8" autoComplete="new-password" placeholder="បញ្ចូលពាក្យសម្ងាត់ម្តងទៀត" /></label>}<button className="button button-dark full-button">{authMode === 'Login' ? 'ចូលប្រើប្រាស់ (Sign in)' : authMode === 'Register' ? 'បង្កើតគណនី (Register)' : 'Send reset link'} <Icon name="arrow" size={16} /></button></form><div className="auth-switch">{authMode === 'Login' ? <><button onClick={() => setAuthMode('Forgot password')}>ភ្លេចពាក្យសម្ងាត់?</button><span>មិនទាន់មានគណនី? <button onClick={() => setAuthMode('Register')}>បង្កើតគណនី</button></span></> : <span>មានគណនីរួចហើយ? <button onClick={() => setAuthMode('Login')}>ចូលប្រើប្រាស់</button></span>}</div><p className="auth-storage-note">Demo account is stored in this browser only. Use a non-sensitive password.</p></div></main>;

  const ConfirmationPage = () => (
    <main className="confirmation-page">
      <div className="confirmation-mark"><Icon name="check" size={32} /></div>
      <p className="eyebrow">កុម្ម៉ង់បានជោគជ័យ · Order Confirmed</p>
      <h1>អរគុណសម្រាប់ការកុម្ម៉ង់<span>!</span></h1>
      <p className="confirmation-copy">
        យើងខ្ញុំបានទទួលការកុម្ម៉ង់របស់អ្នករួចរាល់ហើយ និងកំពុងរៀបចំវេចខ្ចប់ផ្ញើជូនតាម {lastOrder?.shippingCarrier === 'VET' ? 'VET Express (វីរៈប៊ុនថាំ)' : 'J&T Express (JND)'}។
      </p>

      <div className="confirmation-number">
        <span>លេខកូដកុម្ម៉ង់ / ORDER NUMBER</span>
        <strong>{lastOrder?.orderNumber || orderNumber}</strong>
      </div>

      <div className="order-details-card">
        <div className="order-details-row">
          <span>សេវាដឹកជញ្ជូន (Carrier)</span>
          <span>{lastOrder?.shippingCarrier === 'VET' ? 'VET Express (វីរៈប៊ុនថាំ)' : 'J&T Express (JND)'}</span>
        </div>
        <div className="order-details-row">
          <span>វិធីសាស្ត្រទូទាត់ (Payment)</span>
          <span>{lastOrder?.paymentMethod === 'KHQR' ? 'KHQR (Bakong)' : lastOrder?.paymentMethod === 'ABA' ? 'ABA Mobile' : lastOrder?.paymentMethod === 'ACLEDA' ? 'ACLEDA Mobile' : 'Cash on Delivery (COD)'}</span>
        </div>
        <div className="order-details-row">
          <span>អ្នកទទួលទំនិញ (Recipient)</span>
          <span>{lastOrder?.customerName} ({lastOrder?.customerPhone})</span>
        </div>
        <div className="order-details-row">
          <span>ទីតាំងដឹកជញ្ជូន (Destination)</span>
          <span>{lastOrder?.customerAddress}, {lastOrder?.customerDistrict}, {lastOrder?.selectedProvince}</span>
        </div>
        <div className="order-details-row">
          <span>ទឹកប្រាក់សរុប (Grand Total)</span>
          <span style={{ color: 'var(--olive-dark)', fontSize: '15px' }}>{money(lastOrder?.total || 0)} ({toRiel(lastOrder?.total || 0)})</span>
        </div>
      </div>

      {lastOrder?.paymentMethod !== 'COD' ? (
        <div style={{ maxWidth: '340px', width: '100%', margin: '10px auto' }}>
          <p style={{ fontSize: '13px', color: '#5b5952', marginBottom: '8px' }}>
            📱 សូមស្កេន KHQR ខាងក្រោមដើម្បីបញ្ចប់ការទូទាត់៖
          </p>
          {KhqrCard({ amount: lastOrder?.total || 0, orderId: lastOrder?.orderNumber, method: lastOrder?.paymentMethod })}
          <a href="https://t.me/localbrand_kh" target="_blank" rel="noreferrer" className="telegram-cta">
            ✈️ ផ្ញើស្លីបតាម Telegram (@localbrand_kh)
          </a>
        </div>
      ) : (
        <div className="secure-note" style={{ fontSize: '13.5px', marginTop: '16px', color: '#2d7a48' }}>
          💵 <strong>សេវាបង់ប្រាក់ពេលទទួល (COD):</strong> សូមត្រៀមប្រាក់សុទ្ធ {money(lastOrder?.total || 0)} ({toRiel(lastOrder?.total || 0)}) ជូនបុគ្គលិកដឹកជញ្ជូន {lastOrder?.shippingCarrier === 'VET' ? 'VET Express' : 'J&T Express'} ពេលទំនិញមកដល់។
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
        <button className="button button-dark" onClick={() => go('account')}>មើលការកុម្ម៉ង់ (My Orders)</button>
        <button className="text-link confirmation-continue" onClick={() => openShop()}>ទិញទំនិញបន្ត <Icon name="arrow" size={16} /></button>
      </div>
    </main>
  );

  const AdminLoginPage = () => <main className="admin-login-page"><form className="admin-login-card" onSubmit={(event) => { event.preventDefault(); setAdminAuthenticated(true); go('admin'); }}><button type="button" className="admin-login-brand" onClick={() => go('home')}>localbrand<span>.</span></button><p className="eyebrow">STUDIO ADMIN · CAMBODIA</p><h1>Welcome back<span>.</span></h1><p className="admin-login-copy">Sign in to take a look around your store.</p><label>Email address<input required type="email" placeholder="admin@localbrand.com.kh" /></label><label>Password<input required type="password" minLength="8" placeholder="Your password" /></label><button className="button button-dark full-button">Sign in to your store <Icon name="arrow" size={16} /></button><small>Preview access only — connect secure authentication before launch.</small></form></main>;

  const AdminPage = () => {
    const data = {
      Products: { description: 'A thoughtful edit, from our studio to the world.', columns: ['Product', 'Category', 'Price', 'Stock', 'Status'], rows: products.map((p) => [p.name, p.category, money(p.price), p.stock, p.tag]) },
      Categories: { description: 'The little collections that make up our world.', columns: ['Category', 'Products', 'Visibility'], rows: [['Bags', 3, 'Published'], ['Clothing', 1, 'Published'], ['Shoes', 2, 'Published'], ['Accessories', 2, 'Published'], ['Travel', 1, 'Published']] },
      Orders: { description: 'បញ្ជីកុម្ម៉ង់ទំនិញដែលកំពុងរៀបចំ និងដឹកជញ្ជូនតាម VET & J&T Express។', columns: ['Order', 'Customer', 'Carrier', 'Payment', 'Total', 'Status'], rows: [['#VET-KH10481', 'ចាន់ សុខា (Phnom Penh)', 'VET Express', 'ABA KHQR', '$273.00', 'Processing'], ['#JT-KH10480', 'រិន សុភា (Siem Reap)', 'J&T Express', 'ACLEDA', '$145.00', 'Confirmed'], ['#VET-KH10479', 'កែវ វឌ្ឍនៈ (Battambang)', 'VET Express', 'KHQR', '$98.00', 'Shipped'], ['#JT-KH10478', 'ជា បុប្ផា (Kampot)', 'J&T Express', 'COD', '$326.00', 'Delivered']] },
      Customers: { description: 'អតិថិជនដែលបានបញ្ជាទិញទំនិញ។', columns: ['Customer', 'Phone/Telegram', 'Location', 'Spent'], rows: [['ចាន់ សុខា', '012 888 999', 'Phnom Penh', '$482.00'], ['រិន សុភា', '098 777 666', 'Siem Reap', '$145.00'], ['កែវ វឌ្ឍនៈ', '088 555 444', 'Battambang', '$226.00'], ['ជា បុប្ផា', '070 333 222', 'Kampot', '$814.00']] },
      Payments: { description: 'ប្រព័ន្ធទូទាត់ប្រាក់ KHQR, ABA, ACLEDA និង COD។', columns: ['Payment Ref', 'Method', 'Date', 'Amount', 'Status'], rows: [['PAY-KH2091', 'ABA KHQR', 'Today', '$273.00', 'Paid'], ['PAY-KH2090', 'ACLEDA Mobile', 'Today', '$145.00', 'Paid'], ['PAY-KH2089', 'Bakong KHQR', 'Yesterday', '$98.00', 'Paid'], ['PAY-KH2088', 'Cash on Delivery', 'Oct 01', '$326.00', 'Paid']] },
      Reviews: { description: 'មតិកែលម្អពីអតិថិជន។', columns: ['Customer', 'Product', 'Rating', 'Date', 'Status'], rows: [['សុខា ភ្នំពេញ', 'The Everyday Tote', '★★★★★', 'Today', 'Published'], ['វិសាល សៀមរាប', 'Everyday Mini Crossbody', '★★★★☆', 'Yesterday', 'Pending'], ['វណ្ណដា បាត់ដំបង', 'Classic Court Sneaker', '★★★★★', 'Sep 29', 'Published']] },
      Promotions: { description: "Small ways to make someone's day.", columns: ['Code', 'Offer', 'Usage', 'Expires', 'Status'], rows: [['WELCOME10', '10% off first order', '126 uses', 'No expiry', 'Active'], ['AUTUMN15', '15% off selected pieces', '48 uses', 'Oct 31, 2026', 'Active']] },
      CMS: { description: 'Words, images, and little details around the shop.', columns: ['Page', 'Last updated', 'Visibility'], rows: [['Home banner', 'Oct 04, 2026', 'Published'], ['About us', 'Sep 28, 2026', 'Published'], ['Terms & conditions', 'Sep 14, 2026', 'Published'], ['Privacy policy', 'Sep 14, 2026', 'Published'], ['Contact us', 'Aug 30, 2026', 'Published']] },
      Reports: { description: 'The bigger picture, at a glance.', columns: ['Report', 'Period', 'Result', 'Change'], rows: [['Sales report', 'Last 30 days', '$24,580.00 (៛100,778,000)', '+12.8%'], ['Order report', 'Last 30 days', '186 orders', '+8.2%'], ['VET vs J&T', 'Delivery split', '62% VET · 38% J&T', 'Balanced'], ['Payment ratio', 'KHQR vs COD', '74% KHQR/ABA · 26% COD', '+6.2%']] },
      Settings: { description: 'ការកំណត់ទូទៅសម្រាប់ហាងក្នុងប្រទេសកម្ពុជា។', columns: ['Setting', 'Current value', 'Status'], rows: [['Store settings', 'Localbrand Cambodia (USD & KHR)', 'Configured'], ['Admin profile', 'hello@localbrand.com.kh', 'Active'], ['Payment methods', 'KHQR (Bakong) · ABA · ACLEDA · COD', 'Configured'], ['Delivery partners', 'VET Express & J&T Express (25 Provinces)', 'Configured'], ['Free shipping', 'Free over $50 (25 Provinces)', 'Configured']] },
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