import s from './MainInfoBlock.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
//components
import DropDown from '../Genegal/DropDown/DropDown';
import Customer from '../Customer/Customer';
import Detail from '../Detail/Detail';
import Contact from '../Contact/Contact';
import InputData from '../InputData/InputData';
import InputBillNumber from '../InputBillNumber/InputBillNumber';
import InputText from '../Genegal/InputText/InputText';
import ContractInput from '../ContractInput/ContractInput';
import DropDownNds from '../DropDownNds/DropDownNds';
import ButtonAdd from '../Genegal/ButtonAdd/ButtonAdd';
import InputListContract from '../Genegal/InputListContract/InputListContract';
import Field from '../Genegal/Field/Field';
//slice
import { setCustomer, setContract, setDetail, setNumberAct, setNumberInvoice, setDate, setSignatory, setNds } from '../../redux/mainInfo/slice';
import { setCustomerValidation, setDetailValidation, setNumberValidation } from '../../redux/validation/slice';



const MainInfoBlock = ({ parameters, disabled, isCreate }) => {
    dayjs.extend(utc)
    const dispatch = useDispatch()
    const { customer, contract, detail, numberAct, numberInvoice, numberActFirst, numberInvoiceFirst, date, orders, signatory, draft, nds } = useSelector((state) => state.mainInfo);
    const { customerValidation, detailValidation, signatoryValidation, numberValidation } = useSelector((state) => state.validation);
    const [detailsList, setDetailsList] = useState([])
    const [signatureList, setSignatureList] = useState([])

    /*  useEffect(() => {
         if (customer.id) {
             customer?.gendir?.replace(/\s+/g, '') === '' ?
                 setSignatureList([{ id: 'no', name: 'Без подписанта' }])
                 :
                 setSignatureList([{ id: 'dir', name: customer?.gendir }, { id: 'no', name: 'Без подписанта' }])
             return
         }
     }, [customer]) */


    useEffect(() => {
        if (contract?.id) {
            contract?.company_signature ?
                setSignatureList([{ id: 'dir', name: contract?.company_signature?.full_name }, { id: 'no', name: 'Без подписанта' }])
                :
                setSignatureList([{ id: 'no', name: 'Без подписанта' }])
            return
        }
    }, [contract])

    useEffect(() => {
        if (customer?.partnership_id) {
            const result = parameters?.partnerships_details?.filter(el => el.partnership_id === customer.partnership_id)
            setDetailsList(result)
        } else {
            setDetailsList(parameters?.partnerships_details)
        }
    }, [customer, parameters])

    /* useEffect(() => {

        if (detail?.partnership_id && customer?.partnership_id && detail?.partnership_id !== customer?.partnership_id) {
            dispatch(setDetail({}))
        }

    }, [customer, detail]) */

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

    console.log(detail)

    return (
        <div className={s.root}>
            <h3>Основная информация</h3>
            <DropDown
                z={5}
                type={'customer'}
                sub={'Заказчик'}
                list={parameters?.companies_2}
                ListItem={Customer}
                activeItem={customer}
                setActiveItem={data => {
                    dispatch(setCustomer(data))
                    dispatch(setContract(data?.contracts?.[0]))
                    const newDetail = parameters?.partnerships_details?.find(el => el.partnership_id === data?.contracts?.[0]?.partnership_id)
                    dispatch(setDetail({ ...data?.contracts?.[0]?.partnership_details, partnership_name: data?.contracts?.[0]?.partnership_name, partnership_id: data?.contracts?.[0]?.partnership_id, nds: newDetail?.nds }))
                    newDetail && dispatch(setNumberAct(newDetail?.act_num))
                    newDetail && dispatch(setNumberInvoice(newDetail?.invoice_num))
                }}
                disabled={disabled || draft === 1}
                error={!customerValidation}
                errorText={'Заказчик не определен'}
                resetError={handleResetErrorCustomer}
                overlay={true}
            />

            <ButtonAdd
                vis={customer?.contracts?.length === 0 && customer?.id && draft === 0}
                counterpartyId={customer?.id}
            />

            <InputListContract
                disabled={disabled || draft === 1}
                list={customer?.contracts || []}
                value={contract}
                vis={customer?.contracts?.length > 0}
                setValue={(data) => {
                    dispatch(setContract(data))

                    console.log(data)

                    const newDetail = parameters?.partnerships_details?.find(el => el.partnership_id === data?.partnership_id)
                    dispatch(setDetail({ ...data?.partnership_details, partnership_name: data?.partnership_name, partnership_id: data?.partnership_id, nds: newDetail?.nds}))
            newDetail && dispatch(setNumberAct(newDetail?.act_num))
            newDetail && dispatch(setNumberInvoice(newDetail?.invoice_num))
                }}
            />

            <Field
                disabled={disabled || draft === 1}
                vis={detail?.partnership_id}
                sub={'Получатель'}
                text={detail?.partnership_name}
                span={detail?.bank ? `${detail?.bank} ${detail?.rs ? ` *${detail?.rs?.slice(-4)}` : ''}` : ''}
            />


            {/*   <DropDown
                z={4}
                type={'detail'}
                sub={'Поставщик'}
                list={detailsList}
                ListItem={Detail}
                activeItem={detail}
                setActiveItem={data => {
                    dispatch(setDetail(data))
                    if (detail?.partnership_id !== data?.partnership_id) {
                        dispatch(setNumberAct(data?.act_num))
                        dispatch(setNumberInvoice(data?.invoice_num))
                    }
                }}
                disabled={disabled}
                error={!detailValidation}
                errorText={'Реквизиты не выбраны'}
                resetError={handleResetErrorDetail}
                overlay={true}
            /> */}

            {/*   <ContractInput
                text={customer?.contract_n}
                span={customer?.contract_date && dayjs(customer?.contract_date).format('DD.MM.YY')}
                disabled={disabled}
            /> */}

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
                overlay={true}
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
                    sub={'Номер акта'}
                    setNumber={data => dispatch(setNumberAct(data))}
                    number={numberAct}
                    numberActFirst={numberActFirst}
                    numberInvoiceFirst={numberInvoiceFirst}
                    errorEmpity={!numberValidation}
                    errorText={'Введи номер'}
                    resetError={handleResetErrorNumber}
                    disabled={disabled}
                    type={1}
                    detail={detail}
                />

                {((numberInvoice !== null && !isCreate) || (detail?.nds > 0 && isCreate)) && <InputBillNumber
                    sub={'Номер счет-фактуры'}
                    setNumber={data => dispatch(setNumberInvoice(data))}
                    number={numberInvoice}
                    numberActFirst={numberActFirst}
                    numberInvoiceFirst={numberInvoiceFirst}
                    errorEmpity={!numberValidation}
                    errorText={'Введи номер'}
                    resetError={handleResetErrorNumber}
                    disabled={disabled}
                    type={2}
                    detail={detail}
                />}
            </div>

            <DropDownNds
                value={nds}
                setValue={(value) => dispatch(setNds(value))}
                disabled={disabled}
            />


            {orders.length > 0 && <div className={s.orders}>
                <p>Связанные заказы</p>
                <ul>
                    {orders?.map((el, i) => {
                        return <li onClick={handleOpenOrder} key={el.id} id={el.id}>
                            <p>{dayjs.utc(el.date).format('DD.MM.YYYY')}{orders[i + 1] ? ', ' : ''}</p>
                        </li>
                    })}
                </ul>

            </div>
            }

        </div>
    )
};

export default MainInfoBlock;