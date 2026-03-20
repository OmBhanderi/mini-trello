import { ApiResponse } from "../../types";

export interface UserResponseDto {
  name: string;
  email: string;
}

export type SignupResponseDto = ApiResponse<UserResponseDto>; 


export interface LoginDataDto {
  user: UserResponseDto;
  token: string;
}

export type LoginResponseDto = ApiResponse<LoginDataDto>;