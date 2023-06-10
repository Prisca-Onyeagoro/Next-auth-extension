'use client';
import Layout from '@/Layout/Layout';
import styles from '@/styles/form.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useFormik } from 'formik';
import LoginValidate from '@/validate/LoginValidate';

export const metadata = {
  title: 'Login Page',
  description: 'Tutorial on next-auth',
};

export default function Login() {
  const [show, setShow] = useState(false);
  // formik handler for forms
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: LoginValidate,
    onSubmit,
  });
  async function onSubmit(values) {
    console.log(values);
  }
  // handle google signIn
  const HandleGoogleLogin = async () => {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  };
  // handle github signIn
  const HandleGithubLogin = async () => {
    signIn('github', { callbackUrl: 'http://localhost:3000' });
  };
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
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div className={styles.input_group}>
              <input
                type="email"
                name="email"
                placeholder="email"
                className={styles.input_text}
                {...formik.getFieldProps('email')}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
            </div>
            {formik.errors.email & formik.touched.email ? (
              <span>{formik.errors.email}</span>
            ) : (
              <span></span>
            )}
            <div className={styles.input_group}>
              <input
                type={`${show ? 'text' : 'password'}`}
                name="password"
                placeholder="password"
                className={styles.input_text}
                {...formik.getFieldProps('password')}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
            {formik.errors.password & formik.touched.password ? (
              <span>{formik.errors.password}</span>
            ) : (
              <span></span>
            )}

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
              <button
                type="button"
                className={styles.button_custom}
                onClick={HandleGithubLogin}
              >
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
