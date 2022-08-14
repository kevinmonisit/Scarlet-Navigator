/* eslint-disable jsx-a11y/media-has-caption */
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Divider from '@mui/material/Divider/Divider';
import { Auth } from 'firebase/auth';
import React from 'react';
import dashboardMobile from './images/dashboard-mobile.png';
// import dashboard from './images/dashboard-preview.png';
import dashboard from './images/scarletnav-showcase.mp4';
import CustomToolTip from './components/CustomToolTip';

function InfoPiece(props: { title: string, description: string, wide?: boolean, icon?: string }) {
  const { title, description, wide, icon } = props;

  return (
    <div
      className={`flex flex-col text-center w-2/3 text-lg
      ${wide ? '' : 'max-w-xs'}
      mx-5 h-full
      my-4
      sm:my-0
      justify-start
      `}
    >
      <div className={`${icon} mb-8 mt-2`} />
      <div
        className="
        font-extrabold text-xl
        sm:text-md
        "
      >
        {title}
      </div>
      <div
        style={{

        }}
        className="text-gray-700"
      >
        {description}
      </div>
    </div>
  );
}

InfoPiece.defaultProps = {
  wide: false,
  icon: ''
};

function LandingPage(props: { auth: Auth, error: boolean }) {
  const { auth, error } = props;
  // eslint-disable-next-line no-unused-vars
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <div
      className="flex flex-col w-screen"
      style={{
        minWidth: '348px'
      }}
    >
      <div className="font-black w-full text-center py-3 md:py-4 lg:py-5">
        <span className="bg-gradient-to-r bg-clip-text
            from-red-500 to-red-600 text-transparent
            text-lg
            md:text-xl
            lg:text-2xl
            "
        >
          Scarlet Navigator
        </span>
      </div>
      {/* <Divider /> */}
      <div className="w-full grow flex flex-col mb-10">
        <div className="font-black text-5xl lg:text-6xl px-8 text-center mt-20">
          Plan Your Way to Success.
          <br />
          Graduate a
          {' '}
          <span
            className="bg-gradient-to-r bg-clip-text
            from-red-400 to-red-700 text-transparent"
          >
            Scarlet Knight.
          </span>
        </div>
        <div
          className="w-full
          mt-9 mb-10 text-gray-500 text-lg sm:text-xl
          items-center
          justify-center
          flex
          flex-col
          sm:flex-row
          text-center
          px-4
          "
        >
          A modern solution to course planning at Rutgers&nbsp;University
        </div>
        <div className="mb-16 md:mb-20 w-full flex flex-col justify-center items-center">
          <button
            type="button"
            className="h-fit rounded-md py-2 px-6
            text-white bg-red-500 hover:bg-red-700
            duration-300
            transition-all"
            onClick={() => signInWithGoogle([], {
              prompt: 'select_account'
            })}
          >
            <CustomToolTip title="Only emails with a Rutgers domain can register.">
              <div>
                Login with
                {' '}
                <span className="font-semibold">Google</span>
              </div>
              {/* <div className="font-semibold">
                Coming soon
              </div> */}
            </CustomToolTip>
          </button>
          {error && <div className="text-red-600 mt-2">Email must be a Rutgers domain.</div>}
        </div>
        <div className="w-full flex justify-center px-10">
          <img
            alt="User Dashboard"
            src={dashboardMobile}
            className="drop-shadow-lg md:hidden"
            style={{
              borderRadius: '10px',
            }}
          />
          {/* <img
            alt="User Dashboard"
            src={dashboard}
            className="drop-shadow-lg hidden
            md:block
            lg:max-w-screen-lg
            md:max-w-screen-md
            "
            style={{
              borderRadius: '20px'
            }}
          /> */}
          <video
            src={dashboard}
            autoPlay
            controls={false}
            muted
            loop
            className="drop-shadow-lg hidden
            md:block
            lg:max-w-screen-lg
            md:max-w-screen-md
            "
            style={{
              borderRadius: '20px'
            }}
          />
        </div>
      </div>
      {/* <div className="text-center mt-4 font-semibold text-lg sm:text-lg">
        A modern solution to course planning.
      </div> */}
      <Divider variant="middle" />
      <div
        className="
        w-full flex flex-col items-center
        my-6
        sm:flex-row
        md:justify-center
        "
      >
        <InfoPiece
          title="Drag and drop 4,500+ courses into your plan."
          description="Automatic prerequisite validation.
          Core requirement tracking.
          Real-time credit calculation. And more."
          icon="fa-solid fa-diagram-next fa-lg"
        />
        <InfoPiece
          title="Find the best path towards graduation."
          description="Be flexible with your degree. Save up to three plans and customize
            them in the settings."
          icon="fa-solid fa-route fa-xl"
        />
        <InfoPiece
          title="Open source and built with modern technologies."
          description="Written in Typescript, React, Redux, and tailwindcss.
          Hosted on Firebase. (with a MongoDB alternative!)"
          icon="fa-solid fa-book-open fa-lg"
        />
      </div>
      <Divider variant="middle" />
      <div className="flex justify-center">
        <div className="w-10/12 flex justify-center max-w-2xl mb-10">
          <InfoPiece
            title="About"
            description="Scarlet Navigator is a free and open source project
            designed to make planning your courses less confusing and more intuitive.
            By looking at the bigger picture, you'll be more confident about
            your path towards graduation. This site is an independent project and is not
            managed by Rutgers University. If you have questions, feedback, or requests,
            reach out to me by clicking my name down below.
            "
            wide
          />
        </div>
      </div>
      <div className="w-full h-fit py-5
        bg-gray-100 text-center flex flex-col
        justify-center"
      >
        <div className="text-gray-500 flex flex-col items-center">
          <div className="mb-2">
            <a href="https://github.com/kevinmonisit/Scarlet-Navigator">
              <i className="fa-brands fa-github fa-lg" />
            </a>
          </div>
          <span>
            By
            {' '}
            <a href="https://kevinmonisit.me/" className="decoration-1 underline underline-offset-2">Kevin Monisit</a>
          </span>
          <div className="mt-2">
            Not affiliated with Rutgers University.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
