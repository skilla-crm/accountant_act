import s from './Header.module.scss';
//components 
import Button from '../Genegal/Button/Button';
//icons
import { ReactComponent as IconDocument } from '../../assets/icons/iconDocument.svg';
//constants
import { BUTTON_TEXT } from '../../constants/upds';

const Header = ({ title, type, handleAddBill }) => {

  return (
    <div className={s.root}>
      <h2>{title}</h2>
      <Button
        type={type}
        handler={handleAddBill}
        buttonText={BUTTON_TEXT}
        Icon={IconDocument}
      />
    </div>
  )
};

export default Header;