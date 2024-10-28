export interface APISuccessResponse<TData> {
  code: '200000';
  data: TData;
}

export interface APIErrorResponse {
  msg: string;
  code: string;
}

export type APIResponse<TData> = APISuccessResponse<TData> | APIErrorResponse;

export interface ServiceStatus {
  msg: string;
  status: 'cancelonly' | 'close' | 'open';
}
