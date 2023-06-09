'use client';
import Layout from '@/Layout/Layout';
import styles from '@/styles/form.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { useSession, signIn, signOut } from 'next-auth/react';

export const metadata = {
  title: 'Login Page',
  description: 'Tutorial on next-auth',
};

const HandleGoogleLogin = async () => {
  signIn('google', { callbackUrl: 'http://localhost:3000' });
};

export default function Login() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Layout>
        <section className="w-3/4 mx-auto  flex flex-col gap-10">
          <div className="title">
            <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
            <p className="w-3/4 mx-auto text-gray-400">
              A town hall different from bala blu, blue blu bulaba.
            </p>
          </div>
          <form className="flex flex-col gap-5">
            <div className={styles.input_group}>
              <input
                type="email"
                name="email"
                placeholder="email"
                className={styles.input_text}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
            </div>
            <div className={styles.input_group}>
              <input
                type={`${show ? 'text' : 'password'}`}
                name="password"
                placeholder="password"
                className={styles.input_text}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
            <div className="input-button">
              <button type="submit" className={styles.button}>
                Login
              </button>
            </div>
            <div className="input-button">
              <button
                type="button"
                onClick={HandleGoogleLogin}
                className={styles.button_custom}
              >
                Sign in with Google{' '}
                <Image src={'/assets/google.svg'} width={20} height={20} />
              </button>
            </div>
            <div className="input-button">
              <button type="button" className={styles.button_custom}>
                Sign in with Github
                <Image src={'/assets/github.svg'} width={25} height={25} />
              </button>
            </div>
          </form>
          {/* Move to register page */}
          <p className="text-center text-gray-400">
            Don't have an account yet?{' '}
            <Link href="/register" className="text-blue-700">
              Sign Up
            </Link>
          </p>
        </section>
      </Layout>
    </>
  );
}
