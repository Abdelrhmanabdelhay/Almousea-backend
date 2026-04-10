# Almousea API Documentation

A complete backend API for managing projects and media content with authentication and authorization.

## 📋 Table of Contents

- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Seed Data](#seed-data)
- [API Routes](#api-routes)
  - [Authentication Routes](#authentication-routes)
  - [Project Routes](#project-routes)
  - [Media Center Routes](#media-center-routes)
- [Testing the API](#testing-the-api)
- [Authentication Flow](#authentication-flow)

---

## 🚀 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Steps

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/almousea.git
   cd almousea
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables (see [Environment Setup](#environment-setup))

5. Start the server
   ```bash
   npm run dev
   ```

The API will run on `http://localhost:5000`

---

## 🔧 Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGO_URI=mongodb://localhost:27017/almousea

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Admin (for seeding)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# Email (for password reset)
RESEND_API_KEY=your_resend_api_key
```

---

## 🌱 Seed Data

### Seed Admin User

The application uses role-based authentication. You need to create an admin user before doing anything else.

#### Command

```bash
node seedAdmin.js --seed
```

#### Requirements
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` must be set in `.env`
- `NODE_ENV` cannot be `production`
- `--seed` flag is required for security

#### Example

```bash
# .env
ADMIN_EMAIL=admin@almousea.com
ADMIN_PASSWORD=securePassword123

# Terminal
node seedAdmin.js --seed
```

You'll see: ✅ Admin created

---

## 📡 API Routes

### Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication Routes

### 1. Login

**Endpoint:** `POST /api/auth/login`

**Description:** User login to get JWT token

**Body:**
```json
{
  "email": "admin@almousea.com",
  "password": "securePassword123"
}
```

**Response:** ✅ 200 OK
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@almousea.com",
    "password": "securePassword123"
  }'
```

---

### 2. Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`

**Description:** Request password reset link (sent to email)

**Body:**
```json
{
  "email": "admin@almousea.com"
}
```

**Response:** ✅ 200 OK
```json
{
  "success": true,
  "message": "Reset link was sent"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@almousea.com"}'
```

---

### 3. Reset Password

**Endpoint:** `POST /api/auth/reset-password`

**Description:** Reset password using token from email

**Body:**
```json
{
  "token": "reset_token_from_email",
  "password": "newPassword123"
}
```

**Response:** ✅ 200 OK
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "token_from_email",
    "password": "newPassword123"
  }'
```

---

## 📁 Project Routes

### Authorization
All project routes require authentication. Include the token:
```
Authorization: Bearer <token>
```

### 1. Create Project

**Endpoint:** `POST /api/projects`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Modern Residential Complex",
  "image": "https://example.com/project1.jpg",
  "description": "A state-of-the-art residential complex with modern amenities and sustainable design.",
  "location": "Cairo, Egypt",
  "numberOfLocations": 3,
  "area": "50,000 sqm",
  "facilities": ["Swimming Pool", "Gym", "Parking", "Security"]
}
```

**Response:** ✅ 201 Created
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Modern Residential Complex",
    "image": "https://example.com/project1.jpg",
    "description": "A state-of-the-art residential complex with modern amenities and sustainable design.",
    "location": "Cairo, Egypt",
    "numberOfLocations": 3,
    "area": "50,000 sqm",
    "facilities": ["Swimming Pool", "Gym", "Parking", "Security"],
    "createdAt": "2026-04-10T10:30:00Z",
    "updatedAt": "2026-04-10T10:30:00Z"
  },
  "message": "Project created successfully"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Modern Residential Complex",
    "image": "https://example.com/project1.jpg",
    "description": "A state-of-the-art residential complex with modern amenities and sustainable design.",
    "location": "Cairo, Egypt",
    "numberOfLocations": 3,
    "area": "50,000 sqm",
    "facilities": ["Swimming Pool", "Gym", "Parking", "Security"]
  }'
```

---

### 2. Get All Projects

**Endpoint:** `GET /api/projects`

**Headers:**
```
Content-Type: application/json
```

**Response:** ✅ 200 OK
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Modern Residential Complex",
      "image": "https://example.com/project1.jpg",
      "description": "A state-of-the-art residential complex...",
      "location": "Cairo, Egypt",
      "numberOfLocations": 3,
      "area": "50,000 sqm",
      "facilities": ["Swimming Pool", "Gym", "Parking", "Security"],
      "createdAt": "2026-04-10T10:30:00Z",
      "updatedAt": "2026-04-10T10:30:00Z"
    }
  ],
  "message": "Projects retrieved successfully"
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Content-Type: application/json"
```

---

### 3. Get Project by ID

**Endpoint:** `GET /api/projects/:id`

**Response:** ✅ 200 OK
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Modern Residential Complex",
    ...
  },
  "message": "Project retrieved successfully"
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/projects/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json"
```

---

### 4. Update Project

**Endpoint:** `PUT /api/projects/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Updated Project Title",
  "image": "https://example.com/new-image.jpg",
  "description": "Updated description",
  "location": "Cairo, Egypt",
  "numberOfLocations": 4,
  "area": "60,000 sqm",
  "facilities": ["Swimming Pool", "Gym", "Parking", "Security", "Garden"]
}
```

**Response:** ✅ 200 OK
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Project Title",
    ...
  },
  "message": "Project updated successfully"
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/projects/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Project Title",
    "image": "https://example.com/new-image.jpg",
    "description": "Updated description",
    "location": "Cairo, Egypt",
    "numberOfLocations": 4,
    "area": "60,000 sqm",
    "facilities": ["Swimming Pool", "Gym", "Parking", "Security", "Garden"]
  }'
```

---

### 5. Delete Project

**Endpoint:** `DELETE /api/projects/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** ✅ 200 OK
```json
{
  "message": "Project deleted successfully"
}
```

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/projects/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎬 Media Center Routes

### Authorization
All media routes require authentication except GET endpoints. Include the token:
```
Authorization: Bearer <token>
```

### 1. Create Media Item

**Endpoint:** `POST /api/media`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Project Gallery 2026",
  "description": "Collection of photos and videos from our latest project showcase.",
  "photos": [
    {
      "url": "https://example.com/photo1.jpg",
      "caption": "Front view of the main building"
    },
    {
      "url": "https://example.com/photo2.jpg",
      "caption": "Swimming pool area"
    }
  ],
  "videos": [
    {
      "url": "https://example.com/video1.mp4",
      "caption": "Project overview video"
    }
  ]
}
```

**Response:** ✅ 201 Created
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Project Gallery 2026",
  "description": "Collection of photos and videos from our latest project showcase.",
  "photos": [
    {
      "url": "https://example.com/photo1.jpg",
      "caption": "Front view of the main building"
    },
    {
      "url": "https://example.com/photo2.jpg",
      "caption": "Swimming pool area"
    }
  ],
  "videos": [
    {
      "url": "https://example.com/video1.mp4",
      "caption": "Project overview video"
    }
  ],
  "createdAt": "2026-04-10T11:00:00Z",
  "updatedAt": "2026-04-10T11:00:00Z"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/media \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Project Gallery 2026",
    "description": "Collection of photos and videos from our latest project showcase.",
    "photos": [
      {
        "url": "https://example.com/photo1.jpg",
        "caption": "Front view of the main building"
      },
      {
        "url": "https://example.com/photo2.jpg",
        "caption": "Swimming pool area"
      }
    ],
    "videos": [
      {
        "url": "https://example.com/video1.mp4",
        "caption": "Project overview video"
      }
    ]
  }'
```

---

### 2. Get All Media Items

**Endpoint:** `GET /api/media`

**Response:** ✅ 200 OK
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Project Gallery 2026",
      "description": "Collection of photos and videos from our latest project showcase.",
      "photos": [...],
      "videos": [...],
      "createdAt": "2026-04-10T11:00:00Z",
      "updatedAt": "2026-04-10T11:00:00Z"
    }
  ],
  "message": "Media items retrieved successfully"
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/media \
  -H "Content-Type: application/json"
```

---

### 3. Get Media Item by ID

**Endpoint:** `GET /api/media/:id`

**Response:** ✅ 200 OK
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Project Gallery 2026",
    ...
  },
  "message": "Media item retrieved successfully"
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/media/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json"
```

---

### 4. Update Media Item

**Endpoint:** `PUT /api/media/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Updated Gallery",
  "description": "Updated description",
  "photos": [
    {
      "url": "https://example.com/new-photo.jpg",
      "caption": "New photo"
    }
  ],
  "videos": []
}
```

**Response:** ✅ 200 OK
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Updated Gallery",
    ...
  },
  "message": "Media item updated successfully"
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/media/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Gallery",
    "description": "Updated description",
    "photos": [
      {
        "url": "https://example.com/new-photo.jpg",
        "caption": "New photo"
      }
    ],
    "videos": []
  }'
```

