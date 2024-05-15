import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import useSession from '../../../domain/hook/useSession.tsx';
import { signOut } from 'firebase/auth';
import { auth } from '../../../domain/util/firebase.ts';

export default function AccountMenu() {
    const session = useSession()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        handleClose();
        let port = window.location.port === "" ? "" : `:${window.location.port}`
        let url = `${window.location.protocol}//${window.location.hostname}${port}`
        session.logout();
        signOut(auth);
        window.location.href = url;
    };

    return (
        <div>
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <div className="d-none d-lg-block">
                        <Typography variant="body2" sx={{ color: "white", textTransform: "none" }}>
                            {session?.name ?? ""} ({session?.role ?? ""})
                        </Typography>
                    </div>
                    <AccountCircleIcon style={{ color: "white" }} />
                </Box>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={logout}>
                    <Typography variant="caption">
                        Logout
                    </Typography>
                </MenuItem>
            </Menu>
        </div>
    );
}