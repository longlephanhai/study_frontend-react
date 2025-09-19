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