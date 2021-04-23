import { User } from ".prisma/client";

export type DataWithUser<TData = Record<string, never>> = TData & {
  user: User;
};
