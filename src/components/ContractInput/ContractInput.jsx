import classNames from 'classnames';
import s from './ContractInput.module.scss';

const ContractInput = ({ text, span, disabled }) => {
    return (
        <div className={s.root}>
            <span className={s.sub}>Договор</span>
            <div className={classNames(s.field, disabled && s.field_disabled)}>
                <p>{text}</p>
                <span>{span}</span>
            </div>
        </div>
    )
};

export default ContractInput;