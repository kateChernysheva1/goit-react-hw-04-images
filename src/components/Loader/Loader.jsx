import { memo } from 'react';
import './Loader.css';
import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className="dots-loading">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default memo(Loader);
