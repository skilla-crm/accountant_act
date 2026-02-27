import s from './ProDisabled.module.scss';
import { ReactComponent as BadgePro } from '../../assets/icons/badgePro.svg';
import historyblur from '../../assets/images/historyblur.png';

const ProDisabled = () => {

    const openModalPro = () => {
        document?.getElementById('pro-open')?.click();
    };

    return (
        <div className={s.pro}>
            <h3>История изменений</h3>
            <img src={historyblur} alt='история доступна для про'></img>
            <p onClick={openModalPro}>Доступно только для  <BadgePro /></p>

        </div>
    )
}

export default ProDisabled;