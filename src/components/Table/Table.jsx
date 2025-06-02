import s from './Table.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
//icons
import { ReactComponent as IconDone } from '../../assets/icons/iconDone.svg';
import { ReactComponent as IconCloseBlue } from '../../assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconInfo } from '../../assets/icons/iconInfo.svg';
import { ReactComponent as IconUp } from '../../assets/icons/iconUp.svg';
//components
/* import Tooltip from '../Tooltip/Tooltip'; */
//utils
import { addSpaceNumber } from '../../utils/addSpaceNumber';



const Table = ({ data }) => {
    const [openTooltip, setOpenTooltip] = useState('');

    const handleOpenTooltip = (e) => {
        const id = e.currentTarget.id;
        setOpenTooltip(id)
    }

    const handleCloseTooltip = () => {
        setOpenTooltip('')
    }

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
                    <th className={s.connection}>Связь с заказом
                        <div className={s.container_tooltip}>
                            <IconInfo
                                onMouseEnter={handleOpenTooltip}
                                onMouseLeave={handleCloseTooltip}
                                id={'pay'}
                                className={s.info}
                            />
                            <Tooltip id={'pay'} open={openTooltip === 'pay'} />
                        </div>
                    </th>
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
                {bill?.type === 1 && <div className={classNames(s.lable, s.lable_act)}>
                    <span>АКТ</span>
                </div>}
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

const Tooltip = ({ open, id }) => {
    return (
        <div className={classNames(s.tooltip, open && s.tooltip_open, id === 'pay' && s.tooltip_pay)}>
            <IconUp />
            {id === 'order' && <p>Показывает наличие привязки счета к заказу</p>}
            {id === 'pay' && <p>Старый функционал будет убран 1 июля 2025</p>}
        </div>
    )
}


const Progress = () => {
    return (
        <div className={s.line}>
            <div className={classNames(s.bar, s.bar_active)}>
                {/*      <Tooltip /> */}
            </div>
            <div className={classNames(s.bar)}></div>
            <div className={classNames(s.bar)}></div>
        </div>
    )
}

export default Table;