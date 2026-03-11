# API Testing Guide - Playwright Enterprise Framework

## 📚 Table of Contents
1. [Overview](#overview)
2. [API Helper Methods](#api-helper-methods)
3. [How to Use](#how-to-use)
4. [Examples](#examples)
5. [Best Practices](#best-practices)

---

## 🎯 Overview

Your Playwright framework includes **built-in API testing capabilities** through:

### **Components:**
- **ApiHelper** (`src/utils/apiHelper.ts`) - Main API testing utility
- **Playwright API Context** - Built-in Playwright API support
- **Global Config** (`src/config/globalConfig.ts`) - API configuration

### **Features:**
✅ RESTful API testing (GET, POST, PUT, DELETE, PATCH)
✅ Request/Response validation
✅ Authentication support
✅ Custom headers
✅ Query parameters
✅ Error handling
✅ Response schema validation
✅ Performance testing

---

## 🔧 API Helper Methods

### **Available Methods:**

```typescript
// Initialize
await apiHelper.init();

// GET Request
const response = await apiHelper.get('/endpoint', {
  params: { key: 'value' },
  headers: { 'Custom-Header': 'value' }
});

// POST Request
const response = await apiHelper.post('/endpoint', {
  data: { name: 'John', job: 'Tester' },
  headers: { 'Authorization': 'Bearer token' }
});

// PUT Request
const response = await apiHelper.put('/endpoint/1', {
  data: { name: 'Updated Name' }
});

// DELETE Request
const response = await apiHelper.delete('/endpoint/1');

// PATCH Request
const response = await apiHelper.patch('/endpoint/1', {
  data: { field: 'new value' }
});

// Cleanup
await apiHelper.dispose();
```

---

## 📖 How to Use

### **Step 1: Import ApiHelper**

```typescript
import { ApiHelper } from '../../utils/apiHelper';
import { Logger } from '../../utils/logger';
```

### **Step 2: Initialize in Test**

```typescript
test.describe('API Tests', () => {
  let apiHelper: ApiHelper;

  test.beforeAll(async () => {
    // Initialize with base URL
    apiHelper = new ApiHelper('https://api.example.com');
    await apiHelper.init();
  });

  test.afterAll(async () => {
    await apiHelper.dispose();
  });
});
```

### **Step 3: Write API Tests**

```typescript
test('should fetch users', async () => {
  const response = await apiHelper.get('/users');
  
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('data');
});
```

---

## 💡 Examples

### **Example 1: Basic GET Request**

```typescript
test('should get user by ID', async () => {
  Logger.step('Fetching user with ID 1');
  
  const response = await apiHelper.get('/users/1');
  
  // Validate status code
  expect(response.status).toBe(200);
  
  // Validate response body
  expect(response.body.data).toHaveProperty('id', 1);
  expect(response.body.data).toHaveProperty('email');
  
  Logger.info(`User email: ${response.body.data.email}`);
});
```

### **Example 2: POST Request with Data**

```typescript
test('should create new user', async () => {
  Logger.step('Creating new user');
  
  const userData = {
    name: 'John Doe',
    job: 'QA Engineer'
  };
  
  const response = await apiHelper.post('/users', {
    data: userData
  });
  
  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('id');
  expect(response.body.name).toBe('John Doe');
  expect(response.body.job).toBe('QA Engineer');
  
  Logger.info(`User created with ID: ${response.body.id}`);
});
```

### **Example 3: Authentication Flow**

```typescript
test('should authenticate and use token', async () => {
  // Step 1: Login
  Logger.step('Logging in');
  const loginResponse = await apiHelper.post('/login', {
    data: {
      email: 'user@example.com',
      password: 'password123'
    }
  });
  
  expect(loginResponse.status).toBe(200);
  const token = loginResponse.body.token;
  
  // Step 2: Use token in subsequent request
  Logger.step('Fetching protected resource');
  const protectedResponse = await apiHelper.get('/protected-resource', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  expect(protectedResponse.status).toBe(200);
  Logger.info('Successfully accessed protected resource');
});
```

### **Example 4: Query Parameters**

```typescript
test('should filter users by page', async () => {
  const response = await apiHelper.get('/users', {
    params: {
      page: 2,
      per_page: 10
    }
  });
  
  expect(response.status).toBe(200);
  expect(response.body.page).toBe(2);
  expect(response.body.per_page).toBe(10);
});
```

### **Example 5: Schema Validation**

```typescript
test('should validate response schema', async () => {
  const response = await apiHelper.get('/users/1');
  
  // Validate complete schema
  expect(response.body.data).toMatchObject({
    id: expect.any(Number),
    email: expect.any(String),
    first_name: expect.any(String),
    last_name: expect.any(String),
    avatar: expect.stringContaining('https://')
  });
});
```

### **Example 6: Error Handling**

```typescript
test('should handle 404 error', async () => {
  const response = await apiHelper.get('/users/999999');
  
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty('error');
});
```

### **Example 7: CRUD Operations Chain**

```typescript
test('should perform complete CRUD cycle', async () => {
  let userId: string;
  
  // CREATE
  const createRes = await apiHelper.post('/users', {
    data: { name: 'Test', job: 'Tester' }
  });
  userId = createRes.body.id;
  expect(createRes.status).toBe(201);
  
  // READ
  const readRes = await apiHelper.get(`/users/${userId}`);
  expect(readRes.status).toBe(200);
  
  // UPDATE
  const updateRes = await apiHelper.put(`/users/${userId}`, {
    data: { job: 'Senior Tester' }
  });
  expect(updateRes.status).toBe(200);
  
  // DELETE
  const deleteRes = await apiHelper.delete(`/users/${userId}`);
  expect(deleteRes.status).toBe(204);
});
```

### **Example 8: Performance Testing**

```typescript
test('should respond within 2 seconds', async () => {
  const startTime = Date.now();
  
  const response = await apiHelper.get('/users');
  
  const responseTime = Date.now() - startTime;
  
  expect(response.status).toBe(200);
  expect(responseTime).toBeLessThan(2000);
  
  Logger.info(`Response time: ${responseTime}ms`);
});
```

---

## 🎯 Best Practices

### **1. Use Descriptive Test Names**
```typescript
// ❌ Bad
test('test 1', async () => {});

// ✅ Good
test('should return 200 when fetching valid user', async () => {});
```

### **2. Log Important Steps**
```typescript
Logger.step('Creating user with POST request');
Logger.info(`User ID: ${response.body.id}`);
Logger.error('API request failed', error);
```

### **3. Validate Status Codes**
```typescript
expect(response.status).toBe(200);
expect(response.status).toBeGreaterThanOrEqual(200);
expect(response.status).toBeLessThan(300);
```

### **4. Validate Response Structure**
```typescript
expect(response.body).toHaveProperty('data');
expect(response.body.data).toBeInstanceOf(Array);
```

### **5. Handle Errors Gracefully**
```typescript
try {
  const response = await apiHelper.get('/endpoint');
  expect(response.status).toBe(200);
} catch (error) {
  Logger.error('API call failed', error);
  throw error;
}
```

### **6. Use Variables for Reusable Data**
```typescript
const baseURL = 'https://api.example.com';
const userId = '123';
const endpoint = `/users/${userId}`;
```

### **7. Clean Up After Tests**
```typescript
test.afterAll(async () => {
  await apiHelper.dispose();
  Logger.info('API helper cleaned up');
});
```

---

## 🚀 Running API Tests

### **Run all API tests:**
```bash
npx playwright test src/tests/api
```

### **Run specific API test file:**
```bash
npx playwright test src/tests/api/api.spec.ts
```

### **Run with headed mode:**
```bash
npx playwright test src/tests/api --headed
```

### **Run with UI mode:**
```bash
npx playwright test src/tests/api --ui
```

---

## 📊 API Test Configuration

### **In `src/config/globalConfig.ts`:**

```typescript
api: {
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}
```

### **In `.env` file:**

```env
API_BASE_URL=https://api.example.com
API_TIMEOUT=30000
```

---

## 🎓 Interview Talking Points

> "My framework includes comprehensive API testing capabilities using Playwright's built-in API context. I've created a reusable ApiHelper class that supports all REST methods (GET, POST, PUT, DELETE, PATCH) with features like custom headers, authentication, error handling, and response validation. I can perform end-to-end API testing, validate schemas, test performance, and chain multiple API calls in a single test."

---

## 📝 Quick Reference

| Method | Purpose | Example |
|--------|---------|---------|
| `get()` | Fetch data | `apiHelper.get('/users')` |
| `post()` | Create data | `apiHelper.post('/users', {data})` |
| `put()` | Update data | `apiHelper.put('/users/1', {data})` |
| `delete()` | Delete data | `apiHelper.delete('/users/1')` |
| `patch()` | Partial update | `apiHelper.patch('/users/1', {data})` |

---

**You now have full API testing capabilities in your framework!** 🎉