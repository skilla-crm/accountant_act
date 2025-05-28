import s from './ContractInput.module.scss';

const ContractInput = ({text, span}) => {
    return (
        <div className={s.root}>
            <span className={s.sub}>Договор</span>
            <div className={s.field}>
                <p>{text}</p>
                <span>{span}</span>
            </div>
        </div>
    )
};

export default ContractInput;