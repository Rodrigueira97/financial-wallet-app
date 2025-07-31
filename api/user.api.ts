import { RefreshTokenResponseDTO, ResponseGetAllUsersDTO, UserDTO, UserLoginDTO, UserRegisterDTO } from "@/dto/user.dto";
import api from "@/services/axios";

export async function registerUser(user: UserRegisterDTO) {
  const { data } = await api.post('/auth/register', user);

  return data
}

export async function loginUser(user: UserLoginDTO) {
  const { data } = await api.post('/auth/login', user)

  return data
}

export async function userProfile(): Promise<UserDTO> {
  const { data } = await api.get('/user/profile')

  return data
}


export async function RefreshToken(refreshToken: string): Promise<RefreshTokenResponseDTO> {
  const { data } = await api.post('/auth/refresh', {
    refreshToken,
  })

  return data
}

export async function getAllUsers(): Promise<ResponseGetAllUsersDTO> {
  const { data } = await api.get('/user')

  return data
}