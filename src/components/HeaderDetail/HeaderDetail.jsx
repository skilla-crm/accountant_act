import s from './HeaderDetail.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useUpdateUpdMutation, useCreateActMutation } from '../../redux/updsApiActions';
//icons
import { ReactComponent as IconDoneWhite } from '../../assets/icons/iconDoneWhite.svg'
//slice
import {
    setCustomerValidation,
    setDetailValidation,
    setNumberValidation,
    setPositionsValidation
} from '../../redux/validation/slice';
//components
import Button from '../Genegal/Button/Button';
import Buttons from '../Buttons/Buttons';
import ButtonsEdit from '../ButtonsEdit/ButtonsEdit';
//constants
import { BUTTON_TEXT_CREATE } from '../../constants/upds';

const HeaderDetail = ({ id, idInvoice, type, setType }) => {
    const { customer, contract, detail, signatory, numberAct, numberInvoice, date, nds } = useSelector((state) => state.mainInfo);
    const { positions, total } = useSelector((state) => state.positions);
    const [updateUpd, { isLoading: isLoadingEdit }] = useUpdateUpdMutation();
    const [createBill, { data, isError, isLoading }] = useCreateActMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleValidation = () => {
        const customerValidation = customer?.partnership_id ? true : false;
        const detailValidation = detail?.partnership_id ? true : false;
        const numberValidation = Number(numberAct) !== 0 ? true : false;
        const positionsValidation = positions.every(el => el?.rate?.name_service !== '' && el?.rate?.name_service && Number(el?.count) > 0 && el?.units !== '' && Number(el?.code) > 0 && Number(el?.price) !== '' && Number(el?.total) !== '');
        dispatch(setCustomerValidation(customerValidation))
        dispatch(setDetailValidation(detailValidation))
        dispatch(setNumberValidation(numberValidation))
        dispatch(setPositionsValidation(positionsValidation))

        if (customerValidation && detailValidation && numberValidation && positionsValidation) {
            return true
        } else {
            return false
        }
    }

    const handleCreate = () => {
        const rows = positions?.map(el => {
            return {
                description: el?.rate?.name_service,
                date: '',
                amount: Number(el?.count),
                unit: el?.units,
                okei: Number(el?.code),
                sum_unit: Number(el?.price),
                sum: Number(el?.total)
            }
        })
        const dataForSend = {
            invoice: detail?.nds === 0 ? 0 : 1,
            order_ids: [],
            company_id: customer?.id,
            contract_id: contract?.id,
            partnership_id: detail?.partnership_id,
            date: dayjs(date).format('YYYY-MM-DD'),
            num: Number(numberAct),
            invoice_num: Number(numberInvoice),
            detail_partnership_id: detail?.partnership_id,
           detail_number: detail?.id || detail?.num,
            company_contact_id: signatory.id && signatory.id !== 'dir' && signatory.id !== 'no' && signatory.id !== 'another' ? signatory.id : null,
            signature: signatory.id !== 'no' ? signatory.name : null,
            rows,
            sum: total,
            nds

        }


        if (handleValidation()) {
            createBill(dataForSend)
                .then((data) => {
                    if (data.data.success) {
                        const id = data.data.data.id;
                        navigate(`/detail/${id}`)
                    } else {

                    }
                });
            return
        }
    }



    const handleUpdate = () => {
        const rows = positions?.map(el => {
            return {
                description: el?.rate?.name_service,
                date: '',
                amount: Number(el?.count),
                unit: el?.units,
                okei: Number(el?.code),
                sum_unit: Number(el?.price),
                sum: Number(el?.total)
            }
        })
        const dataForSend = {
            company_id: customer?.id,
            contract_id: contract?.id,
            partnership_id: detail?.partnership_id,
            date: dayjs(date).format('YYYY-MM-DD'),
            num: Number(numberAct),
            invoice_num: Number(numberInvoice),
            detail_partnership_id: detail?.partnership_id,
            detail_number: detail?.id || detail?.num,
            company_contact_id: signatory.id && signatory.id !== 'dir' && signatory.id !== 'no' && signatory.id !== 'another' ? signatory.id : null,
            signature: signatory.id !== 'no' ? signatory.name : null,
            rows,
            sum: total,
            draft: 0,
            nds
        }

        if (handleValidation()) {
            updateUpd({ body: dataForSend, id })
                .then((data) => {
                    if (data.data.success) {
                        setType('detail')
                    } else {

                    }
                });
            return
        }
    }

    return (
        <div className={s.root}>
            {type == 'create' && <h2>Новый Акт №{numberAct} от {dayjs(date).format('DD.MM.YYYY')}</h2>}
            {type == 'draft' && <h2>Новый Акт №{numberAct} от {dayjs(date).format('DD.MM.YYYY')}</h2>}
            {type == 'detail' && <h2>АКТ №{numberAct} от {dayjs(date).format('DD.MM.YYYY')}</h2>}
            {type == 'edit' && <h2>АКТ №{numberAct} от {dayjs(date).format('DD.MM.YYYY')}</h2>}

            {type == 'create' && <Button
                type={'create'}
                handler={handleCreate}
                buttonText={BUTTON_TEXT_CREATE}
                Icon={IconDoneWhite}
                isLoading={isLoading}
            />
            }

            {type == 'draft' && <Button
                type={'create'}
                handler={handleUpdate}
                buttonText={BUTTON_TEXT_CREATE}
                Icon={IconDoneWhite}
                isLoading={isLoading}
            />
            }

            {type === 'detail' && <Buttons
                setType={setType}
                id={id}
                idInvoice={idInvoice}
            />}
            {type === 'edit' && <ButtonsEdit
                setType={setType}
                id={id}
                handleUpdate={handleUpdate}
                isLoading={isLoadingEdit}
            />}

            
        </div>
    )
};

export default HeaderDetail