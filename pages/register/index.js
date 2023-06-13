'use client';
import Layouts from '@/Layout/Layout';
import styles from '@/styles/form.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
import { useFormik } from 'formik';
import RegisterValidate from '@/validate/RegisterValidate';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Login from '../login';
import Loader from '@/Components/loader';

export const metadata = {
  title: 'Register Page',
  description: 'Tutorial on next-auth',
};
export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const [reveal, setReveal] = useState(false);
  const [loading, isloading] = useState(false);

  const Router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: RegisterValidate,
    onSubmit,
  });
  // storing the user details as an object in the options variable with a post method
  async function onSubmit(values) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };

    // register user details, sending the user details to the fetch route
    const res = await fetch('http://localhost:3000/api/auth/signup', options)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          setReveal(true);
          return response.json().then((data) => {
            const errorMessage = data.message;
            DisplayErrorMessage(errorMessage);
            console.log(errorMessage);
          });
        } else {
          Router.push('http://localhost:3000');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log(res);
  }
  function DisplayErrorMessage(errorMessage) {
    const error = document.getElementById('error');
    error.textContent = errorMessage;
  }

  Router.events.on('routeChangeStart', (url) => {
    console.log('route is changing');
    isloading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    console.log('route is completed');
    isloading(false);
  });
  return (
    <Layouts>
      <section className="w-3/4 mx-auto  flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            A town hall different from bala blu, blue blu bulaba. broom broom
          </p>
        </div>
        <div id="error" className="bg-rose-500 text-slate-300"></div>
        {loading && <Loader />}

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input
              type="username"
              name="username"
              placeholder="username"
              className={styles.input_text}
              {...formik.getFieldProps('username')}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>
          {formik.errors.username && formik.touched.username ? (
            <span className="bg-red-700">{formik.errors.username}</span>
          ) : (
            <span></span>
          )}
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
          {formik.errors.email && formik.touched.email ? (
            <span className="bg-red-700">{formik.errors.email}</span>
          ) : (
            <span></span>
          )}

          <div className={styles.input_group}>
            <input
              type={`${show.password ? 'text' : 'password'}`}
              name="password"
              placeholder="password"
              className={styles.input_text}
              {...formik.getFieldProps('password')}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <span className="bg-red-700">{formik.errors.password}</span>
          ) : (
            <span></span>
          )}

          <div className={styles.input_group}>
            <input
              type={`${show.cpassword ? 'text' : 'password'}`}
              name="cpassword"
              placeholder="confirm password"
              className={styles.input_text}
              {...formik.getFieldProps('cpassword')}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? (
            <span className="bg-red-700">{formik.errors.cpassword}</span>
          ) : (
            <span></span>
          )}

          <div className="input-button">
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </div>
        </form>
        {/* Move to login page */}
        <p className="text-center text-gray-400">
          Have an account ?{' '}
          <Link href="/login" className="text-blue-700">
            Sign in
          </Link>
        </p>
      </section>
    </Layouts>
  );
}
