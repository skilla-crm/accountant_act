import s from './InputText.module.scss';

const InputText = ({ text, setText }) => {

    const handleText = (e) => {
        const value = e.currentTarget.value;
        setText(value)
    }

    return (
        <input className={s.input} onChange={handleText} value={text || ''}></input>
    )
};

export default InputText;