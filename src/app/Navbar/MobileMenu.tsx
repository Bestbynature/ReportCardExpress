'use client';

import Image from 'next/image';
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SchoolIcon from '@mui/icons-material/School';
import BackupIcon from '@mui/icons-material/Backup';
import LoginIcon from '@mui/icons-material/Login';
import { signIn, signOut } from 'next-auth/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/navigation';


type UserProps = {
  user: {
    image: string;
    name: string;
    email: string;
  };
};

export default function MobileMenu(user: UserProps) {

  const router = useRouter()
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          padding: '1em'
        }}
      >
        <Tooltip title="Menu buttons">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Profile Picture">
          
            <Avatar sx={{ width: 50, height: 50, marginRight: "1.5rem" }}>
              {user && user?.user?.image ? (<Image
                src={user.user.image}
                alt={user.user.name}
                width={50}
                height={50}
                title={user.user.name}
              />) : (
                <AccountCircleIcon sx={{width: 50, height: 50 }} />
              )}
            </Avatar>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>router.push('/view-student-result')}>
          <ListItemIcon>
            <RemoveRedEyeIcon />
          </ListItemIcon>
          <Typography>View Student Result</Typography>
        </MenuItem>
        <br />

        <Divider />

        <br />

        <MenuItem onClick={()=>router.push('/view-class-result')}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          View Class Result
        </MenuItem>
        <br />

        <Divider />
        <br />

        <MenuItem onClick={()=>router.push('/add-student-teacher')}>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          Add a Student/Teacher
        </MenuItem>

        <Divider />
        <br />

        <MenuItem onClick={()=>router.push('/upload-result')}>
          <ListItemIcon>
            <BackupIcon />
          </ListItemIcon>
          Upload Class Result
        </MenuItem>

        <Divider />
        <br />

        {user && user?.user ? (<MenuItem onClick={()=> signOut({callbackUrl: "/"})}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        ) : (
          <MenuItem onClick={()=> signIn()}>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
        
      </Menu>
    </React.Fragment>
  );
}
