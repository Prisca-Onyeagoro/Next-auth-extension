'use client';
import Layouts from '@/Layouts/layouts';
import styles from '@/styles/form.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
export const metadata = {
  title: 'Register Page',
  description: 'Tutorial on next-auth',
};
export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  return (
    <Layouts>
      <section className="w-3/4 mx-auto  flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            A town hall different from bala blu, blue blu bulaba. broom broom
          </p>
        </div>
        <form className="flex flex-col gap-5">
          <div className={styles.input_group}>
            <input
              type="username"
              name="username"
              placeholder="username"
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>
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
              type={`${show.password ? 'text' : 'password'}`}
              name="password"
              placeholder="password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.cpassword ? 'text' : 'password'}`}
              name="cpassword"
              placeholder="confirm password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Register
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
