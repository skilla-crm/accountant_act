import s from './Header.module.scss';
//components 
import ButtonsList from '../ButtonsList/ButtonsList';


const Header = ({ title, type }) => {

  return (
    <div className={s.root}>
      <h2>{title}</h2>
     {/*  <ButtonsList
        type={type}
      /> */}
     
    </div>
  )
};

export default Header;