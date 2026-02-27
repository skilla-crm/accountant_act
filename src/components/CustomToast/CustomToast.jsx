import { ReactComponent as IconClose } from "./assets/iconClose.svg";
import { ReactComponent as IconWarning } from "./assets/iconWarning.svg";
import s from "./CustomToast.module.scss";
import './index.css';
import classNames from "classnames";

const CustomToast = ({ closeToast, message, icon, type, buttonClose }) => {
  const typeClassMap = {
    error: s.notification_error,
    success: s.notification_success,
    email: s.notification_success,
  };
  return (
    <div className={classNames(s.notification, typeClassMap[type])}>
      {icon && <div className={s.icon}>{icon}</div>}
      {type == 'error' && !icon && <div className={s.icon}><IconWarning /></div>}
      <p>{message}</p>
      {buttonClose && <button className={s.close} onClick={closeToast}>
        <IconClose />
      </button>}
    </div>
  );
};

export default CustomToast;
