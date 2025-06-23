import { useAuthContext } from "../../../../lib/hooks/contextHooks/useAuthContext";
import { FormattedUser } from "../../../Users/lib/types/FormattedUser";

export const useAccountUsersTableActions = () => {
  const {
    impersonateUserMutation: {
      mutate: impersonateUserMutate,
    }
  } = useAuthContext();
  const impersonateUser = (user: FormattedUser) => {
    impersonateUserMutate(user.id);
  };
  return {
    impersonateUser,
  };
}