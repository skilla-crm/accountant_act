import s from './Detail.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
//Api
import { useGetUpdQuery } from '../../redux/updsApiActions';
//hooks
import useRefetchDoc from '../../hooks/useRefetchDoc';
//slice
import {
    setCustomer,
    setDetail,
    setNumberAct,
    setNumberInvoice,
    setNumberActFirst,
    setNumberInvoiceFirst,
    setDate,
    setOrders,
    setDraft,
    setSignatory
} from '../../redux/mainInfo/slice';
import { setPositions } from '../../redux/positions/slice';
import { setExchange, setLogs } from '../../redux/logs/slice';
//components
import Upd from '../../components/Upd/Upd';
import SceletonBill from '../../components/SceletonBill/SceletonBill';

const Detail = () => {
    const [anim, setAnim] = useState(false)
    const [type, setType] = useState('detail')
    const [idInvoice, setIdInvoice] = useState(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const id = location.pathname?.split('/').pop()
    const { data, currentData, isLoading, isFetching, isUninitialized, refetch } = useGetUpdQuery(id);

    const isReady = currentData && !isUninitialized
    useRefetchDoc(id, refetch, isReady)

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
            dispatch(setNumberAct(data?.number))
            dispatch(setNumberInvoice(data?.invoice ? data?.invoice?.number : null))
            dispatch(setNumberActFirst(data?.number))
            dispatch(setNumberInvoiceFirst(data?.invoice ? data?.invoice?.number : null))
            dispatch(setOrders(data?.orders))
            setIdInvoice(data?.invoice?.id ? data?.invoice?.id : null)

            dispatch(setExchange(data?.exchange))
            dispatch(setLogs(data?.logs))

            document.title = `Акт №${data?.number} от ${dayjs(data?.date).format('DD.MM.YYYY')}`

            const rows = data?.rows?.map((el, i) => {
                return {
                    id: i + 1,
                    rate: { id: 999, name_service: el?.description },
                    count: Number(el?.amount),
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
            dispatch(setDetail({ ...data?.partnership, ...data?.details }))

            if (data?.details?.company_contact_id) {
                dispatch(setSignatory({ id: data?.details?.company_contact_id, name: data?.details?.signature }))
            } else if (data?.details?.signature) {
                dispatch(setSignatory({ id: 'another', name: data?.details?.signature }))
            } else {
                dispatch(setSignatory({ id: 'no', name: 'Без подписанта' }))
            }


        }
    }, [data])

    return (
        <div className={classNames(s.root, anim && s.root_anim)}>
            <SceletonBill isLoading={isLoading} />
            <Upd id={id} idInvoice={idInvoice} type={type} setType={setType} />
        </div>
    )
};

export default Detail;