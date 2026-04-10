# API Testing Guide

Complete guide to testing all Almousea API endpoints.

## 🧪 Test Tools Setup

### Option 1: Postman (Recommended)

1. **Download:** https://www.postman.com/downloads/
2. **Import Collection:**
   - Click "Import"
   - Paste the collection JSON (see below)
3. **Set Environment Variables:**
   - Click "Environments"
   - Create new environment
   - Add variables (see below)

### Option 2: Insomnia

1. **Download:** https://insomnia.rest/
2. **Create Workspace:** `Almousea API`
3. **Create Requests:** Use examples below

### Option 3: Thunder Client (VS Code)

1. **Install:** Search "Thunder Client" in VS Code Extensions
2. **Create Collection:** Click "New Collection"
3. **Add Requests:** Use cURL examples below

### Option 4: cURL (Command Line)

Use examples directly in terminal.

---

## 🔑 Environment Variables

Create these in your testing tool:

```
{
  "base_url": "http://localhost:5000/api",
  "token": "",
  "admin_email": "admin@almousea.com",
  "admin_password": "securePassword123"
}
```

---

## ✅ Complete Test Scenarios

### Scenario 1: Authentication Flow

#### Test 1.1: Login
**Endpoint:** `POST {{base_url}}/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "{{admin_email}}",
  "password": "{{admin_password}}"
}
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

**Test Steps:**
1. Send request
2. Copy token from response
3. Save to environment variable `token`

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

#### Test 1.2: Invalid Credentials
**Endpoint:** `POST {{base_url}}/auth/login`

**Body:**
```json
{
  "email": "admin@almousea.com",
  "password": "wrongpassword"
}
```

**Expected Response:** 401 Unauthorized

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@almousea.com",
    "password": "wrongpassword"
  }'
```

---

#### Test 1.3: Forgot Password
**Endpoint:** `POST {{base_url}}/auth/forgot-password`

**Body:**
```json
{
  "email": "admin@almousea.com"
}
```

**Expected Response:** 200 OK
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

### Scenario 2: Project CRUD

#### Test 2.1: Create Project
**Endpoint:** `POST {{base_url}}/projects`

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Test Project Alpha",
  "image": "https://via.placeholder.com/400x300?text=Project",
  "description": "A comprehensive test project with modern facilities and sustainable design principles.",
  "location": "Cairo, Egypt",
  "numberOfLocations": 3,
  "area": "50000 sqm",
  "facilities": ["Swimming Pool", "Fitness Center", "Parking", "Security", "Garden"]
}
```

**Expected Response:** 201 Created
```json
{
  "success": true,
  "data": {
    "_id": "660abc123def456789ghij",
    "title": "Test Project Alpha",
    "image": "https://via.placeholder.com/400x300?text=Project",
    "description": "A comprehensive test project...",
    "location": "Cairo, Egypt",
    "numberOfLocations": 3,
    "area": "50000 sqm",
    "facilities": ["Swimming Pool", "Fitness Center", "Parking", "Security", "Garden"],
    "createdAt": "2026-04-10T14:30:00.000Z",
    "updatedAt": "2026-04-10T14:30:00.000Z"
  },
  "message": "Project created successfully"
}
```

**Save:** Copy `_id` to `project_id` environment variable

**cURL:**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project Alpha",
    "image": "https://via.placeholder.com/400x300?text=Project",
    "description": "A comprehensive test project with modern facilities and sustainable design principles.",
    "location": "Cairo, Egypt",
    "numberOfLocations": 3,
    "area": "50000 sqm",
    "facilities": ["Swimming Pool", "Fitness Center", "Parking", "Security", "Garden"]
  }'
```

---

#### Test 2.2: Get All Projects
**Endpoint:** `GET {{base_url}}/projects`

**Headers:**
```
Content-Type: application/json
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "_id": "660abc123def456789ghij",
      "title": "Test Project Alpha",
      ...
    }
  ],
  "message": "Projects retrieved successfully"
}
```

**cURL:**
```bash
curl http://localhost:5000/api/projects
```

---

#### Test 2.3: Get Single Project
**Endpoint:** `GET {{base_url}}/projects/{{project_id}}`

