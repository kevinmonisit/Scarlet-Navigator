import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExploreIcon from '@mui/icons-material/Explore';
import Button, { ButtonProps } from '@mui/material/Button';
import { red } from '@mui/material/colors';

// eslint-disable-next-line no-unused-vars
const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: '#fff',
  // backgroundColor: 'rgb(220 38 38)',
  height: '100%',
  '&:hover': {
    backgroundColor: red[800],
  },
}));

function AboutPopup(props: { open: boolean, handleClose: () => void }) {
  const { open, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        About
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Scarlet Navigator is a drag-and-drop course planner for Rutgers students. It is a
          freely open source project. Visit
          <a href="https://github.com/kevinmonisit/Scarlet-Navigator" className="underline ml-1">github.com/kevinmonisit/Scarlet-Navigator </a>
          for more
          information.
          {' '}
          <br />
          <br />
          <strong>Please note</strong>
          : This is a beta. There are many more features and small improvements to come...
          and many bugs to fix. This site may be down occasionally as I continue to improve
          Scarlet Navigator.
          <br />
          <br />
          <strong>This project is not affiliated with Rutgers University. </strong>
          Email kevin.monisit@rutgers.edu for inquiries and comments, click on the Feedback button,
          or open an issue on Github. If you would like to help (especially with web scraping),
          let me know!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function ChangelogPopup(props: { open: boolean, handleClose: () => void }) {
  const { open, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Changelog
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Based on the feedback and comments that were given, I thought this is the best place to
          showcase upcoming and deployed changes.
          <br />
          <br />
          <strong>Known bugs:</strong>
          <br />
          <ul className="list-disc list-outside ml-5">
            <li>
              Not every class is shown. Physics II is not available.
              Classes that aren&#39;t offered in the Fall are not shown.
            </li>
            <li>
              Some courses count twice for a core requirement when it needs to be
              two different courses
            </li>
            <li>
              Lack of Nintendo 3DS support
            </li>
          </ul>
          <br />
          <strong>Upcoming Changes:</strong>
          <ul className="list-disc list-outside ml-5">
            <li>
              Adding other school core requirements (SEBS, RBS, Pre-med, etc)
            </li>
            <li>
              Prerequisite Validation
            </li>
            <li>
              ...possibly more.
            </li>
          </ul>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

// eslint-disable-next-line react/no-unused-prop-types
function NavBar(props: { name: string | null, auth: any }) {
  const { name, auth } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [changelogOpen, setChangelogOpen] = useState<boolean>(false);

  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAboutClick = () => {
    setAboutOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAboutOpen(false);
    setChangelogOpen(false);
  };

  return (
    <>
      <AboutPopup open={aboutOpen} handleClose={handleClose} />
      <ChangelogPopup
        open={changelogOpen}
        handleClose={handleClose}
      />
      <div
        className="w-screen h-14 flex flex-row
        flex-none text-white items-center z-50
        bg-red-600"
      >
        <div className="pl-5 h-full flex items-center">
          <h2
            className="text-gray-50 select-none"
            style={{
              fontStyle: 'Roboto',
              fontWeight: 'bold',
              textShadow: '0px 3px 4px rgba(0, 0, 0, 0.2)'
            }}
          >
            <ExploreIcon sx={{
              marginBottom: '3px',
            }}
            />
            {' '}
            Scarlet Navigator
          </h2>
          <div className="pl-2 mb-0.5 text-sm">
            (Beta)
          </div>
        </div>
        <div className="grow" />
        <ColorButton onClick={handleAboutClick} disableRipple>About</ColorButton>
        <ColorButton onClick={() => setChangelogOpen(true)} disableRipple>Changelog</ColorButton>
        <ColorButton
          onClick={() => {
            window.open('https://forms.gle/npzgKrJs3wQRLPU4A', '_blank');
          }}
          disableRipple
        >
          Feedback
        </ColorButton>
        {/* <ColorButton disableRipple>FAQ</ColorButton> */}
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
        <div className="w-fit h-full items-center justify-center flex ml-2 select-none">
          <div
            className="font-semibold"
            style={{
              fontSize: '0.875rem'
            }}
          >
            {name?.toUpperCase()}
          </div>
          <IconButton
            aria-label="dropdown menu"
            disableRipple
            aria-controls={openMenu ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleMenuClick}
            sx={{
              color: 'white',
              marginLeft: '-5px'
            }}
          >
            <ArrowDropDownIcon />
          </IconButton>
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          TransitionComponent={Fade}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default NavBar;
