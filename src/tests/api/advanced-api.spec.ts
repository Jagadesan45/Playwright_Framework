import { test, expect } from '../../fixtures/baseTest';
import { ApiHelper } from '../../utils/apiHelper';
import { Logger } from '../../utils/logger';

/**
 * Advanced API Test Examples
 * Shows authentication, chaining, and complex scenarios
 */
test.describe('Advanced API Tests', () => {
  
  let apiHelper: ApiHelper;
  let authToken: string;
  let userId: string;

  test.beforeAll(async () => {
    apiHelper = new ApiHelper('https://reqres.in/api');
    await apiHelper.init();
  });

  test.afterAll(async () => {
    await apiHelper.dispose();
  });

  /**
   * Test: Login and get token (Authentication)
   */
  test('should login and receive token', async () => {
    Logger.step('Authenticating user');
    
    const loginData = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };
    
    const response = await apiHelper.post('/login', {
      data: loginData
    });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    
    // Store token for future requests
    authToken = response.body.token;
    Logger.info(`Authentication successful. Token: ${authToken}`);
  });

  /**
   * Test: API request chaining
   * Create user → Get user → Update user → Delete user
   */
  test('should perform complete CRUD operations', async () => {
    // CREATE
    Logger.step('Step 1: Creating user');
    const createResponse = await apiHelper.post('/users', {
      data: {
        name: 'Test User',
        job: 'Automation Tester'
      }
    });
    
    expect(createResponse.status).toBe(201);
    userId = createResponse.body.id;
    Logger.info(`User created with ID: ${userId}`);
    
    // READ (simulate - this API doesn't return created users)
    Logger.step('Step 2: Reading user details');
    const readResponse = await apiHelper.get('/users/2');
    expect(readResponse.status).toBe(200);
    Logger.info('User details retrieved');
    
    // UPDATE
    Logger.step('Step 3: Updating user');
    const updateResponse = await apiHelper.put(`/users/${userId}`, {
      data: {
        name: 'Updated User',
        job: 'Senior Automation Tester'
      }
    });
    
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.job).toBe('Senior Automation Tester');
    Logger.info('User updated successfully');
    
    // DELETE
    Logger.step('Step 4: Deleting user');
    const deleteResponse = await apiHelper.delete(`/users/${userId}`);
    expect(deleteResponse.status).toBe(204);
    Logger.info('User deleted successfully');
  });

  /**
   * Test: Validate response schema
   */
  test('should validate response schema structure', async () => {
    Logger.step('Validating API response schema');
    
    const response = await apiHelper.get('/users/2');
    
    // Schema validation
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toMatchObject({
      id: expect.any(Number),
      email: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String),
      avatar: expect.stringContaining('https://')
    });
    
    expect(response.body).toHaveProperty('support');
    expect(response.body.support).toHaveProperty('url');
    expect(response.body.support).toHaveProperty('text');
    
    Logger.info('Schema validation passed');
  });

  /**
   * Test: Response time validation
   */
  test('should respond within acceptable time', async () => {
    Logger.step('Testing API response time');
    
    const startTime = Date.now();
    const response = await apiHelper.get('/users');
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    
    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(2000); // Should respond within 2 seconds
    
    Logger.info(`Response time: ${responseTime}ms`);
  });

  /**
   * Test: Pagination handling
   */
  test('should handle pagination correctly', async () => {
    Logger.step('Testing pagination');
    
    // Get page 1
    const page1Response = await apiHelper.get('/users?page=1');
    expect(page1Response.status).toBe(200);
    expect(page1Response.body.page).toBe(1);
    
    // Get page 2
    const page2Response = await apiHelper.get('/users?page=2');
    expect(page2Response.status).toBe(200);
    expect(page2Response.body.page).toBe(2);
    
    // Verify different data
    expect(page1Response.body.data[0].id).not.toBe(page2Response.body.data[0].id);
    
    Logger.info('Pagination working correctly');
  });

  /**
   * Test: Array data validation
   */
  test('should validate array responses', async () => {
    Logger.step('Validating array data');
    
    const response = await apiHelper.get('/users?page=1');
    
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);
    
    // Validate each user object
    response.body.data.forEach((user: any) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user.email).toMatch(/.*@reqres\.in/);
    });
    
    Logger.info(`Validated ${response.body.data.length} user objects`);
  });

  /**
   * Test: Error handling - Invalid data
   */
  test('should handle invalid data in POST request', async () => {
    Logger.step('Testing error handling with invalid data');
    
    const response = await apiHelper.post('/register', {
      data: {
        email: 'invalid-email-format'
        // Missing password
      }
    });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    
    Logger.info('Error handled correctly');
  });
});