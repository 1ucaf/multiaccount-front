import { Box, Button, Typography } from "@mui/material";
import PasswordField from "../../components/Form/Inputs/Password";
import { useDefaultErrorHandler } from "../../lib/hooks/useDefaultErrorHandler";
import { useAuthContext } from "../../lib/hooks/contextHooks/useAuthContext";
import { useForm } from "react-hook-form";
import { ChangePasswordFormType } from "../../lib/types/forms/ChangePasswordForm";
import schema from "./lib/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useViewContext } from "../../lib/hooks/contextHooks/useViewContext";

const ChangePassword = () => {
  const { changePassword, isChangePasswordPending, changePasswordError, isChangePasswordSuccess } = useAuthContext();
  const { notification } = useViewContext();
  useDefaultErrorHandler(changePasswordError);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordFormType>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: ChangePasswordFormType) => {
    const { currentPassword, newPassword } = data;
    changePassword({ current_password: currentPassword, new_password: newPassword });
  }
  useEffect(() => {
    if(isChangePasswordSuccess) {
      notification.show({ content: 'Password changed successfully', severity: 'success' });
    }
  }, [isChangePasswordSuccess])
  return (
    <Box component={'form'} height={'100%'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <Box
        border={2}
        borderColor={'primary.main'}
        height={'50vh'}
        width={'25rem'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        padding={'2rem'}
        gap={'1rem'}
        borderRadius={'2rem'}
        justifyContent={'space-between'}
      >
        <Typography variant='h4'>Change Password</Typography>
        <PasswordField
          label='Current Password'
          variant='outlined'
          autoComplete='password'
          fullWidth
          {...register('currentPassword', {required: 'Current Password is required'})}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
        />
        <PasswordField
          label='New Password'
          variant='outlined'
          type='password'
          autoComplete='newPassword'
          fullWidth
          {...register('newPassword', {required: 'New Password is required'})}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
        />
        <PasswordField
          label='Confirm Password'
          variant='outlined'
          type='password'
          autoComplete='confirmPassword'
          fullWidth
          {...register('confirmPassword', {required: 'Confirm Password is required'})}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button
          variant='contained'
          loading={isChangePasswordPending}
          disabled={isChangePasswordPending}
          onClick={handleSubmit(onSubmit)}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  )
}

export default ChangePassword