**Expected Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "_id": "660abc123def456789ghij",
    "title": "Test Project Alpha",
    ...
  },
  "message": "Project retrieved successfully"
}
```

**cURL:**
```bash
curl http://localhost:5000/api/projects/660abc123def456789ghij
```

---

#### Test 2.4: Update Project
**Endpoint:** `PUT {{base_url}}/projects/{{project_id}}`

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Test Project Alpha - Updated",
  "image": "https://via.placeholder.com/400x300?text=Updated",
  "description": "Updated description with new information.",
  "location": "Cairo, Egypt",
  "numberOfLocations": 4,
  "area": "60000 sqm",
  "facilities": ["Swimming Pool", "Fitness Center", "Parking", "Security", "Garden", "Restaurant"]
}
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "_id": "660abc123def456789ghij",
    "title": "Test Project Alpha - Updated",
    ...
  },
  "message": "Project updated successfully"
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/projects/660abc123def456789ghij \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project Alpha - Updated",
    "image": "https://via.placeholder.com/400x300?text=Updated",
    "description": "Updated description with new information.",
    "location": "Cairo, Egypt",
    "numberOfLocations": 4,
    "area": "60000 sqm",
    "facilities": ["Swimming Pool", "Fitness Center", "Parking", "Security", "Garden", "Restaurant"]
  }'
```

---

#### Test 2.5: Delete Project
**Endpoint:** `DELETE {{base_url}}/projects/{{project_id}}`

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response:** 200 OK
```json
{
  "message": "Project deleted successfully"
}
```

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/projects/660abc123def456789ghij \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

#### Test 2.6: Invalid Project ID
**Endpoint:** `GET {{base_url}}/projects/invalid-id`

**Expected Response:** 500 Internal Server Error or Custom Error

---

### Scenario 3: Media Center CRUD

#### Test 3.1: Create Media
**Endpoint:** `POST {{base_url}}/media`

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Project Gallery 2026",
  "description": "Complete collection of photos and videos showcasing our latest project developments and architectural features.",
  "photos": [
    {
      "url": "https://via.placeholder.com/600x400?text=Photo1",
      "caption": "Main entrance with modern architecture"
    },
    {
      "url": "https://via.placeholder.com/600x400?text=Photo2",
      "caption": "Swimming pool area with sunset view"
    },
    {
      "url": "https://via.placeholder.com/600x400?text=Photo3",
      "caption": "Interior luxury design"
    }
  ],
  "videos": [
    {
      "url": "https://www.youtube.com/embed/VID1",
      "caption": "Project overview - 3D drone tour"
    },
    {
      "url": "https://www.youtube.com/embed/VID2",
      "caption": "Construction time-lapse"
    }
  ]
}
```

**Expected Response:** 201 Created
```json
{
  "_id": "660xyz789ijk012mnopqr",
  "title": "Project Gallery 2026",
  "description": "Complete collection of photos and videos...",
  "photos": [...],
  "videos": [...],
  "createdAt": "2026-04-10T15:00:00.000Z",
  "updatedAt": "2026-04-10T15:00:00.000Z"
}
```

**Save:** Copy `_id` to `media_id` environment variable

**cURL:**
```bash
curl -X POST http://localhost:5000/api/media \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Project Gallery 2026",
    "description": "Complete collection of photos and videos showcasing our latest project developments and architectural features.",
    "photos": [
      {"url": "https://via.placeholder.com/600x400?text=Photo1", "caption": "Main entrance"},
      {"url": "https://via.placeholder.com/600x400?text=Photo2", "caption": "Pool area"},
      {"url": "https://via.placeholder.com/600x400?text=Photo3", "caption": "Interior design"}
    ],
    "videos": [
      {"url": "https://youtube.com/embed/VID1", "caption": "3D drone tour"},
      {"url": "https://youtube.com/embed/VID2", "caption": "Time-lapse"}
    ]
  }'
```

---

#### Test 3.2: Get All Media
**Endpoint:** `GET {{base_url}}/media`

**Expected Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "_id": "660xyz789ijk012mnopqr",
      "title": "Project Gallery 2026",
      ...
    }
  ],
  "message": "Media items retrieved successfully"
}
```

