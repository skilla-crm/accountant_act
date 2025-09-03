import s from './Upd.module.scss';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useDispatch, useSelector } from 'react-redux';
import iconPreview from '../../assets/icons/iconPreview.png';
import { ReactComponent as BadgePro } from '../../assets/icons/badgePro.svg';
import historyblur from '../../assets/images/historyblur.png';
//Api
import { useGetParametersQuery } from '../../redux/updsApiActions';
//slice
import { setNumberAct, setNumberInvoice } from '../../redux/mainInfo/slice';
import { setPositionsValidation } from '../../redux/validation/slice';
//components
import HeaderDetail from '../HeaderDetail/HeaderDetail';
import MainInfoBlock from '../MainInfoBlock/MainInfoBlock';
import ServicesBlock from '../ServicesBlock/ServicesBlock';
import DocumentFlow from '../DocumentFlow/DocumentFlow';
import History from '../History/History';


const Upd = ({ id, idInvoice, type, setType }) => {
    const ispro = document.getElementById(`root_act`).getAttribute('ispro');
    const { data: parameters, isLoading: isLoadingParams } = useGetParametersQuery();
    const { customer, detail, numberAct, numberInvoice, date } = useSelector((state) => state.mainInfo);
    const { positionsValidation } = useSelector((state) => state.validation);
    const { exchange, logs } = useSelector(state => state.logs)
    const dispatch = useDispatch()

    useEffect(() => {
        numberAct == '' && parameters?.upd_num && dispatch(setNumberAct(parameters?.act_num))
        numberInvoice == '' && parameters?.upd_num && dispatch(setNumberInvoice(parameters?.invoice_num))
    }, [parameters])

    const handleResetErrorPositions = () => {
        dispatch(setPositionsValidation(true))
    }

    const openModalPro = () => {
        document?.getElementById('pro-open')?.click();
    };

    return (
        <div className={s.root}>
            <HeaderDetail id={id} idInvoice={idInvoice} type={type} setType={setType} />
            <div className={s.container}>
                <div className={s.left}>
                    <MainInfoBlock parameters={parameters} disabled={type === 'detail' || type === 'detail_act'} isCreate={type === 'create'} />
                    <ServicesBlock
                        disabled={type === 'detail'}
                        parameters={parameters}
                        error={!positionsValidation}
                        errorText={'Заполни все поля'}
                        resetError={handleResetErrorPositions}
                    />
                </div>

                <div className={s.right}>
                    {(type === 'detail' || type === 'edit') && <DocumentFlow id={id} exchange={exchange} />}
                    <div className={s.preview}>
                        <img src={iconPreview}></img>
                        <p>Предварительный просмотр в разработке</p>
                    </div>
                    {(type === 'detail' || type === 'edit') && ispro === '1' && <History logs={logs} />}
                    {(type === 'detail' || type === 'edit') && ispro === '0' && <div className={s.pro}>
                        <h3>История изменений</h3>
                        <img src={historyblur} alt='мстория доступна для про'></img>
                        <p onClick={openModalPro}>Доступно только для  <BadgePro /></p>

                    </div>}

                </div>
            </div>
        </div>
    )
};

export default Upd;