import { useEffect, useMemo, useState } from 'react';
import './App.css';

const products = [
  { id: 1, name: 'The Everyday Tote', nameKm: 'កាតាបស្បែក The Everyday Tote', category: 'Bags', categoryKm: 'កាតាប & កាបូប', price: 128, oldPrice: 160, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85', tag: 'Bestseller', tagKm: 'លក់ដាច់បំផុត', color: 'Cognac', colorKm: 'ពណ៌ត្នោត', stock: 18, description: 'A quietly confident carryall, thoughtfully made from supple, responsibly sourced leather.', descriptionKm: 'កាតាបស្បែកប្រណីតរចនាឡើងយ៉ាងផ្ចិតផ្ចង់ សាកសមឥតខ្ចោះសម្រាប់ការប្រើប្រាស់ប្រចាំថ្ងៃ។' },
  { id: 2, name: 'Sculpted Leather Loafer', nameKm: 'ស្បែកជើងស្បែក Sculpted Loafer', category: 'Shoes', categoryKm: 'ស្បែកជើង', price: 145, image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=900&q=85', tag: 'New', tagKm: 'ថ្មី', color: 'Espresso', colorKm: 'ពណ៌កាហ្វេ', stock: 12, description: 'A modern classic with a softly structured shape and considered details.', descriptionKm: 'ស្បែកជើងស្បែកទាន់សម័យ ស្រាលស្រទន់ ផាសុកភាពខ្ពស់ និងរចនាយ៉ាងប្រណីត។' },
  { id: 3, name: 'The Weekender', nameKm: 'កាបូបធ្វើដំណើរ The Weekender', category: 'Travel', categoryKm: 'ធ្វើដំណើរ', price: 215, oldPrice: 260, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85', tag: 'Limited', tagKm: 'ចំនួនកំណត់', color: 'Olive', colorKm: 'ពណ៌បៃតងអូលីវ', stock: 7, description: 'Room for the long way round. Our durable weekender makes every departure feel considered.', descriptionKm: 'កាបូបធ្វើដំណើរធន់រឹងមាំ ផ្ទុកសម្ភារបានច្រើន សាកសមសម្រាប់ការដើរកម្សាន្តចុងសប្តាហ៍។' },
  { id: 4, name: 'Everyday Mini Crossbody', nameKm: 'កាបូបស្ពាយតូច Everyday Mini', category: 'Bags', categoryKm: 'កាតាប & កាបូប', price: 98, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85', tag: 'New', tagKm: 'ថ្មី', color: 'Sand', colorKm: 'ពណ៌ខ្សាច់', stock: 24, description: 'Your most reached-for essentials, beautifully in hand.', descriptionKm: 'កាបូបស្ពាយចំហៀងខ្នាតតូច ស្អាតប្លែកភ្នែក ងាយស្រួលដាក់ទូរស័ព្ទ និងសម្ភារចាំបាច់។' },
  { id: 5, name: 'Soft Knit Cardigan', nameKm: 'អាវរងាកាតឌីហ្គែន Soft Knit', category: 'Clothing', categoryKm: 'សម្លៀកបំពាក់', price: 168, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85', tag: 'Bestseller', tagKm: 'លក់ដាច់បំផុត', color: 'Oat', colorKm: 'ពណ៌ស្រូវសាឡី', stock: 15, description: 'A feather-soft layer to wear on repeat, knit from a breathable cotton blend.', descriptionKm: 'អាវរងាចាក់សាច់ទន់រលោង ខ្យល់ចេញចូលស្រួល ពាក់បានគ្រប់រដូវកាល។' },
  { id: 6, name: 'Classic Court Sneaker', nameKm: 'ស្បែកជើងប៉ាត់តា Classic Sneaker', category: 'Shoes', categoryKm: 'ស្បែកជើង', price: 110, oldPrice: 138, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', tag: 'Sale', tagKm: 'បញ្ចុះតម្លៃ', color: 'Chalk / Rose', colorKm: 'ស / ផ្កាឈូក', stock: 9, description: 'An effortless everyday sneaker with a cushioned insole and a considered profile.', descriptionKm: 'ស្បែកជើងប៉ាត់តាបែបស្ព័រ ស្រាលស្រួលពាក់ ជួយការពារជើង និងទាន់សម័យ។' },
  { id: 7, name: 'Everyday Gold Hoops', nameKm: 'ក្រវិលកងមាស Everyday Gold', category: 'Accessories', categoryKm: 'គ្រឿងតុបតែង', price: 58, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85', tag: 'Bestseller', tagKm: 'លក់ដាច់បំផុត', color: 'Gold', colorKm: 'ពណ៌ទឹកមាស', stock: 30, description: 'The finishing touch you will never want to take off.', descriptionKm: 'ក្រវិលកងមាសម៉ូដសាមញ្ញតែប្រណីត បង្កើនភាពលេចធ្លោដល់ការតុបតែងខ្លួន។' },
  { id: 8, name: 'Soft Structure Shoulder Bag', nameKm: 'កាបូបស្ពាយស្មា Soft Structure', category: 'Bags', categoryKm: 'កាតាប & កាបូប', price: 178, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85', tag: 'New', tagKm: 'ថ្មី', color: 'Black', colorKm: 'ពណ៌ខ្មៅ', stock: 11, description: 'Clean lines meet everyday ease in a soft, structured silhouette.', descriptionKm: 'កាបូបស្ពាយស្មាស្បែកពណ៌ខ្មៅរលើបរលោង រាងស្អាត សាកសមទាំងធ្វើការនិងដើរលេង។' },
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

const translations = {
  km: {
    announcement: 'ដឹកជញ្ជូនទូទាំង 25 ខេត្ត/ក្រុង តាម VET & J&T Express · ទូទាត់តាម KHQR, ABA & ACLEDA (Free $50+)',
    home: 'ទំព័រដើម',
    shop: 'ទំនិញ',
    clothing: 'សម្លៀកបំពាក់',
    bags: 'កាតាប & កាបូប',
    accessories: 'គ្រឿងតុបតែង',
    travel: 'ធ្វើដំណើរ',
    all: 'ទាំងអស់',
    searchPlaceholder: 'ស្វែងរកទំនិញ...',
    myAccount: 'គណនីរបស់ខ្ញុំ',
    wishlist: 'បញ្ជីចង់បាន',
    bag: 'កន្ត្រកទំនិញ',
    heroEyebrow: 'The good things, made to last · ប្រណីតភាពប្រចាំថ្ងៃ',
    heroTitle1: 'Less, but',
    heroTitle2: 'so much better.',
    heroCopy: 'ផលិតផលដែលរចនាឡើងយ៉ាងយកចិត្តទុកដាក់សម្រាប់ជីវិតរស់នៅប្រចាំថ្ងៃ។ គុណភាពខ្ពស់ ស្រស់ស្អាត និងធន់យូរអង្វែង។',
    heroCta: 'ស្វែងរកទំនិញពេញនិយម',
    heroNote: 'ដឹកជញ្ជូនរហ័សទូទាំង 25 ខេត្ត/ក្រុង តាម VET & J&T Express',
    heroCaption: 'គុណភាពប្រណីត រចនាសម្រាប់អ្នក',
    p1: 'ផលិតផលគុណភាពខ្ពស់ 100%',
    p2: 'ដឹកតាម VET & J&T Express',
    p3: 'ស្កេនទូទាត់ KHQR, ABA & ACLEDA',
    p4: 'ដឹកទូទាំង 25 ខេត្ត/ក្រុង',
    catEyebrow: 'A place for everything',
    catTitle: 'ជ្រើសរើសតាមប្រភេទ',
    viewAll: 'មើលទាំងអស់',
    bestEyebrow: 'The ones you keep coming back to',
    bestTitle: 'ទំនិញលក់ដាច់បំផុត (Bestsellers)',
    bestText: 'រចនាឡើងយ៉ាងពិសេសសម្រាប់អ្នក ពេញនិយម និងមានការគាំទ្រយ៉ាងច្រើនពីអតិថិជន។',
    storyEyebrow: 'A little more thoughtful',
    storyTitle1: 'ទិញតិច.',
    storyTitle2: 'ស្រឡាញ់យូរអង្វែង.',
    storyCopy: 'យើងជឿជាក់ថាទំនិញដែលល្អបំផុត គឺជាទំនិញដែលអ្នកចង់ប្រើរាល់ថ្ងៃ។ ដូច្នេះហើយ ទើបយើងផលិតដោយផ្ចិតផ្ចង់ និងប្រើប្រាស់វត្ថុធាតុដើមមានគុណភាព។',
    learnMore: 'ស្វែងយល់បន្ថែម',
    newEyebrow: 'Just found their way here',
    newTitle: 'ទំនិញមកដល់ថ្មី (New Arrivals)',
    promoEyebrow: 'កាដូពិសេសសម្រាប់អ្នក',
    promoTitle1: 'ការបញ្ចុះតម្លៃពិសេស',
    promoTitle2: 'សម្រាប់ការកុម្ម៉ង់ដំបូង',
    promoCopy: 'ទទួលបានការបញ្ចុះតម្លៃ 10% សម្រាប់ការកុម្ម៉ង់ដំបូង ដោយប្រើកូដ WELCOME10។',
    promoCta: 'ទទួលការបញ្ចុះតម្លៃ',
    addToBag: 'ដាក់ក្នុងកន្ត្រក',
    quickAdd: 'ទិញភ្លាមៗ',
    emptyProducts: 'មិនមានទំនិញនៅឡើយទេ',
    emptyProductsDesc: 'សូមសាកល្បងស្វែងរកឈ្មោះផ្សេង ឬពិនិត្យមើលគ្រប់មុខទំនិញរបស់យើង។',
    cartEmpty: 'កន្ត្រកទំនិញរបស់អ្នកនៅទទេ',
    cartEmptyDesc: 'មិនទាន់មានទំនិញក្នុងកន្ត្រកនៅឡើយទេ។ ជ្រើសរើសទំនិញដែលអ្នកពេញចិត្តឥឡូវនេះ។',
    orderSummary: 'សង្ខេបការកុម្ម៉ង់',
    couponCode: 'កូដបញ្ចុះតម្លៃ',
    apply: 'យល់ព្រម',
    couponTip: 'ប្រើ WELCOME10 ដើម្បីទទួលបានការបញ្ចុះតម្លៃ 10%។',
    discount: 'បញ្ចុះតម្លៃ (10%)',
    subtotal: 'តម្លៃទំនិញសរុប',
    shipping: 'សេវាដឹកជញ្ជូន',
    total: 'ទឹកប្រាក់សរុប',
    checkout: 'បន្តទៅទូទាត់ប្រាក់',
    checkoutTitle: 'Checkout · ការទូទាត់ប្រាក់',
    shippingDetails: '01 — ព័ត៌មានដឹកជញ្ជូន',
    recipientAddress: 'អាសយដ្ឋានអ្នកទទួលទំនិញ',
    nameLabel: 'ឈ្មោះអ្នកទទួល *',
    phoneLabel: 'លេខទូរស័ព្ទ / Telegram *',
    provinceLabel: 'រាជធានី / ខេត្ត *',
    districtLabel: 'ខណ្ឌ / ស្រុក / សង្កាត់ *',
    addressLabel: 'ផ្ទះលេខ ផ្លូវ ឬទីតាំងសម្គាល់ *',
    noteLabel: 'ចំណាំដឹកជញ្ជូន (ស្រេចចិត្ត)',
    carrierSection: '02 — សេវាដឹកជញ្ជូន (VET & J&T)',
    carrierTitle: 'ជ្រើសរើសក្រុមហ៊ុនដឹកជញ្ជូន',
    vetTitle: 'VET Express (វីរៈប៊ុនថាំ)',
    vetDesc: 'ដឹកជញ្ជូនរហ័សទូទាំង 25 ខេត្ត/ក្រុង និងមានសាខាទទួលទូទាំងប្រទេស (1 - 2 ថ្ងៃ)',
    jntTitle: 'J&T Express (JND Express)',
    jntDesc: 'សេវាដឹកជញ្ជូនផ្ទាល់ដល់មាត់ទ្វារផ្ទះ ឬកន្លែងធ្វើការ (1 - 2 ថ្ងៃ)',
    paymentSection: '03 — វិធីសាស្ត្រទូទាត់ (ABA, ACLEDA, KHQR, COD)',
    paymentTitle: 'ជ្រើសរើសការបង់ប្រាក់',
    khqrTitle: 'KHQR (Bakong) — ស្កេនទូទាត់គ្រប់ធនាគារ',
    khqrDesc: 'ស្កេនទូទាត់ងាយស្រួលជាមួយ ABA, ACLEDA, Sathapana, Wing, Canadia, TrueMoney...',
    abaTitle: 'ABA Mobile (ABA PayWay / KHQR)',
    abaDesc: 'ទូទាត់ផ្ទាល់តាម ABA Mobile App (គណនី: 001 888 999 - LOCALBRAND SHOP)',
    acledaTitle: 'ACLEDA Mobile (ACLEDA QR)',
    acledaDesc: 'ទូទាត់តាម ACLEDA Mobile App (គណនី: 012 345 678 - LOCALBRAND CO., LTD)',
    codTitle: 'Cash on Delivery (បង់ប្រាក់ពេលទទួលទំនិញ)',
    codDesc: 'ទូទាត់ប្រាក់សុទ្ធជូនអ្នកដឹកជញ្ជូនពេលទំនិញមកដល់ដៃ',
    confirmOrder: 'បញ្ជាទិញឥឡូវនេះ',
    orderConfirmed: 'កុម្ម៉ង់បានជោគជ័យ',
    thankYouOrder: 'អរគុណសម្រាប់ការកុម្ម៉ង់!',
    confirmCopy: 'យើងខ្ញុំបានទទួលការកុម្ម៉ង់របស់អ្នករួចរាល់ហើយ និងកំពុងរៀបចំវេចខ្ចប់ផ្ញើជូន។',
    orderNumberLabel: 'លេខកូដកុម្ម៉ង់ / ORDER NUMBER',
    carrierLabel: 'សេវាដឹកជញ្ជូន',
    paymentLabel: 'វិធីសាស្ត្រទូទាត់',
    recipientLabel: 'អ្នកទទួលទំនិញ',
    destinationLabel: 'ទីតាំងដឹកជញ្ជូន',
    sendTelegramSlip: '✈️ ផ្ញើស្លីបតាម Telegram (@localbrand_kh)',
    codNote: '💵 សេវាបង់ប្រាក់ពេលទទួល (COD): សូមត្រៀមប្រាក់សុទ្ធជូនបុគ្គលិកដឹកជញ្ជូនពេលទំនិញមកដល់។',
    continueShopping: 'ទិញទំនិញបន្ត',
    myOrders: 'មើលការកុម្ម៉ង់',
    delete: 'លុប',
    inStock: 'ទំនិញមានក្នុងស្តុកស្រាប់',
    reviews: 'ការវាយតម្លៃ',
    quantity: 'ចំនួន',
    saveQr: 'ទាញយក QR / Save',
    copyAccount: 'ចម្លងលេខគណនី',
  },
  en: {
    announcement: 'Nationwide delivery via VET & J&T Express · Pay with KHQR, ABA & ACLEDA (Free over $50)',
    home: 'Home',
    shop: 'Shop',
    clothing: 'Clothing',
    bags: 'Bags',
    accessories: 'Accessories',
    travel: 'Travel',
    all: 'All',
    searchPlaceholder: 'Search products...',
    myAccount: 'My account',
    wishlist: 'Wishlist',
    bag: 'Shopping bag',
    heroEyebrow: 'The good things, made to last · Cambodia 2026',
    heroTitle1: 'Less, but',
    heroTitle2: 'so much better.',
    heroCopy: 'Thoughtfully made essentials for the life you actually live. Premium materials, lovely details, no fuss.',
    heroCta: 'Find your everyday',
    heroNote: 'Fast courier delivery across all 25 provinces via VET & J&T Express',
    heroCaption: 'A little more considered. A lot more you.',
    p1: '100% Premium Quality',
    p2: 'VET & J&T Express Delivery',
    p3: 'KHQR, ABA & ACLEDA Pay',
    p4: 'Nationwide 25 Provinces',
    catEyebrow: 'A place for everything',
    catTitle: 'Explore by Category',
    viewAll: 'View all',
    bestEyebrow: 'The ones you keep coming back to',
    bestTitle: 'Bestsellers',
    bestText: 'Our most-loved pieces, designed for longevity and effortless everyday style.',
    storyEyebrow: 'A little more thoughtful',
    storyTitle1: 'Buy less.',
    storyTitle2: 'Love longer.',
    storyCopy: 'We believe the things we touch every day should be the things we care about the most. That is why we obsess over materials and stitch quality.',
    learnMore: 'Learn more',
    newEyebrow: 'Just found their way here',
    newTitle: 'New Arrivals',
    promoEyebrow: 'A small thank you',
    promoTitle1: 'Something good',
    promoTitle2: 'is in your inbox.',
    promoCopy: 'Enjoy 10% off your first order using discount code WELCOME10 at checkout.',
    promoCta: 'Claim 10% Off',
    addToBag: 'Add to bag',
    quickAdd: 'Quick Add',
    emptyProducts: 'No products found',
    emptyProductsDesc: 'Try searching for something else or browse our complete collection.',
    cartEmpty: 'Your shopping bag is empty',
    cartEmptyDesc: 'You have not added any items yet. Discover pieces you will love.',
    orderSummary: 'Order Summary',
    couponCode: 'Discount code',
    apply: 'Apply',
    couponTip: 'Use code WELCOME10 for 10% off your order.',
    discount: 'Discount (10%)',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    checkout: 'Proceed to Checkout',
    checkoutTitle: 'Checkout',
    shippingDetails: '01 — Shipping Details',
    recipientAddress: 'Recipient Address',
    nameLabel: 'Full Name *',
    phoneLabel: 'Phone number / Telegram *',
    provinceLabel: 'Province / City *',
    districtLabel: 'District / Khan *',
    addressLabel: 'Street address / Landmark *',
    noteLabel: 'Delivery Note (Optional)',
    carrierSection: '02 — Delivery Partner (VET & J&T)',
    carrierTitle: 'Select Delivery Carrier',
    vetTitle: 'VET Express (Vireak Buntham)',
    vetDesc: 'Fast nationwide courier delivery across 25 provinces with extensive branches (1-2 days)',
    jntTitle: 'J&T Express (JND Express)',
    jntDesc: 'Direct door-to-door courier service to your home or office (1-2 days)',
    paymentSection: '03 — Payment Method (ABA, ACLEDA, KHQR, COD)',
    paymentTitle: 'Select Payment Method',
    khqrTitle: 'KHQR (Bakong) — Scan with any bank app',
    khqrDesc: 'Universal instant QR payment with ABA, ACLEDA, Sathapana, Wing, Canadia, TrueMoney...',
    abaTitle: 'ABA Mobile (ABA PayWay / KHQR)',
    abaDesc: 'Pay directly with ABA Mobile App (Account: 001 888 999 - LOCALBRAND SHOP)',
    acledaTitle: 'ACLEDA Mobile (ACLEDA QR)',
    acledaDesc: 'Pay directly with ACLEDA Mobile App (Account: 012 345 678 - LOCALBRAND CO., LTD)',
    codTitle: 'Cash on Delivery (COD)',
    codDesc: 'Pay cash directly to the delivery courier when your package arrives',
    confirmOrder: 'Confirm Order',
    orderConfirmed: 'Order Confirmed',
    thankYouOrder: 'Thank you for your order!',
    confirmCopy: 'We have received your order and are preparing your shipment with care.',
    orderNumberLabel: 'ORDER NUMBER',
    carrierLabel: 'Delivery Carrier',
    paymentLabel: 'Payment Method',
    recipientLabel: 'Recipient',
    destinationLabel: 'Destination',
    sendTelegramSlip: '✈️ Send payment slip to Telegram (@localbrand_kh)',
    codNote: '💵 Cash on Delivery (COD): Please have cash ready for the courier upon arrival.',
    continueShopping: 'Continue Shopping',
    myOrders: 'My Orders',
    delete: 'Remove',
    inStock: 'in stock and ready to ship',
    reviews: 'reviews',
    quantity: 'Quantity',
    saveQr: 'Save QR Code',
    copyAccount: 'Copy Account No.',
  },
};

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
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
};

function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('localbrand-lang') || 'km';
    } catch {
      return 'km';
    }
  });

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('localbrand-theme') || 'light';
    } catch {
      return 'light';
    }
  });

  const [page, setPage] = useState('home');
  const [cart, setCart] = useState(() => readSaved('localbrand-cart', []));
  const [wishlist, setWishlist] = useState(() => readSaved('localbrand-wishlist', []));
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

  const t = translations[lang] || translations.km;

  useEffect(() => {
    try {
      localStorage.setItem('localbrand-lang', lang);
    } catch (e) {
      console.error(e);
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem('localbrand-theme', theme);
    } catch (e) {
      console.error(e);
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => { localStorage.setItem('localbrand-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('localbrand-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 2800);
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
    const filtered = products.filter((product) => {
      const matchCategory = category === 'All' || product.category === category;
      const searchTerms = `${product.name} ${product.nameKm} ${product.category} ${product.categoryKm} ${product.color} ${product.colorKm}`.toLowerCase();
      const matchSearch = searchTerms.includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
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
    setNotice(lang === 'km' ? `${product.nameKm || product.name} បានបញ្ចូលទៅកន្ត្រក` : `${product.name} added to your bag`);
  };

  const updateQuantity = (id, change) => setCart((current) => current
    .map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item)
    .filter((item) => item.quantity > 0));

  const toggleWishlist = (product) => {
    const exists = wishlist.includes(product.id);
    setWishlist((current) => exists ? current.filter((id) => id !== product.id) : [...current, product.id]);
    setNotice(exists
      ? (lang === 'km' ? 'បានដកចេញពីបញ្ជីចង់បាន' : 'Removed from wishlist')
      : (lang === 'km' ? 'បានរក្សាទុកក្នុងបញ្ជីចង់បាន' : 'Added to wishlist'));
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
      customerName: customerName || (lang === 'km' ? 'អតិថិជន' : 'Customer'),
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
      setNotice(lang === 'km' ? 'សូមស្វាគមន៍! លោកអ្នកទទួលបានការបញ្ចុះតម្លៃ 10%' : 'Welcome! 10% discount applied');
    } else {
      setCouponApplied(false);
      setNotice(lang === 'km' ? 'កូដមិនត្រឹមត្រូវ។ សាកល្បង WELCOME10' : 'Invalid coupon. Try WELCOME10');
    }
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email')).trim().toLowerCase();
    const password = String(form.get('password') || '');
    try {
      if (authMode === 'Forgot password') {
        setNotice(lang === 'km' ? 'ការប្តូរពាក្យសម្ងាត់ត្រូវបានរក្សាទុកជា demo។' : 'Password reset is a demo action.');
        return;
      }
      const accounts = getAccounts();
      if (!Array.isArray(accounts)) {
        throw new Error('Saved account data is invalid.');
      }
      if (authMode === 'Register') {
        if (password !== form.get('confirmPassword')) {
          setNotice(lang === 'km' ? 'ពាក្យសម្ងាត់ទាំងពីរមិនត្រូវគ្នាទេ។' : 'Your passwords do not match.');
          return;
        }
        if (accounts.some((account) => account.email === email)) {
          setNotice(lang === 'km' ? 'អ៊ីមែលនេះមានគណនីរួចហើយ។' : 'An account with this email already exists.');
          return;
        }
        const saltBytes = crypto.getRandomValues(new Uint8Array(16));
        const salt = Array.from(saltBytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
        const passwordHash = await hashPassword(password, salt);
        localStorage.setItem('localbrand-accounts', JSON.stringify([...accounts, { email, salt, passwordHash }]));
        localStorage.setItem('localbrand-session', JSON.stringify(email));
        setSignedInEmail(email);
        setAccountSection('Profile');
        setNotice(lang === 'km' ? 'បង្កើតគណនីបានជោគជ័យ!' : 'Account created successfully!');
        go('account');
        return;
      }
      const account = accounts.find((savedAccount) => savedAccount.email === email);
      if (!account) {
        setNotice(lang === 'km' ? 'រកមិនឃើញគណនីនេះទេ។ សូមចុះឈ្មោះគណនីថ្មី។' : 'No account found. Please register.');
        return;
      }
      const passwordHash = await hashPassword(password, account.salt);
      if (passwordHash !== account.passwordHash) {
        setNotice(lang === 'km' ? 'ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ។' : 'Incorrect password.');
        return;
      }
      localStorage.setItem('localbrand-session', JSON.stringify(email));
      setSignedInEmail(email);
      setAccountSection('Profile');
      setNotice(lang === 'km' ? 'ចូលប្រើប្រាស់បានជោគជ័យ' : 'You are now signed in');
      go('account');
    } catch (error) {
      console.error('Account authentication failed.', error);
      setNotice(error instanceof Error ? error.message : 'Error processing authentication.');
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('localbrand-session');
      setSignedInEmail('');
      setAccountSection('Profile');
      setNotice(lang === 'km' ? 'បានចាកចេញពីគណនី' : 'Signed out');
      go('home');
    } catch (error) {
      console.error('Could not sign out.', error);
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
          {lang === 'km' ? 'ស្កេនទូទាត់ជាមួយ ' : 'Scan and pay using '}
          <strong>{method === 'ABA' ? 'ABA Mobile' : method === 'ACLEDA' ? 'ACLEDA Mobile' : (lang === 'km' ? 'ABA, ACLEDA ឬ App ធនាគារណាមួយ' : 'ABA, ACLEDA or any banking app')}</strong><br />
          <small style={{ color: 'var(--text-muted)' }}>Ref: {orderId || 'LOCALBRAND-KH'}</small>
        </p>
        <div className="khqr-actions">
          <button type="button" className="khqr-btn khqr-btn-primary" onClick={() => setNotice(lang === 'km' ? 'បានរក្សាទុក QR Code' : 'Saved QR Code')}>{t.saveQr}</button>
          <button type="button" className="khqr-btn khqr-btn-outline" onClick={() => setNotice(method === 'ACLEDA' ? 'ACLEDA: 012 345 678 (LOCALBRAND CO.)' : 'ABA: 001 888 999 (LOCALBRAND SHOP)')}>{t.copyAccount}</button>
        </div>
      </div>
    </div>
  );

  const Header = () => (
    <>
      <div className="announcement">
        <span className="announcement-text">
          🇰🇭 {t.announcement}
        </span>
        <div className="announcement-controls">
          <button
            type="button"
            className="announcement-pill"
            onClick={() => setLang((curr) => curr === 'km' ? 'en' : 'km')}
            aria-label="Switch language"
            title="Language / ភាសា"
          >
            {lang === 'km' ? '🇰🇭 ខ្មែរ' : '🇺🇸 English'}
          </button>
          <button
            type="button"
            className="announcement-pill"
            onClick={() => setTheme((curr) => curr === 'light' ? 'dark' : 'light')}
            aria-label="Switch Light/Dark theme"
            title="Theme / ពន្លឺ"
          >
            {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      <header className="site-header">
        <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Icon name={mobileMenuOpen ? 'close' : 'menu'} />
        </button>
        <button className="wordmark" onClick={() => go('home')} aria-label="Localbrand home">
          localbrand<span>.</span>
        </button>

        <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <button onClick={() => go('home')}>{t.home}</button>
          <button onClick={() => openShop()}>{t.shop}</button>
          <button onClick={() => openShop('Clothing')}>{t.clothing}</button>
          <button onClick={() => openShop('Bags')}>{t.bags}</button>
          <button onClick={() => openShop('Accessories')}>{t.accessories}</button>
          {mobileMenuOpen && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button
                type="button"
                className="announcement-pill"
                onClick={() => setLang((curr) => curr === 'km' ? 'en' : 'km')}
              >
                {lang === 'km' ? '🇰🇭 ខ្មែរ' : '🇺🇸 EN'}
              </button>
              <button
                type="button"
                className="announcement-pill"
                onClick={() => setTheme((curr) => curr === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          )}
        </nav>

        <div className="header-actions">
          <label className="header-search">
            <Icon name="search" size={17} />
            <input
              aria-label="Search products"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(event) => { setSearch(event.target.value); setPage('shop'); }}
              onFocus={() => page !== 'shop' && go('shop')}
            />
          </label>
          <button className="icon-button header-account" aria-label={t.myAccount} onClick={() => go('account')}>
            <Icon name="user" />
          </button>
          <button className="icon-button wishlist-action" aria-label={t.wishlist} onClick={() => go('wishlist')}>
            <Icon name="heart" />
            <span className="count-badge">{wishlist.length}</span>
          </button>
          <button className="icon-button bag-action" aria-label={t.bag} onClick={() => go('cart')}>
            <Icon name="bag" />
            <span className="count-badge">{cartCount}</span>
          </button>
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
        <span className={`product-tag ${product.tag === 'Sale' ? 'sale-tag' : ''}`}>
          {lang === 'km' ? (product.tagKm || product.tag) : product.tag}
        </span>
        <button
          className={`product-heart ${wishlist.includes(product.id) ? 'is-saved' : ''}`}
          aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggleWishlist(product)}
        >
          <Icon name="heart" />
        </button>
        <button className="quick-add" onClick={() => addToCart(product)}>
          {t.quickAdd} <span>+</span>
        </button>
      </div>
      <button className="product-info" onClick={() => showProduct(product)}>
        <span className="product-category">
          {lang === 'km' ? (product.categoryKm || product.category) : product.category}
          <span>·</span>
          {lang === 'km' ? (product.colorKm || product.color) : product.color}
        </span>
        <span className="product-name">{lang === 'km' ? (product.nameKm || product.name) : product.name}</span>
        <span className="product-price">
          {money(product.price)} <small className="riel-sub">({toRiel(product.price)})</small>
          {product.oldPrice && <del>{money(product.oldPrice)}</del>}
        </span>
      </button>
    </article>
  );

  const ProductGrid = ({ items }) => items.length
    ? <div className="product-grid">{items.map((product) => <div className="product-card-slot" key={product.id}>{ProductCard({ product })}</div>)}</div>
    : (
      <div className="empty-state">
        <span className="empty-icon">⌕</span>
        <h3>{t.emptyProducts}</h3>
        <p>{t.emptyProductsDesc}</p>
        <button className="button button-dark" onClick={() => openShop()}>{t.viewAll}</button>
      </div>
    );

  const Footer = () => (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <button className="wordmark footer-wordmark" onClick={() => go('home')}>
            localbrand<span>.</span>
          </button>
          <p>{t.about || 'Thoughtfully made essentials for everyday living in Cambodia.'}</p>
          <span className="footer-social">Telegram: @localbrand_kh · Facebook</span>
        </div>
        <div className="footer-column">
          <h4>{t.allProducts || 'All Collections'}</h4>
          <button onClick={() => openShop()}>{t.all}</button>
          <button onClick={() => openShop('Bags')}>{t.bags}</button>
          <button onClick={() => openShop('Clothing')}>{t.clothing}</button>
          <button onClick={() => openShop('Accessories')}>{t.accessories}</button>
        </div>
        <div className="footer-column">
          <h4>{t.customerService || 'Help & Support'}</h4>
          <button onClick={() => go('account')}>{t.myAccount}</button>
          <button onClick={() => { setAccountSection('Order tracking'); go('account'); }}>{lang === 'km' ? 'តាមដានការដឹកជញ្ជូន' : 'Track Order'}</button>
          <button onClick={() => setNotice('Telegram: @localbrand_kh · Phone: 012 345 678')}>{lang === 'km' ? 'ទំនាក់ទំនង' : 'Contact Us'}</button>
          <button onClick={() => setNotice('KHQR, ABA, ACLEDA, COD')}>{lang === 'km' ? 'វិធីសាស្ត្រទូទាត់' : 'Payment Methods'}</button>
        </div>
        <div className="footer-newsletter">
          <h4>{t.newsletter || 'Stay Connected'}</h4>
          <p>{t.newsletterDesc || 'Get updates on latest collections and exclusive offers.'}</p>
          <form onSubmit={(event) => { event.preventDefault(); setNotice(lang === 'km' ? 'អ្នកបានចុះឈ្មោះជោគជ័យ។ អរគុណ!' : 'Subscribed successfully. Thank you!'); }}>
            <input aria-label="Email for newsletter" type="email" required placeholder={t.newsletterInput || 'Email or phone'} />
            <button aria-label="Subscribe"><Icon name="arrow" /></button>
          </form>
          <small>{lang === 'km' ? 'យើងខ្ញុំគោរពសិទ្ធិឯកជនភាព និងសុវត្ថិភាពទិន្នន័យរបស់អ្នក។' : 'We respect your privacy and never spam.'}</small>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t.rights || '© 2026 Localbrand Cambodia. All rights reserved.'}</span>
        <div>
          <button onClick={() => setNotice('VET Express & J&T Express: 1-2 ថ្ងៃ')}>{lang === 'km' ? 'ការដឹកជញ្ជូន' : 'Shipping'}</button>
          <button onClick={() => setNotice('KHQR, ABA, ACLEDA, COD')}>{lang === 'km' ? 'ការទូទាត់' : 'Payment'}</button>
          <button onClick={() => setNotice('7-day return policy')}>{lang === 'km' ? 'គោលការណ៍ប្តូរ' : 'Returns'}</button>
        </div>
        <span>USD & KHR (៛)&nbsp; · &nbsp;Cambodia 🇰🇭</span>
      </div>
    </footer>
  );

  const SectionHeading = ({ eyebrow, title, text, action, onAction }) => (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {text && <p className="section-description">{text}</p>}
      </div>
      {action && (
        <button className="text-link" onClick={onAction}>
          {action} <Icon name="arrow" size={16} />
        </button>
      )}
    </div>
  );

  const HomePage = () => (
    <>
      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1>
              {t.heroTitle1}<br />
              <em>{t.heroTitle2}</em>
            </h1>
            <p className="hero-copy">{t.heroCopy}</p>
            <button className="button button-dark" onClick={() => openShop()}>
              {t.heroCta} <Icon name="arrow" size={16} />
            </button>
            <div className="hero-note">
              <span>✳</span> {t.heroNote}
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=90" alt="Localbrand premium collection" />
            <span className="hero-image-caption">{t.heroCaption}</span>
            <span className="hero-image-index">01 — 04</span>
          </div>
          <span className="hero-vertical">THE EVERYDAY EDIT · CAMBODIA 2026</span>
        </section>

        <section className="promise-strip">
          <div><span>01</span><p>{t.p1}</p></div>
          <div><span>02</span><p>{t.p2}</p></div>
          <div><span>03</span><p>{t.p3}</p></div>
          <div><span>04</span><p>{t.p4}</p></div>
        </section>

        <section className="home-section category-section">
          {SectionHeading({
            eyebrow: t.catEyebrow,
            title: t.catTitle,
            action: t.viewAll,
            onAction: () => openShop(),
          })}
          <div className="category-grid">
            {[
              ['Bags', lang === 'km' ? 'កាតាប & កាបូប' : 'The right bag changes everything.', 'photo-1584917865442-de89df76afd3'],
              ['Clothing', lang === 'km' ? 'សម្លៀកបំពាក់' : 'Your new off-duty favourites.', 'photo-1576566588028-4147f3842f27'],
              ['Shoes', lang === 'km' ? 'ស្បែកជើង' : 'A good day starts from the ground up.', 'photo-1542291026-7eec264c27ff'],
              ['Accessories', lang === 'km' ? 'គ្រឿងតុបតែង' : 'It’s the little things.', 'photo-1535632066927-ab7c9ab60908'],
            ].map(([catKey, subtitle, image], index) => (
              <button key={catKey} className={`category-card category-card-${index + 1}`} onClick={() => openShop(catKey)}>
                <img src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=85`} alt="" />
                <span className="category-overlay">
                  <span className="category-kicker">EXPLORE</span>
                  <strong>{lang === 'km' ? (catKey === 'Bags' ? 'កាតាប & កាបូប' : catKey === 'Clothing' ? 'សម្លៀកបំពាក់' : catKey === 'Shoes' ? 'ស្បែកជើង' : 'គ្រឿងតុបតែង') : catKey}</strong>
                  <span className="category-subtitle">{subtitle}</span>
                </span>
                <span className="category-arrow"><Icon name="arrow" /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="home-section bestsellers-section">
          {SectionHeading({
            eyebrow: t.bestEyebrow,
            title: t.bestTitle,
            text: t.bestText,
            action: t.viewAll,
            onAction: () => openShop(),
          })}
          {ProductGrid({ items: products.slice(0, 4) })}
        </section>

        <section className="story-banner">
          <div className="story-image">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85" alt="Localbrand craft studio" />
          </div>
          <div className="story-copy">
            <p className="eyebrow">{t.storyEyebrow}</p>
            <h2>
              {t.storyTitle1}<br />
              <em>{t.storyTitle2}</em>
            </h2>
            <p>{t.storyCopy}</p>
            <button className="text-link" onClick={() => setNotice('Telegram: @localbrand_kh')}>
              {t.learnMore} <Icon name="arrow" size={16} />
            </button>
            <span className="story-mark">L</span>
          </div>
        </section>

        <section className="home-section arrivals-section">
          {SectionHeading({
            eyebrow: t.newEyebrow,
            title: t.newTitle,
            action: t.viewAll,
            onAction: () => { setSort('newest'); openShop(); },
          })}
          {ProductGrid({ items: products.filter((product) => product.tag === 'New') })}
        </section>

        <section className="promo-banner">
          <div className="promo-text">
            <p className="eyebrow">{t.promoEyebrow}</p>
            <h2>
              {t.promoTitle1}<br />
              <em>{t.promoTitle2}</em>
            </h2>
            <p>{t.promoCopy}</p>
            <button className="button button-outline" onClick={() => document.querySelector('.footer-newsletter input')?.focus()}>
              {t.promoCta} <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="promo-decoration">
            <span>10</span>
            <small>% OFF<br />{lang === 'km' ? 'ការកុម្ម៉ង់ដំបូង' : 'YOUR FIRST ORDER'}</small>
            <i>✳</i>
          </div>
        </section>
      </main>
    </>
  );

  const ShopPage = () => (
    <main className="page-container shop-page">
      <div className="page-intro">
        <p className="eyebrow">{lang === 'km' ? 'ទំនិញគុណភាពខ្ពស់ · Good Things Live Here' : 'Good Things Live Here'}</p>
        <h1>{t.shop}<span>.</span></h1>
        <p>{lang === 'km' ? 'បណ្តុំទំនិញរចនាឡើងយ៉ាងសម្រិតសម្រាំងសម្រាប់ជីវិតប្រចាំថ្ងៃរបស់អ្នក។' : 'Considered essentials created for everyday life in Cambodia.'}</p>
      </div>

      <div className="shop-toolbar">
        <div className="category-filters">
          {[
            ['All', t.all],
            ['Bags', t.bags],
            ['Clothing', t.clothing],
            ['Shoes', lang === 'km' ? 'ស្បែកជើង' : 'Shoes'],
            ['Accessories', t.accessories],
            ['Travel', t.travel],
          ].map(([key, label]) => (
            <button key={key} className={category === key ? 'filter-active' : ''} onClick={() => setCategory(key)}>
              {label}
            </button>
          ))}
        </div>
        <div className="sort-control">
          <span>{filteredProducts.length} {lang === 'km' ? 'មុខទំនិញ' : 'items'}</span>
          <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="newest">{lang === 'km' ? 'ថ្មីបំផុត (Newest)' : 'Newest'}</option>
            <option value="price-low">{lang === 'km' ? 'តម្លៃ៖ ទាបទៅខ្ពស់' : 'Price: Low to High'}</option>
            <option value="price-high">{lang === 'km' ? 'តម្លៃ៖ ខ្ពស់ទៅទាប' : 'Price: High to Low'}</option>
          </select>
        </div>
      </div>

      {ProductGrid({ items: filteredProducts })}
    </main>
  );

  const CartPage = () => (
    <main className="page-container checkout-page">
      <p className="eyebrow">{t.bag}</p>
      <h1>{t.bag}<span>.</span></h1>
      {!cart.length ? (
        <div className="empty-state">
          <span className="empty-icon"><Icon name="bag" size={30} /></span>
          <h3>{t.cartEmpty}</h3>
          <p>{t.cartEmptyDesc}</p>
          <button className="button button-dark" onClick={() => openShop()}>
            {t.emptyProductsDesc ? t.viewAll : 'Start shopping'} <Icon name="arrow" size={16} />
          </button>
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
                  <p className="product-category">
                    {lang === 'km' ? (item.categoryKm || item.category) : item.category} · {lang === 'km' ? (item.colorKm || item.color) : item.color}
                  </p>
                  <h3>{lang === 'km' ? (item.nameKm || item.name) : item.name}</h3>
                  <p>{money(item.price)} <small className="riel-sub">({toRiel(item.price)})</small></p>
                  <div className="quantity-control">
                    <button aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, -1)}><Icon name="minus" size={14} /></button>
                    <span>{item.quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => updateQuantity(item.id, 1)}><Icon name="plus" size={14} /></button>
                  </div>
                </div>
                <button className="remove-item" onClick={() => setCart((current) => current.filter((product) => product.id !== item.id))}>
                  {t.delete}
                </button>
              </article>
            ))}
          </div>

          <aside className="order-summary">
            <h2>{t.orderSummary}</h2>
            <div className="coupon-field">
              <form onSubmit={applyCoupon}>
                <input placeholder={t.couponCode} aria-label="Discount code" value={coupon} onChange={(event) => setCoupon(event.target.value)} />
                <button>{t.apply}</button>
              </form>
              <small>{t.couponTip}</small>
            </div>
            {couponApplied && (
              <p className="discount-note">{t.discount} <span>−{money(discount)} ({toRiel(discount)})</span></p>
            )}
            <div className="summary-row">
              <span>{t.subtotal}</span>
              <span>{money(subtotal)} <small className="riel-sub">({toRiel(subtotal)})</small></span>
            </div>
            <div className="summary-row">
              <span>{t.shipping}</span>
              <span>{(subtotal - discount) >= 50 ? (lang === 'km' ? 'ឥតគិតថ្លៃ (Free)' : 'Free (over $50)') : 'VET / J&T Express ($1.50 - $2.50)'}</span>
            </div>
            <div className="summary-total">
              <span>{t.total}</span>
              <div>
                <strong>{money(subtotal - discount)}</strong>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
                  ≈ {toRiel(subtotal - discount)}
                </div>
              </div>
            </div>
            <button className="button button-dark full-button" onClick={startCheckout}>
              {t.checkout} <Icon name="arrow" size={16} />
            </button>
            <div className="secure-note">
              🚚 <strong>{lang === 'km' ? 'សេវាដឹកជញ្ជូន 25 ខេត្ត/ក្រុង៖' : 'Courier delivery:'}</strong> VET Express & J&T Express<br />
              💳 <strong>{lang === 'km' ? 'ទូទាត់ប្រាក់៖' : 'Payments:'}</strong> KHQR, ABA Mobile, ACLEDA Mobile, COD
            </div>
          </aside>
        </div>
      )}
    </main>
  );

  const CheckoutPage = () => (
    <main className="page-container checkout-page">
      <p className="eyebrow">{t.checkoutTitle}</p>
      <h1>{t.checkout}<span>.</span></h1>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          {/* SECTION 01: Shipping Address */}
          <div className="checkout-form-section">
            <p className="eyebrow">{t.shippingDetails}</p>
            <h2>{t.recipientAddress}</h2>
            <div className="form-grid">
              <label>
                {t.nameLabel}
                <input required autoComplete="name" placeholder={lang === 'km' ? 'ឧ. ចាន់ សុខា' : 'e.g. Sokha Chan'} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
              </label>
              <label>
                {t.phoneLabel}
                <input required type="tel" autoComplete="tel" placeholder="012 345 678" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
              </label>
              <label className="form-span">
                {t.provinceLabel}
                <select required value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
                  {cambodiaProvinces.map((prov) => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </label>
              <label>
                {t.districtLabel}
                <input required placeholder={lang === 'km' ? 'ឧ. ខណ្ឌទួលគោក / សង្កាត់បឹងកក់២' : 'e.g. Toul Kork / Boeng Kak 2'} value={customerDistrict} onChange={(e) => setCustomerDistrict(e.target.value)} />
              </label>
              <label>
                {t.addressLabel}
                <input required placeholder={lang === 'km' ? 'ឧ. ផ្ទះលេខ 12 ផ្លូវ 289' : 'e.g. #12, St. 289'} value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
              </label>
              <label className="form-span">
                {t.noteLabel}
                <input placeholder={lang === 'km' ? 'ឧ. ហៅទូរស័ព្ទមុនមកដល់ ឬផ្ញើទុកនៅសាខា VET Express' : 'e.g. Call before delivery'} value={customerNote} onChange={(e) => setCustomerNote(e.target.value)} />
              </label>
            </div>
          </div>

          {/* SECTION 02: Delivery Partner */}
          <div className="checkout-form-section">
            <p className="eyebrow">{t.carrierSection}</p>
            <h2>{t.carrierTitle}</h2>
            <label className={`method-card ${shippingCarrier === 'VET' ? 'is-selected' : ''}`}>
              <input type="radio" name="shippingCarrier" checked={shippingCarrier === 'VET'} onChange={() => setShippingCarrier('VET')} />
              <div className="method-info">
                <div className="method-title-row">
                  <span className="badge-carrier badge-vet">VET Express</span>
                  <strong>{t.vetTitle}</strong>
                </div>
                <small>{t.vetDesc}</small>
              </div>
              <span className="method-price">{shippingFee === 0 && shippingCarrier === 'VET' ? 'Free' : (isPhnomPenh ? '$1.50' : '$2.00')}</span>
            </label>
            <label className={`method-card ${shippingCarrier === 'JND' ? 'is-selected' : ''}`}>
              <input type="radio" name="shippingCarrier" checked={shippingCarrier === 'JND'} onChange={() => setShippingCarrier('JND')} />
              <div className="method-info">
                <div className="method-title-row">
                  <span className="badge-carrier badge-jnt">J&T Express</span>
                  <strong>{t.jntTitle}</strong>
                </div>
                <small>{t.jntDesc}</small>
              </div>
              <span className="method-price">{shippingFee === 0 && shippingCarrier === 'JND' ? 'Free' : (isPhnomPenh ? '$1.75' : '$2.50')}</span>
            </label>
          </div>

          {/* SECTION 03: Payment Method */}
          <div className="checkout-form-section">
            <p className="eyebrow">{t.paymentSection}</p>
            <h2>{t.paymentTitle}</h2>
            <label className={`method-card ${paymentMethod === 'KHQR' ? 'is-selected' : ''}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'KHQR'} onChange={() => setPaymentMethod('KHQR')} />
              <div className="method-info">
                <div className="method-title-row">
                  <span className="badge-carrier badge-khqr">KHQR</span>
                  <strong>{t.khqrTitle}</strong>
                </div>
                <small>{t.khqrDesc}</small>
              </div>
            </label>
            <label className={`method-card ${paymentMethod === 'ABA' ? 'is-selected' : ''}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'ABA'} onChange={() => setPaymentMethod('ABA')} />
              <div className="method-info">
                <div className="method-title-row">
                  <span className="badge-carrier badge-aba">ABA Mobile</span>
                  <strong>{t.abaTitle}</strong>
                </div>
                <small>{t.abaDesc}</small>
              </div>
            </label>
            <label className={`method-card ${paymentMethod === 'ACLEDA' ? 'is-selected' : ''}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'ACLEDA'} onChange={() => setPaymentMethod('ACLEDA')} />
              <div className="method-info">
                <div className="method-title-row">
                  <span className="badge-carrier badge-acleda">ACLEDA</span>
                  <strong>{t.acledaTitle}</strong>
                </div>
                <small>{t.acledaDesc}</small>
              </div>
            </label>
            <label className={`method-card ${paymentMethod === 'COD' ? 'is-selected' : ''}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
              <div className="method-info">
                <div className="method-title-row">
                  <span className="badge-carrier badge-cod">COD</span>
                  <strong>{t.codTitle}</strong>
                </div>
                <small>{t.codDesc}</small>
              </div>
            </label>

            {paymentMethod !== 'COD' && (
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '8px 0 12px' }}>
                  ✳ {lang === 'km' ? 'លោកអ្នកអាចស្កេន KHQR ខាងក្រោម ឬលើផ្ទាំងបញ្ជាក់ការបញ្ជាទិញ៖' : 'Scan the QR code below or on the order confirmation screen:'}
                </p>
                {KhqrCard({ amount: grandTotal, orderId: 'ORDER-PENDING', method: paymentMethod })}
              </div>
            )}
          </div>

          <button className="button button-dark full-button" type="submit">
            {t.confirmOrder} · {money(grandTotal)} <Icon name="arrow" size={16} />
          </button>
        </form>

        <aside className="order-summary">
          <h2>{lang === 'km' ? `ទំនិញក្នុងកន្ត្រក (${cartCount})` : `Cart Items (${cartCount})`}</h2>
          {cart.map((item) => (
            <div className="summary-product" key={item.id}>
              <img src={item.image} alt="" />
              <div>
                <strong>{lang === 'km' ? (item.nameKm || item.name) : item.name}</strong>
                <small>Qty {item.quantity} · {lang === 'km' ? (item.colorKm || item.color) : item.color}</small>
              </div>
              <span>{money(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>{t.subtotal}</span>
            <span>{money(subtotal)}</span>
          </div>
          {couponApplied && (
            <div className="summary-row discount-note">
              <span>{t.discount}</span>
              <span>−{money(discount)}</span>
            </div>
          )}
          <div className="summary-row">
            <span>{t.shipping} ({shippingCarrier === 'VET' ? 'VET Express' : 'J&T Express'})</span>
            <span>{shippingFee === 0 ? 'Free' : money(shippingFee)}</span>
          </div>
          <div className="summary-total">
            <span>{t.total}</span>
            <div>
              <strong>{money(grandTotal)}</strong>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
                ≈ {toRiel(grandTotal)}
              </div>
            </div>
          </div>
          <div className="secure-note" style={{ textAlign: 'left', lineHeight: '1.6', marginTop: '18px' }}>
            🚚 <strong>{t.carrierLabel}:</strong> {shippingCarrier === 'VET' ? 'VET Express (វីរៈប៊ុនថាំ)' : 'J&T Express (JND)'}<br />
            💳 <strong>{t.paymentLabel}:</strong> {paymentMethod === 'KHQR' ? 'KHQR (Bakong)' : paymentMethod === 'ABA' ? 'ABA Mobile' : paymentMethod === 'ACLEDA' ? 'ACLEDA Mobile' : 'Cash on Delivery (COD)'}<br />
            📍 <strong>{lang === 'km' ? 'ទីតាំង៖' : 'Province:'}</strong> {selectedProvince.split(' ')[0]}
          </div>
        </aside>
      </div>
    </main>
  );

  const WishlistPage = () => (
    <main className="page-container shop-page">
      <p className="eyebrow">{t.wishlist}</p>
      <h1>{t.wishlist}<span>.</span></h1>
      {wishlist.length ? (
        ProductGrid({ items: products.filter((product) => wishlist.includes(product.id)) })
      ) : (
        <div className="empty-state">
          <span className="empty-icon"><Icon name="heart" size={30} /></span>
          <h3>{lang === 'km' ? 'មិនទាន់មានទំនិញក្នុងបញ្ជីចង់បាន' : 'Your wishlist is empty'}</h3>
          <p>{lang === 'km' ? 'ចុចលើរូបបេះដូងលើទំនិញណាមួយដើម្បីរក្សាទុកសម្រាប់ថ្ងៃក្រោយ។' : 'Click the heart icon on any piece to save it for later.'}</p>
          <button className="button button-dark" onClick={() => openShop()}>{t.viewAll} <Icon name="arrow" size={16} /></button>
        </div>
      )}
    </main>
  );

  const AccountPage = () => {
    const accountTabs = [
      ['Profile', lang === 'km' ? 'ព័ត៌មានគណនី' : 'Profile'],
      ['My orders', lang === 'km' ? 'ការកុម្ម៉ង់របស់ខ្ញុំ' : 'My Orders'],
      ['Order tracking', lang === 'km' ? 'តាមដានការដឹកជញ្ជូន' : 'Order Tracking'],
      ['Addresses', lang === 'km' ? 'អាសយដ្ឋានដឹកជញ្ជូន' : 'Addresses'],
      ['Wishlist', lang === 'km' ? 'បញ្ជីចង់បាន' : 'Wishlist'],
    ];

    return (
      <main className="page-container account-page">
        <p className="eyebrow">{t.myAccount}</p>
        <h1>{t.myAccount}<span>.</span></h1>
        <div className="account-layout">
          <nav className="account-nav">
            {accountTabs.map(([key, label]) => (
              <button
                className={accountSection === key ? 'account-tab-active' : ''}
                key={key}
                onClick={() => key === 'Wishlist' ? go('wishlist') : setAccountSection(key)}
              >
                {label}<span>→</span>
              </button>
            ))}
            {signedInEmail && (
              <button onClick={logout}>{lang === 'km' ? 'ចាកចេញ (Log out)' : 'Log out'} <span>→</span></button>
            )}
          </nav>
          <section className="account-content">
            {accountSection === 'Profile' && (
              <>
                <p className="eyebrow">{signedInEmail ? (lang === 'km' ? 'បានចូលប្រើប្រាស់' : 'Signed in') : (lang === 'km' ? 'សូមស្វាគមន៍' : 'Welcome')}</p>
                <h2>{lang === 'km' ? 'សួស្តី!' : 'Welcome back!'}</h2>
                {signedInEmail ? (
                  <>
                    <p>{lang === 'km' ? 'បានចូលប្រើប្រាស់ជា' : 'Signed in as'} <strong>{signedInEmail}</strong>.</p>
                    <button className="button button-light" onClick={logout}>Log out</button>
                  </>
                ) : (
                  <>
                    <p>{lang === 'km' ? 'ចូលប្រើ ឬបង្កើតគណនីថ្មីដើម្បីរក្សាទុកប្រវត្តិទិញទំនិញ និងអាសយដ្ឋានដឹកជញ្ជូន។' : 'Sign in or create an account to view your order history and saved delivery addresses.'}</p>
                    <div className="account-actions">
                      <button className="button button-dark" onClick={() => { setAuthMode('Login'); go('auth'); }}>Sign in <Icon name="arrow" size={16} /></button>
                      <button className="button button-light" onClick={() => { setAuthMode('Register'); go('auth'); }}>Register</button>
                    </div>
                  </>
                )}
              </>
            )}

            {accountSection === 'My orders' && (
              <>
                <p className="eyebrow">{t.myOrders}</p>
                <h2>{t.myOrders}</h2>
                <div className="account-empty">
                  <span>✳</span>
                  <p>{lastOrder ? `${lang === 'km' ? 'ការកុម្ម៉ង់ចុងក្រោយ៖' : 'Latest order:'} #${lastOrder.orderNumber} (${lastOrder.shippingCarrier === 'VET' ? 'VET Express' : 'J&T Express'})` : (lang === 'km' ? 'ប្រវត្តិនៃការកុម្ម៉ង់ទំនិញនឹងបង្ហាញនៅទីនេះ។' : 'No previous orders found.')}</p>
                  <button className="text-link" onClick={() => go('cart')}>{t.bag} <Icon name="arrow" size={16} /></button>
                </div>
              </>
            )}

            {accountSection === 'Order tracking' && (
              <>
                <p className="eyebrow">VET Express & J&T Express</p>
                <h2>{lang === 'km' ? 'តាមដានការដឹកជញ្ជូន' : 'Track Order'}</h2>
                <form onSubmit={(event) => { event.preventDefault(); setNotice(orderNumber ? (lang === 'km' ? `ទំនិញ #${orderNumber} កំពុងដំណើរការដឹកជញ្ជូន!` : `Order #${orderNumber} is in transit!`) : 'Please enter an order number.'); }} className="tracking-form">
                  <label>
                    {t.orderNumberLabel}
                    <input required placeholder="e.g. VET-KH123456 / JT-KH123456" value={orderNumber} onChange={(event) => setOrderNumber(event.target.value)} />
                  </label>
                  <button className="button button-dark">{lang === 'km' ? 'ស្វែងរក' : 'Track'} <Icon name="arrow" size={16} /></button>
                </form>
              </>
            )}

            {accountSection === 'Addresses' && (
              <>
                <p className="eyebrow">{lang === 'km' ? 'អាសយដ្ឋាន' : 'Saved Address'}</p>
                <h2>{t.recipientAddress}</h2>
                <p>{customerAddress ? `${customerAddress}, ${customerDistrict}, ${selectedProvince}` : (lang === 'km' ? 'លោកអ្នកអាចបញ្ចូលអាសយដ្ឋាននៅពេលទូទាត់ប្រាក់ (Checkout)។' : 'Your address will appear here once saved at checkout.')}</p>
              </>
            )}
          </section>
        </div>
      </main>
    );
  };

  const AuthPage = () => (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Localbrand Cambodia</p>
        <h1>{authMode}<span>.</span></h1>
        <p>{authMode === 'Login' ? (lang === 'km' ? 'រីករាយដែលបានជួបលោកអ្នកម្តងទៀត។' : 'Welcome back.') : (lang === 'km' ? 'បង្កើតគណនីថ្មីសម្រាប់ការទិញទំនិញ។' : 'Create an account for quick checkout.')}</p>
        <form onSubmit={handleAuthSubmit}>
          <label>
            {lang === 'km' ? 'អ៊ីមែល (Email)' : 'Email address'}
            <input name="email" required type="email" autoComplete="email" placeholder="you@example.com" />
          </label>
          <label>
            {lang === 'km' ? 'ពាក្យសម្ងាត់ (Password)' : 'Password'}
            <input name="password" required type="password" minLength="8" autoComplete={authMode === 'Register' ? 'new-password' : 'current-password'} placeholder="••••••••" />
          </label>
          {authMode === 'Register' && (
            <label>
              {lang === 'km' ? 'បញ្ជាក់ពាក្យសម្ងាត់' : 'Confirm Password'}
              <input name="confirmPassword" required type="password" minLength="8" autoComplete="new-password" placeholder="••••••••" />
            </label>
          )}
          <button className="button button-dark full-button" type="submit">
            {authMode === 'Login' ? (lang === 'km' ? 'ចូលប្រើប្រាស់ (Sign in)' : 'Sign In') : (lang === 'km' ? 'បង្កើតគណនី (Register)' : 'Register')} <Icon name="arrow" size={16} />
          </button>
        </form>
        <div className="auth-switch">
          {authMode === 'Login' ? (
            <span>{lang === 'km' ? 'មិនទាន់មានគណនី? ' : 'No account? '} <button onClick={() => setAuthMode('Register')}>{lang === 'km' ? 'បង្កើតគណនី' : 'Register'}</button></span>
          ) : (
            <span>{lang === 'km' ? 'មានគណនីរួចហើយ? ' : 'Have an account? '} <button onClick={() => setAuthMode('Login')}>{lang === 'km' ? 'ចូលប្រើប្រាស់' : 'Sign In'}</button></span>
          )}
        </div>
      </div>
    </main>
  );

  const ConfirmationPage = () => (
    <main className="confirmation-page">
      <div className="confirmation-mark"><Icon name="check" size={34} /></div>
      <p className="eyebrow">{t.orderConfirmed}</p>
      <h1>{t.thankYouOrder}<span>!</span></h1>
      <p className="confirmation-copy">
        {lang === 'km'
          ? `យើងខ្ញុំបានទទួលការកុម្ម៉ង់របស់អ្នករួចរាល់ហើយ និងកំពុងរៀបចំវេចខ្ចប់ផ្ញើជូនតាម ${lastOrder?.shippingCarrier === 'VET' ? 'VET Express (វីរៈប៊ុនថាំ)' : 'J&T Express (JND)'}។`
          : `We have received your order and are preparing shipment via ${lastOrder?.shippingCarrier === 'VET' ? 'VET Express' : 'J&T Express'}.`}
      </p>

      <div className="confirmation-number">
        <span>{t.orderNumberLabel}</span>
        <strong>{lastOrder?.orderNumber || orderNumber}</strong>
      </div>

      <div className="order-details-card">
        <div className="order-details-row">
          <span>{t.carrierLabel}</span>
          <span>{lastOrder?.shippingCarrier === 'VET' ? 'VET Express (វីរៈប៊ុនថាំ)' : 'J&T Express (JND)'}</span>
        </div>
        <div className="order-details-row">
          <span>{t.paymentLabel}</span>
          <span>{lastOrder?.paymentMethod === 'KHQR' ? 'KHQR (Bakong)' : lastOrder?.paymentMethod === 'ABA' ? 'ABA Mobile' : lastOrder?.paymentMethod === 'ACLEDA' ? 'ACLEDA Mobile' : 'Cash on Delivery (COD)'}</span>
        </div>
        <div className="order-details-row">
          <span>{t.recipientLabel}</span>
          <span>{lastOrder?.customerName} ({lastOrder?.customerPhone})</span>
        </div>
        <div className="order-details-row">
          <span>{t.destinationLabel}</span>
          <span>{lastOrder?.customerAddress}, {lastOrder?.customerDistrict}, {lastOrder?.selectedProvince}</span>
        </div>
        <div className="order-details-row">
          <span>{t.total}</span>
          <span style={{ color: 'var(--blue-primary)', fontSize: '16px' }}>{money(lastOrder?.total || 0)} ({toRiel(lastOrder?.total || 0)})</span>
        </div>
      </div>

      {lastOrder?.paymentMethod !== 'COD' ? (
        <div style={{ maxWidth: '340px', width: '100%', margin: '14px auto' }}>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            📱 {lang === 'km' ? 'សូមស្កេន KHQR ខាងក្រោមដើម្បីបញ្ចប់ការទូទាត់៖' : 'Please scan the KHQR code below to finish payment:'}
          </p>
          {KhqrCard({ amount: lastOrder?.total || 0, orderId: lastOrder?.orderNumber, method: lastOrder?.paymentMethod })}
          <a href="https://t.me/localbrand_kh" target="_blank" rel="noreferrer" className="telegram-cta">
            {t.sendTelegramSlip}
          </a>
        </div>
      ) : (
        <div className="secure-note" style={{ fontSize: '14px', marginTop: '16px', color: '#16a34a' }}>
          {t.codNote}
        </div>
      )}

      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '26px' }}>
        <button className="button button-dark" onClick={() => go('account')}>{t.myOrders}</button>
        <button className="text-link confirmation-continue" onClick={() => openShop()}>{t.continueShopping} <Icon name="arrow" size={16} /></button>
      </div>
    </main>
  );

  const AdminLoginPage = () => (
    <main className="admin-login-page">
      <div className="admin-login-card animate-scale-up">
        <button type="button" className="admin-login-brand" onClick={() => go('home')}>
          localbrand<span>.</span>
        </button>
        <div className="admin-login-badge">
          <span>🔐</span> STUDIO ADMIN · CAMBODIA
        </div>
        <h1>Welcome back<span>.</span></h1>
        <p className="admin-login-copy">
          {lang === 'km' ? 'ចូលគ្រប់គ្រងហាង ទំនិញ និងការដឹកជញ្ជូន។' : 'Sign in to manage products, orders & payments.'}
        </p>
        <form onSubmit={(event) => { event.preventDefault(); setAdminAuthenticated(true); go('admin'); }}>
          <label>
            {lang === 'km' ? 'អ៊ីមែល (Email address)' : 'Email address'}
            <input required type="email" defaultValue="admin@localbrand.com.kh" placeholder="admin@localbrand.com.kh" />
          </label>
          <label>
            {lang === 'km' ? 'ពាក្យសម្ងាត់ (Password)' : 'Password'}
            <input required type="password" minLength="6" defaultValue="admin123" placeholder="Your password" />
          </label>
          <button className="button button-dark full-button" type="submit">
            {lang === 'km' ? 'ចូលប្រព័ន្ធគ្រប់គ្រង' : 'Sign in to your store'} <Icon name="arrow" size={16} />
          </button>
        </form>
        <button type="button" className="admin-login-back-btn" onClick={() => go('home')}>
          ← {lang === 'km' ? 'ត្រឡប់ទៅកាន់ហាងទំនិញវិញ' : 'Back to store'}
        </button>
      </div>
    </main>
  );

  const AdminPage = () => {
    const data = {
      Products: { description: 'A thoughtful edit, from our studio to the world.', columns: ['Product', 'Category', 'Price', 'Stock', 'Status'], rows: products.map((p) => [p.name, p.category, money(p.price), p.stock, p.tag]) },
      Categories: { description: 'The collections that make up our world.', columns: ['Category', 'Products', 'Visibility'], rows: [['Bags', 3, 'Published'], ['Clothing', 1, 'Published'], ['Shoes', 2, 'Published'], ['Accessories', 2, 'Published'], ['Travel', 1, 'Published']] },
      Orders: { description: 'Orders in transit via VET Express & J&T Express across Cambodia.', columns: ['Order', 'Customer', 'Carrier', 'Payment', 'Total', 'Status'], rows: [['#VET-KH10481', 'ចាន់ សុខា (Phnom Penh)', 'VET Express', 'ABA KHQR', '$273.00', 'Processing'], ['#JT-KH10480', 'រិន សុភា (Siem Reap)', 'J&T Express', 'ACLEDA', '$145.00', 'Confirmed'], ['#VET-KH10479', 'កែវ វឌ្ឍនៈ (Battambang)', 'VET Express', 'KHQR', '$98.00', 'Shipped'], ['#JT-KH10478', 'ជា បុប្ផា (Kampot)', 'J&T Express', 'COD', '$326.00', 'Delivered']] },
      Customers: { description: 'Customer records across 25 provinces.', columns: ['Customer', 'Phone/Telegram', 'Location', 'Spent'], rows: [['ចាន់ សុខា', '012 888 999', 'Phnom Penh', '$482.00'], ['រិន សុភា', '098 777 666', 'Siem Reap', '$145.00'], ['កែវ វឌ្ឍនៈ', '088 555 444', 'Battambang', '$226.00'], ['ជា បុប្ផា', '070 333 222', 'Kampot', '$814.00']] },
      Payments: { description: 'KHQR, ABA, ACLEDA, and COD gateway reconciliation.', columns: ['Payment Ref', 'Method', 'Date', 'Amount', 'Status'], rows: [['PAY-KH2091', 'ABA KHQR', 'Today', '$273.00', 'Paid'], ['PAY-KH2090', 'ACLEDA Mobile', 'Today', '$145.00', 'Paid'], ['PAY-KH2089', 'Bakong KHQR', 'Yesterday', '$98.00', 'Paid'], ['PAY-KH2088', 'Cash on Delivery', 'Oct 01', '$326.00', 'Paid']] },
      Reviews: { description: 'Customer reviews & feedback.', columns: ['Customer', 'Product', 'Rating', 'Date', 'Status'], rows: [['សុខា ភ្នំពេញ', 'The Everyday Tote', '★★★★★', 'Today', 'Published'], ['វិសាល សៀមរាប', 'Everyday Mini Crossbody', '★★★★☆', 'Yesterday', 'Pending'], ['វណ្ណដា បាត់ដំបង', 'Classic Court Sneaker', '★★★★★', 'Sep 29', 'Published']] },
      Promotions: { description: 'Promotions and special codes.', columns: ['Code', 'Offer', 'Usage', 'Expires', 'Status'], rows: [['WELCOME10', '10% off first order', '126 uses', 'No expiry', 'Active'], ['AUTUMN15', '15% off selected pieces', '48 uses', 'Oct 31, 2026', 'Active']] },
      CMS: { description: 'Content management across pages.', columns: ['Page', 'Last updated', 'Visibility'], rows: [['Home banner', 'Today', 'Published'], ['About us', 'Sep 28, 2026', 'Published'], ['Terms & conditions', 'Sep 14, 2026', 'Published']] },
      Reports: { description: 'Performance analytics.', columns: ['Report', 'Period', 'Result', 'Change'], rows: [['Sales report', 'Last 30 days', '$24,580.00 (៛100,778,000)', '+12.8%'], ['Order report', 'Last 30 days', '186 orders', '+8.2%'], ['VET vs J&T', 'Delivery split', '62% VET · 38% J&T', 'Balanced'], ['Payment ratio', 'KHQR vs COD', '74% KHQR/ABA · 26% COD', '+6.2%']] },
      Settings: { description: 'Store configuration for Cambodia.', columns: ['Setting', 'Current value', 'Status'], rows: [['Store settings', 'Localbrand Cambodia (USD & KHR)', 'Configured'], ['Admin profile', 'hello@localbrand.com.kh', 'Active'], ['Payment methods', 'KHQR (Bakong) · ABA · ACLEDA · COD', 'Configured'], ['Delivery partners', 'VET Express & J&T Express (25 Provinces)', 'Configured'], ['Free shipping', 'Free over $50 (25 Provinces)', 'Configured']] },
    };
    const sectionData = data[adminSection];
    return (
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <button className="admin-brand" onClick={() => go('home')}>
            localbrand<span>.</span><small>STUDIO ADMIN</small>
          </button>
          <p className="admin-sidebar-label">WORKSPACE</p>
          <nav>
            {adminLinks.map(([icon, label]) => (
              <button key={label} className={adminSection === label ? 'admin-link-active' : ''} onClick={() => setAdminSection(label)}>
                <span className="admin-link-icon">{icon === 'Overview' ? '◫' : icon === 'Products' ? '◇' : icon === 'Categories' ? '▦' : icon === 'Orders' ? '▤' : icon === 'Customers' ? '♙' : icon === 'Payments' ? '＄' : icon === 'Reviews' ? '☆' : icon === 'Promotions' ? '%' : icon === 'CMS' ? '▧' : icon === 'Reports' ? '▥' : '⚙'}</span>
                {label}
                {label === 'Orders' && <span className="admin-nav-count">4</span>}
              </button>
            ))}
          </nav>
          <div className="admin-sidebar-bottom">
            <div className="admin-profile">
              <span className="admin-avatar">A</span>
              <span><strong>Alex Morgan</strong><small>Store Administrator</small></span>
            </div>
            <button className="back-to-store" onClick={() => go('home')}>←&nbsp; Back to store</button>
          </div>
        </aside>
        <main className="admin-main">
          <header className="admin-topbar">
            <div className="admin-breadcrumb">Studio <span>/</span> {adminSection}</div>
            <div className="admin-top-actions">
              <span className="admin-store-status"><i /> Store is live</span>
              <button onClick={() => go('home')}>View store ↗</button>
              <span className="admin-top-avatar">A</span>
            </div>
          </header>
          <div className="admin-content">
            <div className="admin-page-title">
              <div>
                <p className="eyebrow">STUDIO OVERVIEW</p>
                <h1>{adminSection === 'Overview' ? 'Welcome, Alex' : adminSection}<span>.</span></h1>
                <p>{adminSection === 'Overview' ? 'Here is the summary of activity in your store.' : sectionData?.description}</p>
              </div>
              <button className="admin-date-button">↗&nbsp; Last 30 days&nbsp;⌄</button>
            </div>
            {adminSection === 'Overview' ? (
              <>
                <div className="admin-metrics">
                  {[
                    ['Total sales', '$24,580', '+12.8%', '01'],
                    ['Orders', '186', '+8.2%', '02'],
                    ['Products', '42', '4 low in stock', '03'],
                    ['Customers', '1,284', '+18.4%', '04'],
                  ].map(([label, number, change, index]) => (
                    <article className="admin-metric" key={label}>
                      <span>{label}<small>{index}</small></span>
                      <strong>{number}</strong>
                      <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>↗ {change} vs last month</p>
                    </article>
                  ))}
                </div>
                <section className="admin-panel" style={{ marginTop: '24px' }}>
                  <div className="admin-panel-heading">
                    <div><h2>Recent orders</h2><p>Latest orders via VET & J&T Express.</p></div>
                    <button onClick={() => setAdminSection('Orders')}>All orders →</button>
                  </div>
                  {AdminTable({ data: data.Orders })}
                </section>
              </>
            ) : (
              <section className="admin-panel">
                <div className="admin-panel-heading">
                  <div><h2>{adminSection}</h2><p>{sectionData?.description}</p></div>
                </div>
                {sectionData && AdminTable({ data: sectionData })}
              </section>
            )}
          </div>
        </main>
      </div>
    );
  };

  const AdminTable = ({ data }) => (
    <div className="admin-table-scroll">
      <table className="admin-table">
        <thead>
          <tr>{data.columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`}>
                  {cellIndex === row.length - 1 && ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Paid', 'Pending', 'Active', 'Published'].includes(cell) ? (
                    <span className={`status-pill ${cell.toLowerCase()}`}>{cell}</span>
                  ) : cellIndex === 0 && data.columns.includes('Product') ? (
                    <span className="table-product-name">{cell}</span>
                  ) : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
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
      {page !== 'admin' && page !== 'admin-login' && (
        <div className="admin-entry">
          <button onClick={openAdmin}>Store admin <span>↗</span></button>
        </div>
      )}
      {page === 'admin' && (
        <button className="admin-logout" onClick={() => { setAdminAuthenticated(false); go('home'); }}>Log out&nbsp; ↗</button>
      )}

      {selectedProduct && (
        <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setSelectedProduct(null); }}>
          <section className="product-modal" role="dialog" aria-modal="true" aria-label={selectedProduct.name}>
            <button className="modal-close icon-button" aria-label="Close product details" onClick={() => setSelectedProduct(null)}>
              <Icon name="close" />
            </button>
            <div className="modal-image">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
            <div className="modal-details">
              <p className="eyebrow">
                {lang === 'km' ? (selectedProduct.categoryKm || selectedProduct.category) : selectedProduct.category} · {lang === 'km' ? (selectedProduct.colorKm || selectedProduct.color) : selectedProduct.color}
              </p>
              <h2>{lang === 'km' ? (selectedProduct.nameKm || selectedProduct.name) : selectedProduct.name}</h2>
              <p className="modal-price">
                {money(selectedProduct.price)} <small className="riel-sub">({toRiel(selectedProduct.price)})</small>
                {selectedProduct.oldPrice && <del>{money(selectedProduct.oldPrice)}</del>}
              </p>
              <p className="review-summary">
                <span>★★★★★</span> 4.9 <button>{lang === 'km' ? '26 ការវាយតម្លៃ' : '26 reviews'}</button>
              </p>
              <p className="modal-description">
                {lang === 'km' ? (selectedProduct.descriptionKm || selectedProduct.description) : selectedProduct.description}
              </p>
              <p className="stock-note">
                <span /> {selectedProduct.stock} {t.inStock}
              </p>
              <div className="detail-quantity">
                <span>{t.quantity}</span>
                <div className="quantity-control">
                  <button aria-label="Decrease quantity" onClick={() => setDetailQuantity((quantity) => Math.max(1, quantity - 1))}><Icon name="minus" size={14} /></button>
                  <span>{detailQuantity}</span>
                  <button aria-label="Increase quantity" onClick={() => setDetailQuantity((quantity) => Math.min(selectedProduct.stock, quantity + 1))}><Icon name="plus" size={14} /></button>
                </div>
              </div>
              <button className="button button-dark full-button" onClick={() => { addToCart(selectedProduct, detailQuantity); setSelectedProduct(null); }}>
                {t.addToBag} <Icon name="bag" size={16} />
              </button>
              <button className="modal-wishlist" onClick={() => toggleWishlist(selectedProduct)}>
                <Icon name="heart" size={17} /> {wishlist.includes(selectedProduct.id) ? (lang === 'km' ? 'បានរក្សាទុកក្នុងបញ្ជីចង់បាន' : 'Saved to wishlist') : (lang === 'km' ? 'រក្សាទុកក្នុងបញ្ជីចង់បាន' : 'Add to wishlist')}
              </button>
              <div className="modal-perks">
                <span>✳ {lang === 'km' ? 'ផលិតផលគុណភាពខ្ពស់ 100%' : '100% Premium Quality'}</span>
                <span>✳ {lang === 'km' ? 'ដឹកជញ្ជូនតាម VET & J&T Express' : 'Fast delivery via VET & J&T Express'}</span>
                <span>✳ {lang === 'km' ? 'ដឹកជញ្ជូនឥតគិតថ្លៃលើសពី $50' : 'Free delivery over $50'}</span>
              </div>
            </div>
          </section>
        </div>
      )}

      {notice && (
        <div className="toast" role="status">
          <span>✳</span>{notice}
          <button aria-label="Dismiss notification" onClick={() => setNotice('')}><Icon name="close" size={15} /></button>
        </div>
      )}
    </>
  );
}

export default App;
