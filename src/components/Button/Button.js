import PropTypes from 'prop-types';
import s from './Button.module.css';

function ShowMoreButton({ onClickShowMore }) {
  return (
    <div className={s.Wrapper}>
      <button className={s.Button} type="button" onClick={onClickShowMore}>
        Load more
      </button>
    </div>
  );
}

ShowMoreButton.propTypes = {
  onClickShowMore: PropTypes.func.isRequired,
};

export default ShowMoreButton;
