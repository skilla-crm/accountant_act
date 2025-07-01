import s from './Header.module.scss';
//components 
import Button from '../Genegal/Button/Button';
import ButtonsList from '../ButtonsList/ButtonsList';
import { ReactComponent as IconAddBill } from '../../assets/icons/iconAddBill.svg';
//constants
import { BUTTON_TEXT } from '../../constants/upds';


const Header = ({ title, type, params, handleAddAct }) => {

  return (
    <div className={s.root}>
      <h2>{title}</h2>
      <div className={s.buttons}>
        <ButtonsList
          type={type}
          params={params}
        />

        <Button
          type={type}
          handler={handleAddAct}
          buttonText={BUTTON_TEXT}
          Icon={IconAddBill}
        />
      </div>


    </div>
  )
};

export default Header;