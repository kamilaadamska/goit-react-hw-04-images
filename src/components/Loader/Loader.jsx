import css from './loader.module.css';
import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={css.containerLoader}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#00008b"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};
