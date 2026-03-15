# Food Delivery Platform - Complete System

## Overview
A full-featured role-based food delivery platform with real-time order tracking, multi-role dashboards, and comprehensive management features.

## Tech Stack

### Backend
- **Node.js + Express** - Server framework
- **MongoDB + Mongoose** - Database and ODM
- **JWT** - Authentication
- **Socket.io** - Real-time updates
- **Multer** - File uploads

### Frontend
- **React + Vite** - UI framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Router** - Routing
- **Axios** - API client
- **Socket.io-client** - Real-time client

## System Roles

1. **Admin** - System management and analytics
2. **User (Customer)** - Browse, order, track deliveries
3. **Food Vendor (Restaurant)** - Manage menu, orders, reports
4. **Delivery Rider** - Accept and deliver orders

## Features Implemented

### Backend

#### Models
- ✅ User (with roles, location, referral codes)
- ✅ Vendor/Restaurant (with business info, documents, discounts)
- ✅ MenuItem (with categories, pricing, availability)
- ✅ Order (with status tracking, ratings, delivery info)
- ✅ Cart (user shopping cart)
- ✅ Driver/Rider (with location, earnings, ratings)
- ✅ Review (vendor and rider ratings)
- ✅ Referral (referral system)
- ✅ PromoCode (discount codes)
- ✅ ServicePricing (delivery pricing configuration)

#### API Routes
- ✅ `/api/auth` - Authentication (signin/signup)
- ✅ `/api/orders` - Order management
- ✅ `/api/menu` - Menu item CRUD
- ✅ `/api/cart` - Shopping cart operations
- ✅ `/api/vendors` - Vendor management
- ✅ `/api/riders` - Rider operations
- ✅ `/api/admin` - Admin dashboard and management
- ✅ `/api/promo` - Promo code validation
- ✅ `/api/referral` - Referral system
- ✅ `/api/vendor-registration` - Vendor registration

#### Real-time Features
- ✅ Socket.io integration for live updates
- ✅ Order status notifications
- ✅ Rider location tracking
- ✅ New order alerts for vendors

### Frontend

#### Core Structure
- ✅ Authentication context and protected routes
- ✅ Socket context for real-time updates
- ✅ API service layer
- ✅ Dashboard layout component

#### Dashboards

**User Dashboard** (`/dashboard`)
- View orders and status
- Track active deliveries
- View order history
- Statistics (total orders, spending)

**Vendor Dashboard** (`/vendor/dashboard`)
- View incoming orders
- Accept/reject orders
- Update order status (preparing, ready)
- Revenue reports
- Order statistics

**Rider Dashboard** (`/rider/dashboard`)
- Online/offline toggle
- View available orders
- Accept deliveries
- Track active deliveries
- Update delivery status
- Earnings summary

**Admin Dashboard** (`/admin/dashboard`)
- System overview statistics
- User management
- Vendor management
- Rider management
- Order management
- Promo code management
- Service pricing configuration

#### Pages
- ✅ Restaurants listing
- ✅ Restaurant detail
- ✅ Shopping cart
- ✅ Order tracking
- ✅ Vendor registration form

## Database Schema

### User
- Email, password, fullName, phone
- Role (user, vendor, rider, admin, etc.)
- Location (lat, lng, address)
- Referral code
- OTP fields for verification

### Vendor
- Business information (name, owner, contacts)
- Business type (Tier 1-4, Elite, Catering, Lounge, etc.)
- Location (city, coordinates)
- Documents (registration, license, TIN, etc.)
- Menu items reference
- Discounts/promotions
- Earnings tracking

### Order
- User, vendor, driver references
- Items with quantities
- Status workflow (pending → accepted → preparing → ready → assigned → on_the_way → delivered)
- Payment method and status
- Delivery address and pickup address
- Real-time rider location
- Customer ratings

### Driver/Rider
- User reference
- Vehicle information
- Online/available status
- Current location
- Earnings (today, total, payout history)
- Ratings and reviews

## Order Workflow

