import { APIRequestContext, request } from '@playwright/test';
import { Logger } from './logger';
import { GlobalConfig } from '../config/globalConfig';

export class ApiHelper {
  private context: APIRequestContext | null = null;
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || GlobalConfig.api.baseURL;
  }

  /**
   * Initialize API context
   */
  async init(): Promise<void> {
    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: GlobalConfig.api.headers,
      timeout: GlobalConfig.api.timeout,
    });
    Logger.info('API context initialized');
  }

  /**
   * Dispose API context
   */
  async dispose(): Promise<void> {
    if (this.context) {
      await this.context.dispose();
      Logger.info('API context disposed');
    }
  }

  /**
   * GET request
   */
  async get(
    endpoint: string,
    options?: {
      params?: Record<string, any>;
      headers?: Record<string, string>;
    }
  ) {
    try {
      Logger.info(`GET request to: ${endpoint}`);
      if (!this.context) await this.init();

      const response = await this.context!.get(endpoint, {
        params: options?.params,
        headers: options?.headers,
      });

      const responseBody = await response.json();
      Logger.info(`GET response status: ${response.status()}`);
      return { status: response.status(), body: responseBody, response };
    } catch (error) {
      Logger.error(`GET request failed for ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * POST request
   */
  async post(
    endpoint: string,
    options?: {
      data?: any;
      headers?: Record<string, string>;
    }
  ) {
    try {
      Logger.info(`POST request to: ${endpoint}`);
      if (!this.context) await this.init();

      const response = await this.context!.post(endpoint, {
        data: options?.data,
        headers: options?.headers,
      });

      const responseBody = await response.json().catch(() => ({}));
      Logger.info(`POST response status: ${response.status()}`);
      return { status: response.status(), body: responseBody, response };
    } catch (error) {
      Logger.error(`POST request failed for ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * PUT request
   */
  async put(
    endpoint: string,
    options?: {
      data?: any;
      headers?: Record<string, string>;
    }
  ) {
    try {
      Logger.info(`PUT request to: ${endpoint}`);
      if (!this.context) await this.init();

      const response = await this.context!.put(endpoint, {
        data: options?.data,
        headers: options?.headers,
      });

      const responseBody = await response.json().catch(() => ({}));
      Logger.info(`PUT response status: ${response.status()}`);
      return { status: response.status(), body: responseBody, response };
    } catch (error) {
      Logger.error(`PUT request failed for ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * DELETE request
   */
  async delete(
    endpoint: string,
    options?: {
      headers?: Record<string, string>;
    }
  ) {
    try {
      Logger.info(`DELETE request to: ${endpoint}`);
      if (!this.context) await this.init();

      const response = await this.context!.delete(endpoint, {
        headers: options?.headers,
      });

      const responseBody = await response.json().catch(() => ({}));
      Logger.info(`DELETE response status: ${response.status()}`);
      return { status: response.status(), body: responseBody, response };
    } catch (error) {
      Logger.error(`DELETE request failed for ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * PATCH request
   */
  async patch(
    endpoint: string,
    options?: {
      data?: any;
      headers?: Record<string, string>;
    }
  ) {
    try {
      Logger.info(`PATCH request to: ${endpoint}`);
      if (!this.context) await this.init();

      const response = await this.context!.patch(endpoint, {
        data: options?.data,
        headers: options?.headers,
      });

      const responseBody = await response.json().catch(() => ({}));
      Logger.info(`PATCH response status: ${response.status()}`);
      return { status: response.status(), body: responseBody, response };
    } catch (error) {
      Logger.error(`PATCH request failed for ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Set authorization header
   */
  setAuthToken(token: string): void {
    if (this.context) {
      Logger.info('Setting authorization token');
      // Note: For setting headers, you'll need to recreate the context
      // This is a placeholder implementation
    }
  }
}

export default ApiHelper;
