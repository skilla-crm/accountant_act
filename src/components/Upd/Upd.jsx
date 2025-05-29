import s from './Upd.module.scss';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconPreview } from '../../assets/icons/iconPreview.svg';
//Api
import { useGetParametersQuery } from '../../redux/updsApiActions';
//slice
import { setNumberBill } from '../../redux/mainInfo/slice';
import { setPositionsValidation } from '../../redux/validation/slice';
//components
import HeaderDetail from '../HeaderDetail/HeaderDetail';
import MainInfoBlock from '../MainInfoBlock/MainInfoBlock';
import ServicesBlock from '../ServicesBlock/ServicesBlock';


const Upd = ({ id, type, setType }) => {
    const { data: parameters, isLoading: isLoadingParams } = useGetParametersQuery();
    const { customer, detail, numberBill, date } = useSelector((state) => state.mainInfo);
    const { positionsValidation } = useSelector((state) => state.validation);
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(numberBill, parameters?.num)
        numberBill == '' && parameters?.num && dispatch(setNumberBill(parameters?.upd_num))
    }, [parameters])

    const handleResetErrorPositions = () => {
        dispatch(setPositionsValidation(true))
    }

    return (
        <div className={s.root}>
            <HeaderDetail id={id} type={type} setType={setType} />
            <div className={s.container}>
                <div className={s.left}>
                    <MainInfoBlock parameters={parameters} disabled={type === 'detail'} />
                    <ServicesBlock
                        disabled={type === 'detail'}
                        parameters={parameters}
                        error={!positionsValidation}
                        errorText={'Заполни все поля'}
                        resetError={handleResetErrorPositions}
                    />
                </div>

                <div className={s.preview}>
                    <IconPreview />
                    <p>Предварительный просмотр разработке</p>
                </div>
            </div>
        </div>
    )
};

export default Upd;