1. User browses restaurant menu
2. User adds items to cart
3. User places order
4. Restaurant receives notification (Socket.io)
5. Restaurant accepts/rejects order
6. Restaurant updates status (preparing → ready)
7. Admin or system assigns delivery rider
8. Rider accepts delivery
9. Rider picks up order
10. Rider delivers order with real-time tracking
11. Order completed
12. User rates restaurant and delivery rider

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Orders
- `GET /api/orders` - Get orders (role-based filtering)
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order from cart
- `PATCH /api/orders/:id/status` - Update order status
- `PATCH /api/orders/:id/assign-rider` - Assign rider (admin)
- `POST /api/orders/:id/rider-location` - Update rider location
- `POST /api/orders/:id/rate` - Rate order

### Menu
- `GET /api/menu` - Get menu items
- `GET /api/menu/:id` - Get single item
- `POST /api/menu` - Create item (vendor)
- `PATCH /api/menu/:id` - Update item (vendor)
- `DELETE /api/menu/:id` - Delete item (vendor)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PATCH /api/cart/item/:itemId` - Update item quantity
- `DELETE /api/cart/item/:itemId` - Remove item
- `DELETE /api/cart/clear` - Clear cart

### Vendors
- `GET /api/vendors` - List vendors
- `GET /api/vendors/:id` - Get vendor details
- `GET /api/vendors/:id/orders` - Get vendor orders
- `GET /api/vendors/:id/menu` - Get vendor menu
- `PATCH /api/vendors/:id/status` - Update open/close status
- `GET /api/vendors/:id/reports` - Get earnings reports

### Riders
- `GET /api/riders` - List riders (admin)
- `GET /api/riders/profile` - Get rider profile
- `GET /api/riders/available-orders` - Get available orders
- `GET /api/riders/active-deliveries` - Get active deliveries
- `POST /api/riders/accept-delivery/:orderId` - Accept order
- `PATCH /api/riders/status` - Update online/offline
- `POST /api/riders/location` - Update location
- `GET /api/riders/earnings` - Get earnings
- `GET /api/riders/history` - Get delivery history

### Admin
- `GET /api/admin/dashboard` - Dashboard analytics
- `GET /api/admin/orders-heatmap` - Orders heatmap data
- `GET /api/admin/users` - List users
- `GET /api/admin/vendors` - List vendors
- `GET /api/admin/riders` - List riders
- `GET /api/admin/pricing` - Get service pricing
- `PATCH /api/admin/pricing` - Update pricing
- `GET /api/admin/promo-codes` - List promo codes
- `POST /api/admin/promo-codes` - Create promo code
- `PATCH /api/admin/promo-codes/:id` - Update promo code
- `DELETE /api/admin/promo-codes/:id` - Delete promo code

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Setup Instructions

### Backend
1. Navigate to `server` directory
2. Install dependencies: `npm install`
3. Create `.env` file with required variables
4. Start server: `npm run dev` (or `npm start`)

### Frontend
1. Navigate to `client` directory
2. Install dependencies: `npm install`
3. Create `.env` file with required variables
4. Start dev server: `npm run dev`

## File Structure

```
server/
├── models/          # Mongoose models
├── routes/          # API routes
├── middleware/      # Auth, upload middleware
├── uploads/         # Uploaded files
└── index.js         # Server entry point

client/
├── src/
│   ├── components/  # Reusable components
│   │   ├── layout/  # Layout components
│   │   └── ui/      # UI components
│   ├── context/     # React contexts (Auth, Socket)
│   ├── pages/       # Page components
│   │   └── dashboard/ # Dashboard pages
│   ├── services/    # API service
│   └── App.tsx      # Main app component
```

## Next Steps / Enhancements

1. **Google Maps Integration**
   - Add `@react-google-maps/api` components
   - Implement location picker
   - Real-time order tracking map
   - Distance calculation

2. **SMS OTP Verification**
   - Integrate SMS service (Twilio, etc.)
   - Add OTP generation and verification endpoints
   - Update signup flow

3. **Payment Integration**
   - Integrate payment gateway (Stripe, PayPal, etc.)
   - Handle payment callbacks
   - Payment history

4. **Multilingual Support**
   - Add i18n library (react-i18next)
   - Create translation files
   - Language switcher

5. **Additional Features**
   - Push notifications
   - Email notifications
   - Advanced analytics charts
   - Surge pricing algorithm
   - Automated rider assignment
   - Review moderation

## Notes

- All routes are protected with authentication middleware
- Role-based access control implemented
- Real-time updates via Socket.io
- File uploads handled with Multer
- Responsive design with TailwindCSS
- TypeScript for type safety

## License
This is a complete food delivery platform implementation.
