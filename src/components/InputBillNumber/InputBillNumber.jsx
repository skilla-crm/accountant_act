import s from './InputBillNumber.module.scss';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { ReactComponent as IconUpdate } from '../../assets/icons/iconUpdate.svg';
//Api
import { getRandomNumber, getCheckNumber } from '../../api/Api';

const InputBillNumber = ({ sub, number, setNumber, errorEmpity, errorText, resetError, disabled, type, numberActFirst, numberInvoiceFirst, detail }) => {
    const [focus, setFocus] = useState(false);
    const [count, setCount] = useState(0);
    const [load, setLoad] = useState(false)
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false)
    const inputRef = useRef()

    const handleNumberValue = (e) => {
        let reg = /[A-Za-zA-Яа-яЁё]/g;
        const value = e.currentTarget.value;
        setError(false)
        setDone(false)
        setNumber(value.replace(reg, ""))
        resetError()
    }

    const handleFocus = () => {
        setFocus(true)
    }

    const handleBlur = () => {
        type == 1 && Number(numberActFirst) !== Number(number) && getCheckNumber(type, number, detail?.partnership_id)
            .then(res => setError(false))
            .catch(err => { number !== '' && setError(true) })

        type == 2 && Number(numberInvoiceFirst) !== Number(number) && getCheckNumber(type, number, detail?.partnership_id)
            .then(res => setError(false))
            .catch(err => { number !== '' && setError(true) })
        setFocus(false)

    }




    return (
        <div className={s.root}>
            <span className={classNames(s.sub)}>{sub}</span>
            <div className={classNames(s.field, (focus || done) && s.field_focus, (error || errorEmpity) && s.field_error, disabled && s.field_disabled)}>
                <input className={classNames(s.input, load && s.input_hidden)} ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} type='text' onChange={handleNumberValue} value={number || ''} placeholder=''></input>
            </div>

            <span className={classNames(s.text, done && s.text_blue, (error || errorEmpity) && s.text_red)}>
                {done && 'Номер обновлен'}
                {error && 'Этот номер уже занят'}
                {errorEmpity && errorText}
            </span>
        </div>
    )
};

export default InputBillNumber;