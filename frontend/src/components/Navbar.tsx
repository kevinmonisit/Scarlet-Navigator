import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton } from '@mui/material';

function NavBar() {
  return (
    <div className="w-screen h-14 bg-red-600 flex flex-row flex-none">
      <div className="pl-9 h-full flex items-center">
        <h2 className="text-gray-50 select-none">Scarlet Navigator</h2>
      </div>
      <div className="grow" />
      <div className="w-fit h-full items-center justify-center flex text-white mx-10 select-none">
        <div>kgm74</div>
        <IconButton
          aria-label="dropdown menu"
          disableRipple
          sx={{
            color: 'white'
          }}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default NavBar;
