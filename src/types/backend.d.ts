export { };

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }


  interface IAccount {
    access_token: string;
    user: {
      _id: string;
      fullName: string;
      email: string;
      role: string;
      age: number;
      address: string;
      phone: number;
    }
  }
}
