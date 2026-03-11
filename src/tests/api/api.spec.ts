import { test, expect } from '../../fixtures/baseTest';
import { ApiHelper } from '../../utils/apiHelper';
import { Logger } from '../../utils/logger';

/**
 * API Test Suite Example
 * Demonstrates API testing capabilities
 */
test.describe('API Tests', () => {
  
  let apiHelper: ApiHelper;

  test.beforeAll(async () => {
    // Initialize API Helper
    apiHelper = new ApiHelper('https://reqres.in/api');
    await apiHelper.init();
    Logger.info('API Helper initialized');
  });

  test.afterAll(async () => {
    // Cleanup
    await apiHelper.dispose();
    Logger.info('API Helper disposed');
  });

  /**
   * Test: GET request - Fetch users
   */
  test('should fetch users via GET request', async () => {
    Logger.step('Sending GET request to /users');
    
    // Make GET request
    const response = await apiHelper.get('/users?page=1');
    
    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);
    
    Logger.info(`Fetched ${response.body.data.length} users`);
  });

  /**
   * Test: POST request - Create user
   */
  test('should create user via POST request', async () => {
    Logger.step('Sending POST request to create user');
    
    const userData = {
      name: 'John Doe',
      job: 'QA Engineer'
    };
    
    // Make POST request
    const response = await apiHelper.post('/users', {
      data: userData
    });
    
    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
    expect(response.body.job).toBe('QA Engineer');
    expect(response.body).toHaveProperty('createdAt');
    
    Logger.info(`User created with ID: ${response.body.id}`);
  });

  /**
   * Test: PUT request - Update user
   */
  test('should update user via PUT request', async () => {
    Logger.step('Sending PUT request to update user');
    
    const updateData = {
      name: 'John Updated',
      job: 'Senior QA Engineer'
    };
    
    // Make PUT request
    const response = await apiHelper.put('/users/2', {
      data: updateData
    });
    
    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Updated');
    expect(response.body.job).toBe('Senior QA Engineer');
    
    Logger.info('User updated successfully');
  });

  /**
   * Test: DELETE request - Delete user
   */
  test('should delete user via DELETE request', async () => {
    Logger.step('Sending DELETE request');
    
    // Make DELETE request
    const response = await apiHelper.delete('/users/2');
    
    // Assertions
    expect(response.status).toBe(204);
    
    Logger.info('User deleted successfully');
  });

  /**
   * Test: GET with query parameters
   */
  test('should fetch single user by ID', async () => {
    Logger.step('Fetching user by ID');
    
    // Make GET request with params
    const response = await apiHelper.get('/users/2');
    
    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id', 2);
    expect(response.body.data).toHaveProperty('email');
    expect(response.body.data).toHaveProperty('first_name');
    
    Logger.info(`User: ${response.body.data.first_name} ${response.body.data.last_name}`);
  });

  /**
   * Test: Verify response headers
   */
  test('should verify response headers', async () => {
    Logger.step('Checking response headers');
    
    const response = await apiHelper.get('/users');
    
    // Verify headers exist
    expect(response.response.headers()['content-type']).toContain('application/json');
    
    Logger.info('Headers verified');
  });

  /**
   * Test: Handle 404 error
   */
  test('should handle 404 error gracefully', async () => {
    Logger.step('Testing 404 error handling');
    
    const response = await apiHelper.get('/users/999999');
    
    // Assertions for error
    expect(response.status).toBe(404);
    
    Logger.info('404 error handled correctly');
  });
});