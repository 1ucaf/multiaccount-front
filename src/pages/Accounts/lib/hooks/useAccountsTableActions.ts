import { useViewContext } from "../../../../lib/hooks/contextHooks/useViewContext";
import ConfirmationModal from "../../../../components/CommonModals/ConfirmationModal";
import { FormattedAccount } from "../types/FormattedAccount";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../../../lib/hooks/contextHooks/useAuthContext";

export const useAccountsTableActions = () => {
  const navigate = useNavigate();
  const { modal } = useViewContext();
  const {
    impersonateAccountMutation: {
      mutate: impersonateAccountMutate,
    }
  } = useAuthContext();

  const pauseAccount = (account: FormattedAccount) => {
    modal.show({
      title: 'Pause Account',
      Component: () => ConfirmationModal({
        confirmColor: 'primary',
        description: `Are you sure you want to pause ${account.name}?`,
        onCancel: modal.hide,
        invalidateKey: ['accounts'],
        actionMethod: 'patch',
        actionUrl: `/accounts/pause/${String(account.id)}`,
        errorMessage: 'Error pausing account',
        successMessage: 'Account paused successfully',
        pendingMessage: 'Pausing Account...'
      }),
    })
  }
  const resumeAccount = (account: FormattedAccount) => {
    modal.show({
      title: 'Resume Account',
      Component: () => ConfirmationModal({
        confirmColor: 'primary',
        description: `Are you sure you want to resume ${account.name}?`,
        onCancel: modal.hide,
        invalidateKey: ['accounts'],
        actionMethod: 'patch',
        actionUrl: `/accounts/resume/${String(account.id)}`,
        errorMessage: 'Error resuming account',
        successMessage: 'Account resumed successfully',
        pendingMessage: 'Resuming account...'
      }),
    })
  }
  const impersonateAccount = (account: FormattedAccount) => {
    impersonateAccountMutate(account.id);
  };
  const accountUsers = (account: FormattedAccount) => {
    navigate(`/accounts/${account.id}/users`);
  }
  return {
    pauseAccount,
    resumeAccount,
    impersonateAccount,
    accountUsers,
  };
}