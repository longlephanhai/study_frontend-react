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

  interface IPermission {
    _id: string;
    name: string;
    apiPath: string;
    method: string;
    module: string;
  }

  interface ITest {
    _id: string;
    title: string;
    description: string;
    durationSec: number;
    isPublic: boolean;
    totalQuestions: number;
    parts: IPart[];
    audioUrl: string;
  }

  interface IPart {
    _id: string;
    partNo: number;
    name: string;
    durationSec: number;
    orderIndex: number;
    description: string;
    questions: IQuestion[];
  }

  interface IQuestion {
    _id: string;
    numberQuestion: number;
    questionContent?: string;
    options: string[];
    correctAnswer: string;
    imageUrl?: string;
    audioUrl?: string;
    explanation?: string;
    category?: string;
    transcript?: string;
    reading?: string[];
  }

  interface IWriting {
    _id: string;
    topic: string;
    title: string;
    description: string;
    minWords: number;
    maxWords: number;
    level: string;
    suggestion?: string;
  }

  interface ITopicVocabulary {
    _id: string;
    topic: string;
    description: string;
    vocabularies?: IVocabulary[];
  }

  interface IVocabulary {
    _id: string;
    vocab: string;
    meaning: string;
    example: string;
    level: string;
    pronounce: string;
    img: string;
  }
}

