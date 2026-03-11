/**
 * Random Helper Utility
 * Provides methods for generating random test data
 */

export class RandomHelper {
  /**
   * Generate random string
   */
  static randomString(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate random email
   */
  static randomEmail(domain: string = 'test.com'): string {
    const username = this.randomString(10).toLowerCase();
    return `${username}@${domain}`;
  }

  /**
   * Generate random number within range
   */
  static randomNumber(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random phone number
   */
  static randomPhoneNumber(): string {
    const areaCode = this.randomNumber(200, 999);
    const firstPart = this.randomNumber(200, 999);
    const secondPart = this.randomNumber(1000, 9999);
    return `${areaCode}-${firstPart}-${secondPart}`;
  }

  /**
   * Generate random postal code
   */
  static randomPostalCode(): string {
    return this.randomNumber(10000, 99999).toString();
  }

  /**
   * Generate random boolean
   */
  static randomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  /**
   * Pick random item from array
   */
  static randomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Generate random date within range
   */
  static randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  /**
   * Generate random first name
   */
  static randomFirstName(): string {
    const names = [
      'Avinash', 'Jagadish', 'Bhavana', 'Sarah', 'David', 'Manci',
      'Afridi', 'Olivia', 'Lingesh', 'Esai', 'James', 'Neha'
    ];
    return this.randomFromArray(names);
  }

  /**
   * Generate random last name
   */
  static randomLastName(): string {
    const names = [
      'Smith', 'Johnson', 'Williams', 'Maran', 'Jones', 'Addams',
      'Miller', 'Aaryan', 'Adithya', 'Martinez', 'Hernandez', 'Wills'
    ];
    return this.randomFromArray(names);
  }

  /**
   * Generate random full name
   */
  static randomFullName(): string {
    return `${this.randomFirstName()} ${this.randomLastName()}`;
  }

  /**
   * Generate random UUID
   */
  static randomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Generate random alphanumeric string
   */
  static randomAlphanumeric(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Shuffle array
   */
  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

export default RandomHelper;
