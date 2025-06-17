import { Box, Button, FormControl, TextField } from "@mui/material";
import { useUsersMutations } from "../../../../lib/hooks/users/useUsersMutations";
import { useViewContext } from "../../../../lib/hooks/contextHooks/useViewContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PasswordField from "../../../../components/Form/Inputs/Password";

type CreateUserFormType = {name: string, email: string, password: string}

const CreateUserModal = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateUserFormType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });
  const { notification, modal } = useViewContext();
  const {
    createUserMutate,
    isCreateUserSuccess,
    isCreateUserError,
    createUserError,
    isCreateUserPending,
  } = useUsersMutations();
  useEffect(() => {
    if(isCreateUserSuccess){
      notification.show({
        content: 'User created successfully',
        severity: 'success',
      });
      modal.hide();
    }
  }, [isCreateUserSuccess])
  useEffect(() => {
    if(isCreateUserError && createUserError){
      if(createUserError.response?.status === 403) {
        modal.hide();
      }
      notification.show({
        content: 'Error creating user',
        severity: 'error',
      });
    }
  }, [isCreateUserError, createUserError]);
  const onSubmit = (user: CreateUserFormType) => {
    createUserMutate(user);
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <FormControl>
        <TextField
          label="Email"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Name"
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </FormControl>
      <FormControl>
        <PasswordField
          label="Password"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </FormControl>
      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={isCreateUserPending}
        loading={isCreateUserPending}
      >
        Save
      </Button>
    </Box>
  )
}

export default CreateUserModal;