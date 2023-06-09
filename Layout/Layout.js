import styles from '@/styles/layout.module.css';
const Layout = ({ children }) => {
  return (
    <div className="flex  bg-blue-200">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 grid grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.cartoonimg}></div>
        </div>
        <div className="right flex flex-col justify-evenly ">
          <div className="text-center py-40">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
