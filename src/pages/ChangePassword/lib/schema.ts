import * as Yup from 'yup';

const schema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .test(
      'not-same-as-current',
      'New password must be different from the current password',
      function (value) {
        const { currentPassword } = this.parent;
        return value !== currentPassword;
      }
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});

export default schema;