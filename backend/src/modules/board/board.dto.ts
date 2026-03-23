import { ApiResponse } from "../../types";



export type createBoardResponseDto = ApiResponse<{title :string,description:string}>

type board = {
    id:string,
    title:string,
    description :string
}
export type getBoardsByWorkSpaceResponseDto = ApiResponse<board[]>