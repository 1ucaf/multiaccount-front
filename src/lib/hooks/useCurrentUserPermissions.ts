import { useAuthContext } from "./contextHooks/useAuthContext";

type Resource = 'users' | 'books';
type UserActions = 'get' | 'create' | 'edit' | 'delete' | 'set_admin' | 'set_permissions';
type BookActions = 'get' | 'create' | 'edit' | 'delete';

export const useCurrentUserPermissions = () => {
  const { user } = useAuthContext();
  const currentUserPermissions: string[] = user?.permissions || [];

  const permissions: {
    users: Record<UserActions, boolean>,
    books: Record<BookActions, boolean>
  } = {
    users: {
      get: false,
      create: false,
      edit: false,
      delete: false,
      set_admin: false,
      set_permissions: false,
    },
    books: {
      get: false,
      create: false,
      edit: false,
      delete: false,
    },
  };

  currentUserPermissions.forEach((permission) => {
    const [resource, action] = permission.split('.') as [Resource, string];
    if (resource === 'users' && action in permissions.users) {
      permissions.users[action as UserActions] = true;
    } else if (resource === 'books' && action in permissions.books) {
      permissions.books[action as BookActions] = true;
    }
  });

  return {
    permissionsRawList: currentUserPermissions,
    permissions,
  };
}