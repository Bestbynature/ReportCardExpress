'use client';

import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PersonAdd from '@mui/icons-material/PersonAdd';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SchoolIcon from '@mui/icons-material/School';
import BackupIcon from '@mui/icons-material/Backup';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
// import MenuIcon from '@mui/icons-material/Menu';
// import LoginIcon from '@mui/icons-material/Login';
// import { signIn, signOut } from 'next-auth/react';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function NavMenu() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <React.Fragment>
      <div
        style={{
          padding: '.5em',
          cursor: 'pointer',
          border: isHovered ? '2px solid grey' : '2px solid transparent',
          borderRadius: '5px',
          transition: 'all .5s ease-in-out',
          backgroundColor: isHovered ? 'lightgrey' : 'initial',
        }}
        onClick={handleClick}
        aria-controls={open ? 'account-menu' : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        Menu Button
      </div>

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
        <MenuItem onClick={() => router.push('/view-student-result')}>
          <ListItemIcon>
            <RemoveRedEyeIcon />
          </ListItemIcon>
          <Typography>View Student Result</Typography>
        </MenuItem>
        <br />

        <Divider />

        <br />

        <MenuItem onClick={() => router.push('/view-class-result')}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          View Class Result
        </MenuItem>
        <br />

        <Divider />
        <br />

        <MenuItem onClick={() => router.push('/add-student-teacher')}>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          Add a Student/Teacher
        </MenuItem>

        <Divider />
        <br />

        <MenuItem onClick={() => router.push('/upload-result')}>
          <ListItemIcon>
            <BackupIcon />
          </ListItemIcon>
          Upload Class Result
        </MenuItem>

        <Divider />
        <br />

        <MenuItem onClick={() => router.push('/all-students')}>
          <ListItemIcon>
            <BackupIcon />
          </ListItemIcon>
          Student and Teachers List
        </MenuItem>

        <Divider />
        <br />
      </Menu>
    </React.Fragment>
  );
}
