import fs from 'fs';
import path from 'path';
import { Logger } from '../utils/logger';

export interface User {
  username: string;
  password: string;
  description: string;
  type: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class UserService {
  private usersData: any;
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'src/test-data/users.json');
    this.loadUsers();
  }

  /**
   * Load users from JSON file
   */
  private loadUsers(): void {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf-8');
      this.usersData = JSON.parse(data);
      Logger.info('User data loaded successfully');
    } catch (error) {
      Logger.error('Failed to load user data', error);
      throw error;
    }
  }

  /**
   * Get all valid users
   */
  getValidUsers(): User[] {
    return this.usersData.validUsers;
  }

  /**
   * Get all invalid users
   */
  getInvalidUsers(): User[] {
    return this.usersData.invalidUsers;
  }

  /**
   * Get user by type
   */
  getUserByType(type: string): User | undefined {
    const allUsers = [...this.usersData.validUsers, ...this.usersData.invalidUsers];
    return allUsers.find((user: User) => user.type === type);
  }

  /**
   * Get standard user
   */
  getStandardUser(): User {
    const user = this.getUserByType('standard');
    if (!user) {
      throw new Error('Standard user not found in test data');
    }
    return user;
  }

  /**
   * Get locked out user
   */
  getLockedUser(): User {
    const user = this.getUserByType('locked');
    if (!user) {
      throw new Error('Locked user not found in test data');
    }
    return user;
  }

  /**
   * Get problem user
   */
  getProblemUser(): User {
    const user = this.getUserByType('problem');
    if (!user) {
      throw new Error('Problem user not found in test data');
    }
    return user;
  }

  /**
   * Get performance glitch user
   */
  getPerformanceUser(): User {
    const user = this.getUserByType('performance');
    if (!user) {
      throw new Error('Performance user not found in test data');
    }
    return user;
  }

  /**
   * Get invalid user
   */
  getInvalidUser(): User {
    const user = this.getUserByType('invalid');
    if (!user) {
      throw new Error('Invalid user not found in test data');
    }
    return user;
  }

  /**
   * Get test customers
   */
  getTestCustomers(): Customer[] {
    return this.usersData.testCustomers;
  }

  /**
   * Get random test customer
   */
  getRandomCustomer(): Customer {
    const customers = this.getTestCustomers();
    return customers[Math.floor(Math.random() * customers.length)];
  }

  /**
   * Create custom user
   */
  createCustomUser(username: string, password: string, type: string = 'custom'): User {
    return {
      username,
      password,
      description: 'Custom test user',
      type,
    };
  }
}

export default UserService;
