import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Fade, IconButton, Menu, MenuItem } from '@mui/material';

function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-screen h-14 bg-red-600 flex flex-row flex-none text-white items-center">
      <div className="pl-9 h-full flex items-center">
        <h2 className="text-gray-50 select-none">Scarlet Navigator</h2>
      </div>
      <div className="grow" />
      <button
        role="menuitem"
        type="button"
        className="hover:underline underline-offset-auto mr-10"
      >
        About
      </button>
      <button
        role="menuitem"
        type="button"
        className="hover:underline underline-offset-auto"
      >
        FAQ
      </button>
      <div className="w-fit h-full items-center justify-center flex mx-10 select-none">
        <div>kgm74</div>
        <IconButton
          aria-label="dropdown menu"
          disableRipple
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            color: 'white'
          }}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default NavBar;