---

### 5. Delete Media Item

**Endpoint:** `DELETE /api/media/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** ✅ 200 OK
```json
{
  "message": "Media item deleted successfully"
}
```

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/media/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📞 Contact Routes

### Authorization
Contact submission is public (anyone can contact you), but viewing/managing contacts requires authentication (admin only).

### 1. Submit Contact Form

**Endpoint:** `POST /api/contacts`

**Description:** Submit a contact form message (public access)

**Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Project Inquiry",
  "message": "I am interested in your residential complex project. Please provide more details about pricing and availability.",
  "phone": "+201234567890"
}
```

**Response:** ✅ 201 Created
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Project Inquiry",
    "message": "I am interested in your residential complex project...",
    "phone": "+201234567890",
    "status": "pending",
    "createdAt": "2026-04-10T16:00:00Z",
    "updatedAt": "2026-04-10T16:00:00Z"
  },
  "message": "Contact message sent successfully"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Project Inquiry",
    "message": "I am interested in your residential complex project. Please provide more details about pricing and availability.",
    "phone": "+201234567890"
  }'
```

---

### 2. Get All Contacts

**Endpoint:** `GET /api/contacts`

**Headers:**
```
Authorization: Bearer <token>
```

**Description:** Get all contact messages (admin only)

**Response:** ✅ 200 OK
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "subject": "Project Inquiry",
      "message": "I am interested in your residential complex...",
      "phone": "+201234567890",
      "status": "pending",
      "createdAt": "2026-04-10T16:00:00Z",
      "updatedAt": "2026-04-10T16:00:00Z"
    }
  ],
  "message": "Contacts retrieved successfully"
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 3. Get Contact by ID

**Endpoint:** `GET /api/contacts/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Description:** Get a specific contact message (admin only)

