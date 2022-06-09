import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Fade, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExploreIcon from '@mui/icons-material/Explore';
import Button, { ButtonProps } from '@mui/material/Button';
import { red } from '@mui/material/colors';

// eslint-disable-next-line no-unused-vars
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#fff',
  // backgroundColor: 'rgb(220 38 38)',
  height: '100%',
  '&:hover': {
    backgroundColor: red[800],
  },
}));

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
    <div className="w-screen h-14 bg-red-600 flex flex-row flex-none text-white items-center z-50">
      <div className="pl-5 h-full flex items-center">
        <h2
          className="text-gray-50 select-none"
          style={{
            fontStyle: 'Roboto',
            fontWeight: 'bold'
          }}
        >
          <ExploreIcon sx={{
            marginBottom: '3px'
          }}
          />
          {' '}
          Scarlet Navigator
        </h2>
      </div>
      <div className="grow" />
      <ColorButton disableRipple>About</ColorButton>
      <ColorButton disableRipple>Feedback</ColorButton>
      <ColorButton disableRipple>FAQ</ColorButton>
      {/* <Button
        role="menuitem"
        type="button"
        variant="text"
      // className="hover:underline underline-offset-auto mr-10"
      >
        About
      </Button> */}
      {/* <button
        role="menuitem"
        type="button"
        className="hover:underline underline-offset-auto"
      >
        FAQ
      </button> */}
      <div className="w-fit h-full items-center justify-center flex mr-5 ml-2 select-none">
        <div
          className="font-semibold"
          style={{
            fontSize: '0.875rem'
          }}
        >
          netID
        </div>
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
