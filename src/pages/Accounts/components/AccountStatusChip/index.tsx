import { Chip } from "@mui/material";
import { FC } from "react";

type AccountStatusBadgeProps = { isActive: boolean };
const AccountStatusChip: FC<AccountStatusBadgeProps> = ({ isActive }) => {
  const status = isActive ? "Active" : "Inactive";
  return (
    <Chip
      label={status}
      size="small"
      variant="outlined"
      color={isActive ? "success" : "warning"}
    />
  )
}

export default AccountStatusChip