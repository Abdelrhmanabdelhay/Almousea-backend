# Quick Start Guide

Get Almousea API running in 5 minutes.

## ⚡ Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy and configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and credentials

# 3. Seed admin user
node seedAdmin.js --seed

# 4. Start server
npm run dev
```

Server runs on `http://localhost:5000`

---

## 🔑 Quick Test (Copy & Paste)

### 1. Login & Get Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@almousea.com",
    "password": "securePassword123"
  }'
```
Save the `token` from response.

### 2. Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "image": "https://via.placeholder.com/400",
    "description": "A beautiful project with amazing facilities",
    "location": "Cairo, Egypt",
    "numberOfLocations": 2,
    "area": "5000 sqm",
    "facilities": ["Pool", "Gym"]
  }'
```

### 3. View Projects
```bash
curl http://localhost:5000/api/projects
```

### 4. Create Media Gallery
```bash
curl -X POST http://localhost:5000/api/media \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Photo Gallery",
    "description": "Beautiful project photos and videos",
    "photos": [
      {"url": "https://via.placeholder.com/400", "caption": "Main building"}
    ],
    "videos": [
      {"url": "https://example.com/video.mp4", "caption": "Project tour"}
    ]
  }'
```

### 5. View Media
```bash
curl http://localhost:5000/api/media
```

### 6. Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I am interested in your projects. Please contact me.",
    "phone": "+201234567890"
  }'
```

### 7. View Contacts (Admin Only)
```bash
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📚 Route Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/auth/login` | ❌ | Get JWT token |
| POST | `/api/auth/forgot-password` | ❌ | Request password reset |
| POST | `/api/auth/reset-password` | ❌ | Reset password |
| POST | `/api/projects` | ✅ | Create project |
| GET | `/api/projects` | ❌ | List all projects |
| GET | `/api/projects/:id` | ❌ | Get one project |
| PUT | `/api/projects/:id` | ✅ | Update project |
| DELETE | `/api/projects/:id` | ✅ | Delete project |
| POST | `/api/media` | ✅ | Create media |
| GET | `/api/media` | ❌ | List all media |
| GET | `/api/media/:id` | ❌ | Get one media |
| PUT | `/api/media/:id` | ✅ | Update media |
| DELETE | `/api/media/:id` | ✅ | Delete media |
| POST | `/api/contacts` | ❌ | Submit contact form |
| GET | `/api/contacts` | ✅ | List all contacts (admin) |
| GET | `/api/contacts/:id` | ✅ | Get one contact (admin) |
| PUT | `/api/contacts/:id` | ✅ | Update contact (admin) |
| DELETE | `/api/contacts/:id` | ✅ | Delete contact (admin) |

---

## 🧪 Testing Tools

- **Postman:** https://postman.com
- **Insomnia:** https://insomnia.rest
- **Thunder Client:** VS Code extension
- **cURL:** Command line (examples provided)

---

## ❓ Troubleshooting

| Error | Fix |
|-------|-----|
| `Cannot GET /api/media` | Server not running: `npm run dev` |
| `Unauthorized` | Token missing/expired. Re-login and use new token |
| `Validation Error` | Check request body matches schema |
| `Admin already exists` | Edit .env with different email and re-seed |

---

For detailed documentation, see [README.md](README.md)
