# Contributing to Almousea API

Thank you for interest in contributing! This guide will help you get started.

## 📋 Before You Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/almousea.git`
3. Add upstream: `git remote add upstream https://github.com/ORIGINAL_OWNER/almousea.git`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## 🔧 Setup Development Environment

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your MongoDB and credentials

# Seed admin (for testing)
node seedAdmin.js --seed

# Start development server
npm run dev
```

## 📝 Before Committing

1. **Write clean code:**
   - Follow existing code style
   - Use meaningful variable/function names
   - Add comments for complex logic

2. **Test your changes:**
   - Test all CRUD operations
   - Test with invalid data
   - Verify error handling

3. **Documentation:**
   - Update README.md if adding new features
   - Document new API endpoints
   - Add comments to complex functions

## 🎯 How to Add a New Feature

### Example: Adding a Review/Ratings Feature

#### 1. Create the Model
`models/review.model.js`
```javascript
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
```

#### 2. Create the Service
`services/review.service.js`
```javascript
import Review from "../models/review.model.js";

export const create = (data) => Review.create(data);
export const findAll = () => Review.find().sort({ createdAt: -1 });
export const findById = (id) => Review.findById(id);
export const update = (id, data) => Review.findByIdAndUpdate(id, data, { new: true });
export const remove = (id) => Review.findByIdAndDelete(id);
```

#### 3. Create the Validator
`validators/review.validator.js`
```javascript
import Joi from "joi";

export const createReviewSchema = Joi.object({
  title: Joi.string().min(3).required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().min(10).required(),
  projectId: Joi.string().required(),
});
```

#### 4. Create the Controller
`controllers/review.controller.js`
```javascript
import * as service from "../services/review.service.js";

export const create = async (req, res, next) => {
  try {
    const review = await service.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const data = await service.findAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// Add other CRUD methods...
```

#### 5. Create the Routes
`routes/review.routes.js`
```javascript
import express from "express";
import * as controller from "../controllers/review.controller.js";
import validate from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";
import { createReviewSchema } from "../validators/review.validator.js";

const router = express.Router();

router.post("/", authenticate, validate(createReviewSchema), controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", authenticate, validate(createReviewSchema), controller.update);
router.delete("/:id", authenticate, controller.deleteReview);

export default router;
```

#### 6. Register Routes in `index.js`
```javascript
import reviewRoutes from "./routes/review.routes.js";

app.use("/api/reviews", reviewRoutes);
```

## 🧪 Testing Your Code

### Manual Testing with cURL

```bash
# Get token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@almousea.com","password":"securePassword123"}' \
  | jq -r '.token')

# Create
curl -X POST http://localhost:5000/api/reviews \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Great Project","rating":5,"comment":"Absolutely amazing project with great facilities"}'

# Read
curl http://localhost:5000/api/reviews

# Update
curl -X PUT http://localhost:5000/api/reviews/ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","rating":4,"comment":"Still great!"}'

# Delete
curl -X DELETE http://localhost:5000/api/reviews/ID \
  -H "Authorization: Bearer $TOKEN"
```

## 📤 Submitting Your Changes

1. **Commit with clear message:**
   ```bash
   git add .
   git commit -m "feat: add reviews feature"
   ```

2. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request:**
   - Go to GitHub and create a PR
   - Describe your changes clearly
   - Reference any related issues
   - Add screenshots if UI changes

4. **PR Guidelines:**
   - One feature per PR
   - Keep changes focused
   - Include documentation
   - Test thoroughly

## 🐛 Bug Reports

Create an issue with:
- **Title:** Clear description
- **Environment:** Node/MongoDB versions
- **Steps to reproduce:** Detailed steps
- **Expected behavior:** What should happen
- **Actual behavior:** What actually happens
- **Error logs:** Any relevant error messages

## 💡 Feature Requests

Suggest improvements with:
- **Title:** Feature name
- **Description:** Detailed explanation
- **Use case:** Why it's needed
- **Example:** How it might work

## 📚 Code Standards

### Naming Conventions
- Functions: `camelCase` (e.g., `getUserById`)
- Classes: `PascalCase` (e.g., `UserModel`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `DB_HOST`)
- Private methods: prefix with `_` (e.g., `_validateEmail`)

### File Structure
```
controllers/
  ├── auth.controller.js
  ├── project.controller.js
  └── review.controller.js

models/
  ├── user.model.js
  ├── project.model.js
  └── review.model.js

services/
  ├── auth.service.js
  ├── project.service.js
  └── review.service.js

routes/
  ├── auth.routes.js
  ├── project.routes.js
  └── review.routes.js

validators/
  ├── auth.validator.js
  ├── project.validator.js
  └── review.validator.js
```

## ✅ Checklist Before PR

- [ ] Code follows project style
- [ ] All CRUD operations tested
- [ ] Error handling implemented
- [ ] Input validation added
- [ ] README updated (if needed)
- [ ] No console.log() left in code
- [ ] Comments added for complex logic
- [ ] Tested with invalid data
- [ ] No breaking changes
- [ ] Dependencies installed: `npm install`

## 🚀 Merge Process

Maintainers will:
1. Review your code
2. Request changes if needed
3. Approve and merge to main
4. Close related issues

## 📞 Questions?

- Open an issue
- Check existing documentation
- Review similar features

## 📄 License

By contributing, you agree to license your work under ISC License.

---

**Happy contributing! 🎉**
