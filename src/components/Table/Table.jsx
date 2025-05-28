import s from './Table.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
//icons
import { ReactComponent as IconDone } from '../../assets/icons/iconDone.svg';
import { ReactComponent as IconCloseBlue } from '../../assets/icons/iconCloseBlue.svg';
//components
import Tooltip from '../Tooltip/Tooltip';
//utils
import { addSpaceNumber } from '../../utils/addSpaceNumber';



const Table = ({ data }) => {
    return (
        <table className={s.root}>
            <thead>
                <tr>
                    <th className={s.date}>Дата</th>
                    <th className={s.number}>Номер</th>
                    <th className={s.customer}>Заказчик</th>
                    <th className={s.summ}>Сумма, ₽</th>
                    <th className={s.recipient}>Поставщик</th>
                    <th className={s.bill}>Счет поставщика</th>
                    <th className={s.connection}>Связь с заказом</th>
                   {/*  <th className={s.progress}>Прогресс</th>
                    <th className={s.progress}>Прогресс</th> */}
                    <th className={s.button}></th>
                </tr>

            </thead>
            <tbody>


                {data?.map((el) => {
                    return <Row key={el.id} bill={el} />
                })}
            </tbody>
        </table>
    )
};


const Row = ({ bill }) => {
    const [focus, setFocus] = useState(false)
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/detail/${bill?.id}`)
    }

    const handleFocus = () => {
        setFocus(true)
    }

    const handleBlur = () => {
        setFocus(false)
    }
    return (
        <tr onMouseEnter={handleFocus} onMouseLeave={handleBlur} className={s.row} onClick={handleNavigate}>
            <div className={s.border}></div>
            <td className={s.date}>
                <p>{dayjs(bill?.date).format('DD.MM.YY')}</p>
            </td>
            <td className={s.number}>
                <p>{bill?.number}</p>
            </td>
            <td className={s.customer}>
                <p>
                    {bill?.company?.name}
                </p>
                {bill?.company?.lable && <div className={s.lable}>
                    <span>{bill?.company?.lable}</span>
                </div>}
            </td>

            <td className={s.summ}>
                <p>
                    {addSpaceNumber(bill?.sum?.split('.').shift())}<span>.{bill?.sum?.split('.').pop()}</span>
                </p>
            </td>
            <td className={s.recipient}>
                <p>{bill?.partnership?.partnership_name}</p>
            </td>
            <td className={s.bill}>
                {bill?.details?.bank && <p>{bill?.details?.bank}</p>}
                {bill?.details?.rs && <p><sup>*</sup>{String(bill?.details?.rs)?.slice(-4)}</p>}
            </td>
            <td className={s.connection}>
                {bill?.related_order && <IconDone />}
            </td>
            {/* <td className={s.progress}>
                <Progress />
            </td>

            <td className={s.progress}>
                <Progress />
            </td> */}
            <td className={classNames(s.button, focus && s.button_vis)}>
                {/* <IconCloseBlue/> */}
            </td>

        </tr >

    )
};


const Progress = () => {
    return (
        <div className={s.line}>
            <div className={classNames(s.bar, s.bar_active)}>
                <Tooltip />
            </div>
            <div className={classNames(s.bar)}></div>
            <div className={classNames(s.bar)}></div>
        </div>
    )
}

export default Table;