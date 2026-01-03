interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'helper';
  phone?: string;
  location?: string;
}

interface ForgotPasswordCredentials {
  email: string;
}

interface ResetPasswordCredentials {
  email: string;
  resetToken: string;
  newPassword: string;
}

interface AuthResponse {
  success: boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  };
  message?: string;
  error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

console.log('API_BASE_URL:', API_BASE_URL);
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      // Handle different HTTP status codes
      if (!response.ok) {
        try {
          const errorData = await response.json();
          
          // Handle specific error cases
          switch (response.status) {
            case 401:
              return {
                success: false,
                message: "Invalid email or password. Please check your credentials and try again.",
                error: errorData.error
              };
            case 404:
              return {
                success: false,
                message: "Account not found. Please check your email or sign up for a new account.",
                error: errorData.error
              };
            case 429:
              return {
                success: false,
                message: "Too many login attempts. Please wait a few minutes and try again.",
                error: errorData.error
              };
            case 500:
              return {
                success: false,
                message: "Server error. Please try again later.",
                error: errorData.error
              };
            default:
              return {
                success: false,
                message: errorData.error || errorData.message || "Login failed. Please try again.",
                error: errorData.error
              };
          }
        } catch (parseError) {
          // If we can't parse the error response
          return {
            success: false,
            message: response.status === 401 
              ? "Invalid email or password. Please check your credentials and try again."
              : `Login failed (${response.status}). Please try again.`,
          };
        }
      }

      const data = await response.json();

      if (response.ok && data.success) {
        // Store tokens in localStorage and cookies
        if (data.data?.accessToken) {
          localStorage.setItem('accessToken', data.data.accessToken);
          // Set cookie for middleware
          document.cookie = `accessToken=${data.data.accessToken}; path=/; max-age=86400; secure; samesite=strict`;
        }
        if (data.data?.refreshToken) {
          localStorage.setItem('refreshToken', data.data.refreshToken);
        }
        if (data.data?.user) {
          localStorage.setItem('user', JSON.stringify(data.data.user));
        }
      }

      return data;
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle network errors specifically
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        return {
          success: false,
          message: 'Unable to connect to server. Please check your internet connection and try again.',
        };
      }
      
      if (error.code === 'ECONNREFUSED' || error.message.includes('ERR_CONNECTION_REFUSED')) {
        return {
          success: false,
          message: 'Server is currently unavailable. Please try again later.',
        };
      }

      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      };
    }
  }

  static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          
          // Handle specific error cases
          switch (response.status) {
            case 400:
              if (errorData.error?.includes('already exists') || errorData.message?.includes('already exists')) {
                return {
                  success: false,
                  message: "An account with this email already exists. Please try logging in instead.",
                  error: errorData.error
                };
              }
              return {
                success: false,
                message: errorData.error || errorData.message || "Invalid registration data. Please check your information and try again.",
                error: errorData.error
              };
            case 422:
              return {
                success: false,
                message: "Please check your information and make sure all required fields are filled correctly.",
                error: errorData.error
              };
            case 500:
              return {
                success: false,
                message: "Server error. Please try again later.",
                error: errorData.error
              };
            default:
              return {
                success: false,
                message: errorData.error || errorData.message || `Registration failed (${response.status}). Please try again.`,
                error: errorData.error
              };
          }
        } catch (parseError) {
          return {
            success: false,
            message: `Registration failed (${response.status}). Please try again.`,
          };
        }
      }

      const data = await response.json();

      if (response.ok && data.success) {
        // Store tokens in localStorage and cookies if login is automatic after registration
        if (data.data?.accessToken) {
          localStorage.setItem('accessToken', data.data.accessToken);
          document.cookie = `accessToken=${data.data.accessToken}; path=/; max-age=86400; secure; samesite=strict`;
        }
        if (data.data?.refreshToken) {
          localStorage.setItem('refreshToken', data.data.refreshToken);
        }
        if (data.data?.user) {
          localStorage.setItem('user', JSON.stringify(data.data.user));
        }
      }

      return data;
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle network errors specifically
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        return {
          success: false,
          message: 'Unable to connect to server. Please check your internet connection and try again.',
        };
      }
      
      if (error.code === 'ECONNREFUSED' || error.message.includes('ERR_CONNECTION_REFUSED')) {
        return {
          success: false,
          message: 'Server is currently unavailable. Please try again later.',
        };
      }

      return {
        success: false,
        message: 'An unexpected error occurred during registration. Please try again.',
      };
    }
  }

  static async forgotPassword(credentials: ForgotPasswordCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        if (response.status === 0 || !response.status) {
          return {
            success: false,
            message: 'Unable to connect to server. Please make sure the backend is running.',
          };
        }
        
        try {
          const errorData = await response.json();
          return {
            success: false,
            message: errorData.error || errorData.message || `Server error: ${response.status}`,
            error: errorData.error
          };
        } catch (parseError) {
          return {
            success: false,
            message: `Server error: ${response.status} ${response.statusText}`,
          };
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        message: 'Unable to connect to server. Please make sure the backend is running.',
      };
    }
  }

  static async resetPassword(credentials: ResetPasswordCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        if (response.status === 0 || !response.status) {
          return {
            success: false,
            message: 'Unable to connect to server. Please make sure the backend is running.',
          };
        }
        
        try {
          const errorData = await response.json();
          return {
            success: false,
            message: errorData.error || errorData.message || `Server error: ${response.status}`,
            error: errorData.error
          };
        } catch (parseError) {
          return {
            success: false,
            message: `Server error: ${response.status} ${response.statusText}`,
          };
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: 'Unable to connect to server. Please make sure the backend is running.',
      };
    }
  }

  static logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    // Clear cookie
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  static getUser(): any | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}