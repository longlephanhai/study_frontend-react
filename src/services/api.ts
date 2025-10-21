import axios from "../config/interceptor"

export const callApiLogin = async (data: { email: string, password: string }): Promise<IBackendRes<IAccount>> => {
  return await axios.post('/api/auth/login', data)
}

export const callApiFetchUsers = async (query: string): Promise<IBackendRes<IModelPaginate<IUser>>> => {
  return await axios.get(`/api/users?${query}`);
}

export const callApiFetchRoles = async (query: string): Promise<IBackendRes<IModelPaginate<IRole>>> => {
  return await axios.get(`/api/roles?${query}`);
}

export const callApiUploadAvatar = async (file: File): Promise<IBackendRes<IUploadFile>> => {
  const formData = new FormData();
  formData.append('fileUpload', file);
  return await axios.post('/api/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "folder_type": "avatar"
    }
  });
}

export const callApiCreateUser = async (data: IUser): Promise<IBackendRes<IUser>> => {
  return await axios.post('/api/users', data);
}

export const callApiGetAccount = async (): Promise<IBackendRes<IUser>> => {
  return await axios.get('/api/auth/account');
}

export const callApiFetchPermissions = async (query: string): Promise<IBackendRes<IModelPaginate<IPermission>>> => {
  return await axios.get(`/api/permissions?${query}`);
}

export const callApiUpdateRole = async (id: string, data: { name: string; description: string; permissions: string[] }): Promise<IBackendRes<IRole>> => {
  return await axios.patch(`/api/roles/${id}`, data);
}

export const callApiFetchTests = async (query: string): Promise<IBackendRes<IModelPaginate<ITest>>> => {
  return await axios.get(`/api/tests?${query}`);
}

export const callApiCreateMultipleQuestions = async (partId: string, data: IQuestion[]): Promise<IBackendRes<IModelPaginate<IQuestion[]>>> => {
  return await axios.post(`/api/parts/${partId}/questions/multiple`, data);
}

export const callApiCreateTest = async (data: ITest): Promise<IBackendRes<ITest>> => {
  return await axios.post('/api/tests', data);
}

export const callApiCreateMultipleWritings = async (data: IWriting[]): Promise<IBackendRes<IModelPaginate<IWriting[]>>> => {
  return await axios.post('/api/writing/multiple', data);
}

export const callApiFetchWritings = async (query: string): Promise<IBackendRes<IModelPaginate<IWriting>>> => {
  return await axios.get(`/api/writing?${query}`);
}

export const callApiCreateMultipleTopicsVocabularies = async (data: ITopicVocabulary[]): Promise<IBackendRes<ITopicVocabulary[]>> => {
  return await axios.post('/api/topics-vocabularies/multiple', data);
}

export const callApiFetchTopicsVocabularies = async (query: string): Promise<IBackendRes<IModelPaginate<ITopicVocabulary>>> => {
  return await axios.get(`/api/topics-vocabularies?${query}`);
}

export const callApiCreateMultipleTopicsSpeaking = async (data: ITopicsSpeaking[]): Promise<IBackendRes<ITopicsSpeaking[]>> => {
  return await axios.post('/api/topics-speaking/multiple', data);
}

export const callApiCreateMultipleVocabularies = async (topicsId: string, data: IVocabulary[]): Promise<IBackendRes<IVocabulary[]>> => {
  return await axios.post(`/api/topics-vocabularies/${topicsId}/vocabularies/multiple`, data);
}

export const callApiCreateMultipleGrammars = async (data: IGrammar[]): Promise<IBackendRes<IGrammar[]>> => {
  return await axios.post('/api/grammars/multiple', data);
}

export const callApiCreateMultiplePartOne = async (data: IPartOne[]): Promise<IBackendRes<IPartOne[]>> => {
  return await axios.post('/api/part1/multiple', data);
}