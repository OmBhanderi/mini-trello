import { ApiResponse } from "../../types"

type createListResponse= {
    title:string,
    order:number,
    id:string
}


type list ={
    id:string,
    title:string,
    order:number
}

export type createListResponseDto = ApiResponse<createListResponse>
export type getListsByBoardResponseDto = ApiResponse<list[]>