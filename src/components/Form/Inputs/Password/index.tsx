import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { forwardRef, useState } from "react";

const PasswordField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      inputRef={ref}
      slotProps={{
        ...props.slotProps,
        input: {
          "aria-label": "password",
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? 'hide the password' : 'display the password'
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  )
});

export default PasswordField;