**cURL:**
```bash
curl http://localhost:5000/api/media
```

---

#### Test 3.3: Get Single Media
**Endpoint:** `GET {{base_url}}/media/{{media_id}}`

**Expected Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "_id": "660xyz789ijk012mnopqr",
    "title": "Project Gallery 2026",
    ...
  },
  "message": "Media item retrieved successfully"
}
```

**cURL:**
```bash
curl http://localhost:5000/api/media/660xyz789ijk012mnopqr
```

---

#### Test 3.4: Update Media
**Endpoint:** `PUT {{base_url}}/media/{{media_id}}`

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Updated Gallery Title",
  "description": "Updated description with new photos",
  "photos": [
    {
      "url": "https://via.placeholder.com/600x400?text=NewPhoto",
      "caption": "New added photo"
    }
  ],
  "videos": []
}
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "_id": "660xyz789ijk012mnopqr",
    "title": "Updated Gallery Title",
    ...
  },
  "message": "Media item updated successfully"
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/media/660xyz789ijk012mnopqr \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Gallery Title",
    "description": "Updated description with new photos",
    "photos": [{"url": "https://via.placeholder.com/600x400?text=NewPhoto", "caption": "New photo"}],
    "videos": []
  }'
```

---

#### Test 3.5: Delete Media
**Endpoint:** `DELETE {{base_url}}/media/{{media_id}}`

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response:** 200 OK
```json
{
  "message": "Media item deleted successfully"
}
```

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/media/660xyz789ijk012mnopqr \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📞 Scenario 4: Contact Form CRUD

#### Test 4.1: Submit Contact Form (Public)
**Endpoint:** `POST {{base_url}}/contacts`

**Description:** Anyone can submit contact form without authentication

**Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "subject": "Partnership Inquiry",
  "message": "Hello, I am interested in partnering with your company for a new residential project in Alexandria. Please contact me to discuss the details.",
  "phone": "+201234567890"
}
```

**Expected Response:** 201 Created
```json
{
  "success": true,
  "data": {
    "_id": "660abc123def456789ghijk",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "subject": "Partnership Inquiry",
    "message": "Hello, I am interested in partnering...",
    "phone": "+201234567890",
    "status": "pending",
    "createdAt": "2026-04-10T17:00:00.000Z",
    "updatedAt": "2026-04-10T17:00:00.000Z"
  },
  "message": "Contact message sent successfully"
}
```

**Save:** Copy `_id` to `contact_id` environment variable

**cURL:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "subject": "Partnership Inquiry",
    "message": "Hello, I am interested in partnering with your company for a new residential project in Alexandria. Please contact me to discuss the details.",
    "phone": "+201234567890"
  }'
```

---

#### Test 4.2: Get All Contacts (Admin Only)
**Endpoint:** `GET {{base_url}}/contacts`

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "_id": "660abc123def456789ghijk",
      "name": "John Smith",
      "email": "john.smith@example.com",
      "subject": "Partnership Inquiry",
      "message": "Hello, I am interested in partnering...",
      "phone": "+201234567890",
      "status": "pending",
      "createdAt": "2026-04-10T17:00:00.000Z",
      "updatedAt": "2026-04-10T17:00:00.000Z"
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

#### Test 4.3: Get Single Contact (Admin Only)
**Endpoint:** `GET {{base_url}}/contacts/{{contact_id}}`

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response:** 200 OK

**cURL:**
```bash
curl -X GET http://localhost:5000/api/contacts/660abc123def456789ghijk \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

#### Test 4.4: Update Contact Status (Admin Only)
**Endpoint:** `PUT {{base_url}}/contacts/{{contact_id}}`

**Headers:**
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body:**
```json
{
  "status": "read"
}
```

**Expected Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "_id": "660abc123def456789ghijk",
    "name": "John Smith",
    "status": "read",
    ...
  },
  "message": "Contact updated successfully"
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/contacts/660abc123def456789ghijk \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"status": "read"}'
```

---

#### Test 4.5: Delete Contact (Admin Only)
**Endpoint:** `DELETE {{base_url}}/contacts/{{contact_id}}`

