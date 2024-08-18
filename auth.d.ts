declare module "#auth-utils" {
  interface User {
    email: string;
    id: string;
    username: string;
    provider: string | null;
    requiresConfirmation?: boolean;
  }

  interface UserSession {
    // Add your own fields
  }
}

export {};
