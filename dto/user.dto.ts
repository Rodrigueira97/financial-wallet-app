export interface UserDTO {
  id: string;
  name: string;
  email: string;
  balance: number;
}

export interface UserRegisterDTO {
  name: string
  email: string
  password: string
}

export interface UserLoginDTO {
  email: string;
  password: string
}

export interface RefreshTokenResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}

export interface PaginationDTO {
  page: number,
  limit: number,
  total: number,
  totalPages: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean
}

export interface ResponseGetAllUsersDTO {
  users: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }[],
  pagination: PaginationDTO,
}

export interface WalletTransferDTO {
  toUserId: string,
  amount: number
}