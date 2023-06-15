export type APIResponse<Data> = {
  error: string | null;
  data: Data;
  success: boolean;
};
