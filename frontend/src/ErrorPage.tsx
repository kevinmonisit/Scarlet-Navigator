import React from 'react';

function ErrorPage(props: { message: string }) {
  const { message } = props;
  return (
    <div className="w-full h-full px-10 text-center font-semibold text-red-500 mt-10">
      {message}
    </div>
  );
}

export default ErrorPage;
