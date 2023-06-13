import Image from 'next/image';
import React from 'react';

const Loader = () => {
  return (
    <div>
      <Image
        src={'/assets/loading.svg'}
        width={250}
        height={300}
        alt="loading icon"
      />
    </div>
  );
};

export default Loader;
