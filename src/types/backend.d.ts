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
      avatar?: string;
      address: string;
      phone: number;
    }
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    },
    result: T[]
  }

  interface IUser {
    _id: string;
    fullName: string;
    email: string;
    password?: string;
    avatar?: string;
    role: {
      _id: string;
      name: string;
      description?: string;
      permissions?: string[];
    } | string;
    age: number;
    address: string;
    phone: number;
  }

  interface IRole {
    _id: string,
    name: string,
    description?: string,
    permissions?: string[],
    createdBy: {
      _id: string,
      email: string
    },
  }

  interface IUploadFile {
    statusCode: number;
    message: string;
    data: {
      filename: string;
      path: string;
      url: string;
    }
  }

}