**Response:** ✅ 200 OK
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "John Doe",
    ...
  },
  "message": "Contact retrieved successfully"
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/contacts/507f1f77bcf86cd799439013 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 4. Update Contact

**Endpoint:** `PUT /api/contacts/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Description:** Update contact status or details (admin only)

**Body:**
```json
{
  "status": "read"
}
```

**Response:** ✅ 200 OK
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "John Doe",
    "status": "read",
    ...
  },
  "message": "Contact updated successfully"
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/contacts/507f1f77bcf86cd799439013 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"status": "read"}'
```

---

### 5. Delete Contact

**Endpoint:** `DELETE /api/contacts/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Description:** Delete a contact message (admin only)

**Response:** ✅ 200 OK
```json
{
  "message": "Contact deleted successfully"
}
```

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/contacts/507f1f77bcf86cd799439013 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🧪 Testing the API


### Using Postman

1. **Download Postman** from https://www.postman.com/downloads/

2. **Import Collection** (or create manually):
   - Create a new collection: `Almousea API`
   - Add requests for each endpoint

3. **Authentication Setup**:
   - Login first to get the token
   - Copy the token from response
   - In each request header, add: `Authorization: Bearer <token>`

### Using cURL

All examples are provided in the route documentation above.

### Using Thunder Client (VS Code Extension)

1. Install Thunder Client from VS Code extensions
2. Create requests using the cURL examples
3. Store the token in environment variables

### Using Insomnia

1. Download from https://insomnia.rest/
2. Create requests similar to Postman
3. Use token management for authorization

---

## 🔄 Authentication Flow

### Step-by-Step Flow

```
1. Admin User Created
   └─> Run: node seedAdmin.js --seed
       Creates admin account with ADMIN_EMAIL and ADMIN_PASSWORD

