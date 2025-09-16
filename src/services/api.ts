import axios from "../config/interceptor"

export const callApiLogin = async (data: { email: string, password: string }): Promise<IBackendRes<IAccount>> => {
  return await axios.post('/api/auth/login', data)
}