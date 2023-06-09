'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
const page = () => {
  const { data: session } = useSession();
  const HandleSignOut = () => {
    signOut();
  };
  return (
    <div>
      <>{session ? user({ session, HandleSignOut }) : Guest()}</>
    </div>
  );
};

export default page;

function Guest() {
  return (
    <main
      className="container mx-auto text-center bg-green-600 py-20
    "
    >
      <h3 className="text-4xl font-bold">Guest Homepage</h3>
      <div className="flex justify-center">
        <Link
          href={'/login'}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

function user({ session, HandleSignOut }) {
  return (
    <main
      className="container mx-auto text-center bg-green-600 py-20
    "
    >
      <h3 className="text-4xl font-bold">Authorized User Homepage</h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
        <div></div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={HandleSignOut}
          className="mt-5 px-10 py-1 rounded-sm  bg-gray-50"
        >
          Sign Out
        </button>
      </div>
      <div className="flex justify-center">
        <Link
          href={'/profile'}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
        >
          Profile Page
        </Link>
      </div>
    </main>
  );
}