2. Login
   └─> POST /api/auth/login
       Send email + password
       Receive JWT token

3. Use Token
   └─> Include in all authenticated requests:
       Header: Authorization: Bearer <token>

4. Create/Update/Delete Resources
   └─> Use token to create projects and media
       All write operations require authentication

5. Password Reset (if needed)
   └─> POST /api/auth/forgot-password (send email)
   └─> POST /api/auth/reset-password (update password)
```

### Example Complete Workflow

```bash
# 1. Seed admin
node seedAdmin.js --seed

# 2. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@almousea.com","password":"securePassword123"}'

# Response: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }

# 3. Save token to variable
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 4. Create a project
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "image": "https://example.com/img.jpg",
    "description": "Project description here",
    "location": "Cairo",
    "numberOfLocations": 2,
    "area": "1000 sqm",
    "facilities": ["Pool", "Gym"]
  }'

# 5. Create media
curl -X POST http://localhost:5000/api/media \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Gallery",
    "description": "Photo and video gallery",
    "photos": [{"url": "https://example.com/photo.jpg", "caption": "Photo"}],
    "videos": []
  }'

# 6. Get all data
curl -X GET http://localhost:5000/api/projects
curl -X GET http://localhost:5000/api/media
```

---

## 📝 Notes

- **Authentication**: Only `POST /api/auth/login` doesn't require token. All auth routes require validation.
- **GET endpoints**: Public access (no token needed)
- **Create/Update/Delete**: Require authentication token
- **Validation**: All requests are validated using Joi schemas
- **Error Handling**: Errors return appropriate HTTP status codes with messages

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Unauthorized" | Check token is valid and included in Authorization header |
| "Validation Error" | Check request body matches the schema |
| "Media item not found" | Verify the ID is correct |
| "Admin already exists" | Remove existing admin or use different email |
| "Missing admin credentials" | Check ADMIN_EMAIL and ADMIN_PASSWORD in .env |

---

## 📚 GitHub Repository Structure

```
almousea/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── auth.controller.js    # Auth logic
│   ├── project.controller.js # Project CRUD handlers
│   └── media.controller.js   # Media CRUD handlers
├── routes/
│   ├── auth.routes.js        # Auth endpoints
│   ├── project.routes.js     # Project endpoints
│   └── media.routes.js       # Media endpoints
├── services/
│   ├── auth.service.js       # Auth business logic
│   ├── project.service.js    # Project database ops
│   └── media.service.js      # Media database ops
├── models/
│   ├── user.model.js         # User schema
│   ├── project.model.js      # Project schema
│   └── media.model.js        # Media schema
├── validators/
│   ├── auth.validator.js     # Auth validation
│   ├── project.validator.js  # Project validation
│   └── media.validator.js    # Media validation
├── middlewares/
│   ├── auth.middleware.js    # JWT verification
│   ├── validate.middleware.js # Request validation
│   └── error.middleware.js   # Error handling
├── utils/
│   ├── generateToken.js      # JWT generation
│   ├── hash.js               # Password hashing
│   └── sendEmail.js          # Email sending
├── .env                      # Environment variables
├── .gitignore               # Git ignore rules
├── index.js                 # Express app setup
├── service.js               # Server entry point
├── seedAdmin.js             # Admin seeding script
├── package.json             # Dependencies
└── README.md               # This file
```

---

## 📄 License

ISC

**Created on:** April 10, 2026
