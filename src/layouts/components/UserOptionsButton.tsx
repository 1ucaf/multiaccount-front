import { Button, Menu, MenuItem } from "@mui/material";
import { FC, MouseEvent, useState } from "react";
import { useNavigate } from "react-router";

type UserOptionsButtonProps = {
  name: string
}

export const UserOptionsButton: FC<UserOptionsButtonProps> = ({ name }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changePassword = () => {
    navigate('/change-password');
    handleClose();
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='outlined'
      >
        {name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={changePassword}>Change Password</MenuItem>
      </Menu>
    </div>
  )
}