import s from './Detail.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
//Api
import { useGetUpdQuery } from '../../redux/updsApiActions';
//slice
import {
    setCustomer,
    setDetail,
    setNumberBill,
    setDate,
    setOrders,
    setDraft,
    setSignatory
} from '../../redux/mainInfo/slice';
import { setPositions } from '../../redux/positions/slice';
//components
import Upd from '../../components/Upd/Upd';
import SceletonBill from '../../components/SceletonBill/SceletonBill';

const Detail = () => {
    const [anim, setAnim] = useState(false)
    const [type, setType] = useState('detail')
    const [isAct, setIsAct] = useState(true)
    const dispatch = useDispatch();
    const location = useLocation();
    const id = location.pathname?.split('/').pop()
    const { data, isLoading, isFetching } = useGetUpdQuery(id);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])


    useEffect(() => {
        if (data) {
            data?.draft === 1 && setType('draft')
            dispatch(setDraft(data?.draft))
            dispatch(setDate(dayjs(data?.date)))
            dispatch(setNumberBill(data?.number))
            dispatch(setOrders(data?.orders))
            
            const rows = data?.rows?.map((el, i) => {
                return {
                    id: i + 1,
                    rate: { id: 999, name_service: el?.description },
                    count: el?.amount,
                    units: el?.unit,
                    code: el?.okei,
                    price: Number(el?.sum_unit),
                    total: Number(el?.sum),
                    date: el?.date
                }
            }
            )
            dispatch(setPositions(rows))
            dispatch(setCustomer(data?.company))
            dispatch(setDetail({ ...data?.partnership, ...data?.details, nds: data?.details?.nds }))

            if (data?.details?.company_contact_id) {
                dispatch(setSignatory({ id: data?.details?.company_contact_id, name: data?.details?.signature }))
            } else if (data?.details?.signature) {
                dispatch(setSignatory({ id: 'another', name: data?.details?.signature }))
            } else {
                dispatch(setSignatory({ id: 'no', name: 'Без подписанта' }))
            }


        }
    }, [data, isFetching])

    return (
        <div className={classNames(s.root, anim && s.root_anim)}>
            <SceletonBill isLoading={isLoading} />
            <Upd id={id} type={type} setType={setType} isAct={isAct}/>
        </div>
    )
};

export default Detail;