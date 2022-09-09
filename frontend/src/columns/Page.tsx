import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import React from 'react';

function BackButtonBar(props: { setCurrentTab: () => void }) {
  const { setCurrentTab } = props;

  return (
    <div
      className="w-full mt-1 select-none hover:underline under decoration-gray-500"
    >
      <IconButton
        onClick={() => { setCurrentTab(); }}
        sx={{
          backgroundColor: 'transparent',
          '&.MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
          },
          paddingTop: '4px'
        }}
        disableRipple
      >
        <ArrowBackIcon
          sx={{
            color: 'gray.500',
            '&.MuiSvgIcon-root:hover': {
              color: 'gray.700'
            }
          }}
        />
      </IconButton>
    </div>
  );
}

// eslint-disable-next-line no-undef
function Page(props: { page: JSX.Element, setCurrentTab: () => void }) {
  const { page, setCurrentTab } = props;
  return (
    <div className="grow h-full">
      <div className="w-full h-full flex flex-col">
        <BackButtonBar setCurrentTab={setCurrentTab} />
      </div>
    </div>
  );
}

export default Page;
