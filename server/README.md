# Kushina Backend Server

Backend API server for the Kushina platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kushina?retryWrites=true&w=majority
NODE_ENV=development
JWT_SECRET=your-secret-key-change-this-in-production
```

**For MongoDB Atlas (Cloud):**
- Replace `username` and `password` with your MongoDB Atlas credentials
- Replace `cluster` with your cluster name
- Make sure your IP address is whitelisted in MongoDB Atlas Network Access settings

**For Local MongoDB:**
- Use: `mongodb://localhost:27017/kushina`

3. Make sure MongoDB is running on your system.

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User sign up

### Registration
- `POST /api/registration/submit` - Submit service provider/seeker registration

### Women Initiatives
- `POST /api/women-initiatives/submit` - Submit women initiatives application

### Diaspora Community
- `POST /api/diaspora-community/submit` - Submit diaspora community subscription

### Professional Community
- `POST /api/professional-community/submit` - Submit professional community application

### Premium Community
- `POST /api/premium-community/submit` - Submit premium community request

### Invest/Partner
- `POST /api/invest-partner/submit` - Submit invest/partner application

### Health Check
- `GET /api/health` - Server health check

## File Uploads

All file uploads are stored in the `uploads/` directory. Maximum file size is 100MB.

Accepted file types:
- Images: JPG, PNG, GIF
- Documents: PDF, DOC, DOCX
- Videos: MP4, MOV, AVI, WEBM, MKV

## Database Models

- User
- Registration
- WomenInitiatives
- DiasporaCommunity
- ProfessionalCommunity
- PremiumCommunity
- InvestPartner
