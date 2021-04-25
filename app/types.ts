export interface SessionUser {
  id: string;
  name: string | null;
  email: string | null;
  avatarURL: string;
  username: string;
}

export type DataWithUser<TData = Record<string, never>> = TData & {
  user: SessionUser;
};
