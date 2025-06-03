import s from './Upd.module.scss';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconPreview } from '../../assets/icons/iconPreview.svg';
//Api
import { useGetParametersQuery } from '../../redux/updsApiActions';
//slice
import { setNumberAct } from '../../redux/mainInfo/slice';
import { setPositionsValidation } from '../../redux/validation/slice';
//components
import HeaderDetail from '../HeaderDetail/HeaderDetail';
import MainInfoBlock from '../MainInfoBlock/MainInfoBlock';
import ServicesBlock from '../ServicesBlock/ServicesBlock';


const Upd = ({ id, idInvoice, type, setType }) => {
    const { data: parameters, isLoading: isLoadingParams } = useGetParametersQuery();
    const { customer, detail, numberAct, date } = useSelector((state) => state.mainInfo);
    const { positionsValidation } = useSelector((state) => state.validation);
    const dispatch = useDispatch()



    const handleResetErrorPositions = () => {
        dispatch(setPositionsValidation(true))
    }

    return (
        <div className={s.root}>
            <HeaderDetail id={id} idInvoice={idInvoice} type={type} setType={setType}/>
            <div className={s.container}>
                <div className={s.left}>
                    <MainInfoBlock parameters={parameters} disabled={type === 'detail' || type === 'detail_act'} />
                    <ServicesBlock
                        disabled={type === 'detail'}
                        parameters={parameters}
                        error={!positionsValidation}
                        errorText={'Заполни все поля'}
                        resetError={handleResetErrorPositions}
                    />
                </div>

              {/*   <div className={s.preview}>
                    <IconPreview />
                    <p>Предварительный просмотр в разработке</p>
                </div> */}
            </div>
        </div>
    )
};

export default Upd;