**Headers:**
```
Authorization: Bearer {{token}}
```

**Expected Response:** 200 OK
```json
{
  "message": "Contact deleted successfully"
}
```

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/contacts/660abc123def456789ghijk \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

#### Test 4.6: Submit Contact Without Phone
**Endpoint:** `POST {{base_url}}/contacts`

**Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "subject": "General Inquiry",
  "message": "I would like to know more about your services."
}
```

**Expected Response:** 201 Created (phone is optional)

---

#### Test 4.7: Submit Contact With Invalid Email
**Endpoint:** `POST {{base_url}}/contacts`

**Body:**
```json
{
  "name": "Invalid User",
  "email": "invalid-email",
  "subject": "Test",
  "message": "This should fail validation."
}
```

**Expected Response:** 400 Bad Request

---

## ❌ Error Testing


### Test: Missing Required Fields
**Endpoint:** `POST {{base_url}}/projects`

**Body (invalid):**
```json
{
  "title": "Incomplete Project"
}
```

**Expected Response:** 400 Bad Request
```json
{
  "message": "Validation Error",
  "errors": ["image is required", "description is required", ...]
}
```

---

### Test: Unauthorized Access
**Endpoint:** `POST {{base_url}}/projects`

**Headers (no token):**
```
Content-Type: application/json
```

**Expected Response:** 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

---

### Test: Invalid Token
**Endpoint:** `POST {{base_url}}/projects`

**Headers:**
```
Authorization: Bearer invalid_token_here
Content-Type: application/json
```

**Expected Response:** 401 Unauthorized

---

### Test: Non-existent Resource
**Endpoint:** `GET {{base_url}}/projects/999999999999999999999999`

**Expected Response:** 404 Not Found or null

---

## 🔄 Full Test Run Checklist

- [ ] **Authentication:**
  - [ ] Login succeeds with correct credentials
  - [ ] Login fails with wrong password
  - [ ] Forgot password sends email
  - [ ] Invalid token rejected

- [ ] **Projects:**
  - [ ] Create project (with token)
  - [ ] Create fails without token
  - [ ] Get all projects
  - [ ] Get single project
  - [ ] Update project (with token)
  - [ ] Delete project (with token)

- [ ] **Media:**
  - [ ] Create media with photos
  - [ ] Create media with videos
  - [ ] Create media with both
  - [ ] Create fails with only title/description
  - [ ] Get all media
  - [ ] Get single media
  - [ ] Update media
  - [ ] Delete media

- [ ] **Contacts:**
  - [ ] Submit contact form (public)
  - [ ] Submit contact without phone (optional)
  - [ ] Submit contact with invalid email (fails)
  - [ ] Get all contacts (admin only)
  - [ ] Get single contact (admin only)
  - [ ] Update contact status (admin only)
  - [ ] Delete contact (admin only)
  - [ ] Public access to admin routes fails

- [ ] **Error Handling:**
  - [ ] Invalid IDs return errors
  - [ ] Missing fields return 400
  - [ ] No token returns 401
  - [ ] Invalid token returns 401

---

## 📊 Performance Testing

### Load Testing with Apache Bench

```bash
# 100 requests, 10 concurrent
ab -n 100 -c 10 http://localhost:5000/api/projects
```

### Stress Test with `curl`

```bash
# Make 50 requests in loop
for i in {1..50}; do
  curl http://localhost:5000/api/projects &
done
```

---

## 📝 Test Report Template

```markdown
## Test Report - Almousea API
**Date:** [Date]
**Tester:** [Name]
**Environment:** [Dev/Test/Staging]

### Results Summary
- Total Tests: X
- Passed: X
- Failed: X
- Success Rate: X%

### Failed Tests
[List any failures]

### Issues Found
[List any bugs]

### Recommendations
[Any improvements]
```

---

## 🆘 Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot connect to server` | Server not running | Run `npm run dev` |
| `Invalid token` | Token expired/wrong | Re-login and get new token |
| `All tests pass locally, fail in CI/CD` | Environment variables | Check `.env` setup in pipeline |
| `Intermittent failures` | Database connection | Check MongoDB connection |

---

**Happy testing! 🎉**
