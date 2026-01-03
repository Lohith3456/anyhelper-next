'use strict';

export class AuthService {
  static async login() {
    return { success: false, message: 'Authentication has been removed from this project.' } as const;
  }

  static async register() {
    return { success: false, message: 'Registration has been removed from this project.' } as const;
  }

  static async forgotPassword() {
    return { success: false, message: 'Password reset has been removed from this project.' } as const;
  }

  static async resetPassword() {
    return { success: false, message: 'Password reset has been removed from this project.' } as const;
  }

  static logout() {
    // no-op
  }

  static getToken() {
    return null;
  }

  static getUser() {
    return null;
  }

  static isAuthenticated() {
    return false;
  }
}
