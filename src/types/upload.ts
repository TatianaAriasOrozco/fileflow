export interface UploadResponse {
  ok: boolean;
  data: {
    success: { id: number; name: string; email: string; age: number }[];
    errors: { row: number; details: Record<string, string> }[];
  };
}

export interface ErrorDetail {
  row: number;
  details: Record<string, string>;
}
