import s from './MainInfoBlock.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
//components
import DropDown from '../Genegal/DropDown/DropDown';
import Customer from '../Customer/Customer';
import Detail from '../Detail/Detail';
import Contact from '../Contact/Contact';
import InputData from '../InputData/InputData';
import InputBillNumber from '../InputBillNumber/InputBillNumber';
import InputText from '../Genegal/InputText/InputText';
import ContractInput from '../ContractInput/ContractInput';
//slice
import { setCustomer, setDetail, setNumberBill, setDate, setSignatory } from '../../redux/mainInfo/slice';
import { setCustomerValidation, setDetailValidation, setNumberValidation } from '../../redux/validation/slice';



const MainInfoBlock = ({ parameters, disabled }) => {
    const dispatch = useDispatch()
    const { customer, detail, numberBill, date, orders, signatory, draft } = useSelector((state) => state.mainInfo);
    const { customerValidation, detailValidation, signatoryValidation, numberValidation } = useSelector((state) => state.validation);
    const [detailsList, setDetailsList] = useState([])
    const [signatureList, setSignatureList] = useState([])

    console.log(detail)

    useEffect(() => {
        console.log(customer)
        if (customer.id) {
            customer?.gendir?.replace(/\s+/g, '') === '' ?
                setSignatureList([...customer?.contacts?.filter(el => el.name !== ''), { id: 'no', name: 'Без подписанта' }])
                :
                setSignatureList([{ id: 'dir', name: customer?.gendir }, ...customer?.contacts?.filter(el => el.name !== ''), { id: 'no', name: 'Без подписанта' }])
            return
        }

    }, [customer])

    useEffect(() => {
        if (customer.partnership_id) {
            const result = parameters?.partnerships_details?.filter(el => el.partnership_id === customer.partnership_id)
            setDetailsList(result)
        } else {
            setDetailsList(parameters?.partnerships_details)
        }
    }, [customer, parameters])

    useEffect(() => {

        if (detail.partnership_id && customer.partnership_id && detail.partnership_id !== customer.partnership_id) {
            dispatch(setDetail({}))
        }

    }, [customer, detail])

    const handleResetErrorCustomer = () => {
        dispatch(setCustomerValidation(true))
    }

    const handleResetErrorDetail = () => {
        dispatch(setDetailValidation(true))
    }



    const handleResetErrorNumber = () => {
        dispatch(setNumberValidation(true))
    }

    const handleOpenOrder = (e) => {
        const orderId = e.currentTarget.id;
        window.open(`https://lk.skilla.ru/new/orders/order_detail/${orderId}`, '_blank')
    }
    console.log(signatureList, signatory)


    return (
        <div className={s.root}>
            <h3>Основная информация</h3>
            <DropDown
                z={5}
                type={'customer'}
                sub={'Заказчик'}
                list={parameters?.companies}
                ListItem={Customer}
                activeItem={customer}
                setActiveItem={data => dispatch(setCustomer(data))}
                disabled={disabled || draft === 1}
                error={!customerValidation}
                errorText={'Заказчик не определен'}
                resetError={handleResetErrorCustomer}
            />

            <DropDown
                z={4}
                type={'detail'}
                sub={'Поставщик'}
                list={detailsList}
                ListItem={Detail}
                activeItem={detail}
                setActiveItem={data => dispatch(setDetail(data))}
                disabled={disabled}
                error={!detailValidation}
                errorText={'Реквизиты не выбраны'}
                resetError={handleResetErrorDetail}
            />

            <ContractInput
                text={customer?.contract_n}
                span={customer?.contract_date && dayjs(customer?.contract_date).format('DD.MM.YY')}
                disabled={disabled}
            />

            <DropDown
                z={3}
                type={'signatory'}
                sub={'Подписант плательщика'}
                list={signatureList}
                ListItem={Contact}
                activeItem={signatory}
                setActiveItem={data => dispatch(setSignatory(data))}
                disabled={disabled}
                noActive={signatureList?.length === 0 || !customer?.contacts}
                error={false}
                errorText={'Выбери подписанта'}
            />

            <div className={s.block}>
                <InputData
                    sub={'Дата'}
                    nosub={true}
                    setDate={data => dispatch(setDate(data))}
                    date={date}
                    disabled={disabled}
                />

                <InputBillNumber
                    sub={'Номер'}
                    setNumber={data => dispatch(setNumberBill(data))}
                    number={numberBill}
                    errorEmpity={!numberValidation}
                    errorText={'Введи номер'}
                    resetError={handleResetErrorNumber}
                    disabled={disabled}
                />
            </div>

            {orders.length > 0 && <div className={s.orders}>
                <p>Связанные заказы</p>
                <ul>
                    {orders?.map((el, i) => {
                        return <li onClick={handleOpenOrder} key={el.id} id={el.id}>
                            <p>{dayjs(el.date).format('DD.MM.YYYY')}{orders[i + 1] ? ', ' : ''}</p>
                        </li>
                    })}
                </ul>

            </div>
            }

        </div>
    )
};

export default MainInfoBlock;