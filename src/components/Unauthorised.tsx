import React from 'react';

const Unauthorised = () => {

   // if (!session)
  //   return (
  //     <div className="font-bold text-lg text-center">
  //       You are not authorized to access this page!
  //       <br />
  //       Please sign in by clicking the button below to gain access.
  //       <br />
  //       <a href="/api/auth/signin?callbackUrl=/all-students" className="btn btn-secondary my-4">
  //         Sign In
  //       </a>
  //     </div>
  //   );

  return (
    <>
      <div className="text-red-700 text-center font-bold text-lg">
        <h1>You are not authorized to access this page!</h1>
        <h2>You are unable to use this resource because of one of three reasons:</h2>
        <br />
        <div className="flex flex-col items-center">
          <p className="border-4 w-fit list-item p-2 my-2">
            You are registered as a teacher but you are currently not signed in.
          </p>
          <p className="border-4 w-fit list-item p-2 my-2">{`You are registered as a student and so can't access a Teacher's resource. `}</p>
          <p className="border-4 w-fit list-item p-2 my-2">{`You are not registered at all. Please contact your Class teacher. `}</p>
        </div>

        <div className="flex flex-col w-fit m-auto sm:gap-5 sm:flex-row">
          <a
            href="/api/auth/signin?callbackUrl=/"
            className="btn btn-primary my-4"
          >
            Sign In
          </a>

          <a href="/" className="btn btn-info my-4">
            Back to HomePage
          </a>
        </div>
      </div>

      
    </>
  );
};

export default Unauthorised;
