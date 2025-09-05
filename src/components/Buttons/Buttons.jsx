import s from './Buttons.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import printJS from 'print-js'
//api
import { useGetUpdDownloadMutation, useGetParametersQuery } from '../../redux/updsApiActions';
//constants
import { BUTTON_EDIT, BUTTON_SEND_EMAIL, BUTTON_PRINT, BUTTON_DOWNLOAD } from '../../constants/upds';
//icons
import { ReactComponent as IconMail } from '../../assets/icons/IconMail.svg'
import { ReactComponent as IconEdit } from '../../assets/icons/iconEdit.svg'
import { ReactComponent as IconDelete } from '../../assets/icons/iconDelete.svg'
import { ReactComponent as IconDownload } from '../../assets/icons/iconDownload.svg'
import { ReactComponent as IconPrint } from '../../assets/icons/iconPrint.svg'
import { ReactComponent as IconDoc } from '../../assets/icons/iconDoc.svg'
import { ReactComponent as IconDocPdf } from '../../assets/icons/iconDocPdf.svg'
import { ReactComponent as IconDocDoc } from '../../assets/icons/iconDocDoc.svg'
import { ReactComponent as IconXml } from '../../assets/icons/iconXml.svg'
//components
import Button from '../Genegal/Button/Button';
import ButtonSecond from '../Genegal/ButtonSecond/ButtonSecond';
import ButtonDelete from '../Genegal/ButtonDelete/ButtonDelete';
import ButtonOptions from '../Genegal/ButtonOptions/ButtonOptions';
import ModalDelete from '../ModalDelete/ModalDelete';
import EmailSender from '../EmailSender/EmailSender';
import Notification from '../Genegal/Notification/Notification';

const Buttons = ({ id, idInvoice, setType }) => {
    const { data: parameters } = useGetParametersQuery();
    const { user } = useSelector((state) => state.user);
    const { customer, date, numberAct, numberInvoice, orders } = useSelector((state) => state.mainInfo);
    const [modalDelete, setModalDelete] = useState(false)
    const [modalEmail, setModalEmail] = useState(false)
    const [getUpdDownload, { isLoading }] = useGetUpdDownloadMutation();
    const [loadDownload, setLoadDownload] = useState(false)
    const [loadPrint, setLoadPrint] = useState(false)
    const [notificationOpen, setNotification] = useState({ state: false })
    const [timerId, setTimerId] = useState('')

    const params1 = {
        'sign': 1,
        'format': 'pdf',
    }
    const params2 = {
        'sign': 0,
        'format': 'pdf',
    }
    const params3 = {
        'sign': 0,
        'format': 'docx',
    }

    const params4 = {
        'sign': 0,
        'format': 'xml',
    }

    useEffect(() => {
        if (!isLoading) {
            setLoadDownload(false)
            setLoadPrint(false)
            return
        }
    }, [isLoading])


    const handleDownloadAct = async (params) => {
        setLoadDownload(true)
        const data = await getUpdDownload({ type: 'acts', params, id }).unwrap()
        const link = document.createElement('a');
        link.href = URL.createObjectURL(data);
        link.setAttribute('download', `Акт №${numberAct} от ${dayjs(date).format('DD.MM.YYYY')}.${params.format}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleDownloadInvoice = async (params) => {
        setLoadDownload(true)
        const data = await getUpdDownload({ type: 'invoices', params, id: idInvoice }).unwrap()
        const link = document.createElement('a');
        link.href = URL.createObjectURL(data);
        link.setAttribute('download', `Счет-фактура №${numberInvoice} от ${dayjs(date).format('DD.MM.YYYY')}.${params.format}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handlePrintAct = async (params) => {
        setLoadPrint(true)
        const data = await getUpdDownload({ type: 'acts', params, id }).unwrap()
        printJS(URL.createObjectURL(data))
    }

    const handlePrintInvoice = async (params) => {
        setLoadPrint(true)
        const data = await getUpdDownload({ type: 'invoices', params, id: idInvoice }).unwrap()
        printJS(URL.createObjectURL(data))
    }

    const downloadOptionsActs = [
        {
            id: 1,
            name: 'PDF с печатью',
            icon: IconDocPdf,
            default: true,
            handler: () => handleDownloadAct(params1)
        },

        {
            id: 2,
            name: 'PDF без печати',
            icon: IconDocPdf,
            default: false,
            handler: () => handleDownloadAct(params2)
        },

        {
            id: 3,
            name: 'WORD без печати',
            icon: IconDocDoc,
            default: false,
            handler: () => handleDownloadAct(params3)
        },


        {
            id: 4,
            name: 'XML для ЭДО',
            icon: IconXml,
            default: false,
            handler: () => handleDownloadAct(params4)
        },
    ]

    const downloadOptionsInvoice = [
        {
            id: 1,
            name: 'PDF с печатью',
            icon: IconDocPdf,
            default: false,
            handler: () => handleDownloadInvoice(params1)
        },

        {
            id: 2,
            name: 'PDF без печати',
            icon: IconDocPdf,
            default: false,
            handler: () => handleDownloadInvoice(params2)
        },

        {
            id: 3,
            name: 'WORD без печати',
            icon: IconDocDoc,
            default: false,
            handler: () => handleDownloadInvoice(params3)
        },


        {
            id: 4,
            name: 'XML для ЭДО',
            icon: IconXml,
            default: false,
            handler: () => handleDownloadInvoice(params4)
        },
    ]



    const printOptionsAct = [


        {
            type: 'act',
            id: 2,
            name: 'Без печати',
            icon: IconDoc,
            default: true,
            handler: () => handlePrintAct(params2)
        },

        {
            type: 'act',
            id: 1,
            name: 'С печатью',
            icon: IconDoc,
            default: false,
            handler: () => handlePrintAct(params1)
        }

    ]

    const printOptionsInvoice = [

        {
            type: 'act',
            id: 1,
            name: 'Без печати',
            icon: IconDoc,
            default: false,
            handler: () => handlePrintInvoice(params2)
        },

        {
            type: 'act',
            id: 2,
            name: 'С печатью',
            icon: IconDoc,
            default: false,
            handler: () => handlePrintInvoice(params1)
        }


    ]

    const handleOpenDelete = () => {
        setModalDelete(true)
    }

    const handleEditBill = () => {
        setType('edit')
    }

    const handleSendEmail = () => {
        setModalEmail(true)
    }


    const handleCloseNotification = () => {
        setNotification((prevState) => { return { state: false, type: prevState.type, text: prevState.text } })
    }

    const handleSendEmailSuccess = () => {
        handleCloseNotification()
        clearTimeout(timerId)
        setTimeout(() => {
            setTimerId(setTimeout(() => handleCloseNotification(), 2500));
            setNotification({
                state: true,
                type: 'email',
                text: 'Письмо отправлено'
            })
        }, 200)
    }



    return (
        <div className={s.root}>
            <ButtonDelete
                handler={handleOpenDelete}
                Icon={IconDelete}
                isLoading={false}
            />
            <ButtonSecond
                handler={handleEditBill}
                buttonText={BUTTON_EDIT}
                Icon={IconEdit}
                isLoading={false}
            />

            <ButtonOptions
                handler={() => handleDownloadAct(params1)}
                buttonText={BUTTON_DOWNLOAD}
                Icon={IconDownload}
                isLoading={loadDownload}
                options={downloadOptionsActs}
                options2={idInvoice ? downloadOptionsInvoice : []}
            />

            <ButtonOptions
                handler={() => handlePrintAct(params2)}
                buttonText={BUTTON_PRINT}
                Icon={IconPrint}
                isLoading={loadPrint}
                options={printOptionsAct}
                options2={idInvoice ? printOptionsInvoice : []}
            />


            <Button
                type={'list'}
                handler={handleSendEmail}
                buttonText={BUTTON_SEND_EMAIL}
                Icon={IconMail}
                isLoading={false}
            />

            <ModalDelete id={id} open={modalDelete} setOpen={setModalDelete} />
            <EmailSender
                id={id}
                open={modalEmail}
                setOpen={setModalEmail}
                contacts={customer?.contacts?.filter(el => el.e_mail !== '')}
                date={dayjs(date).format('DD.MM.YYYY')}
                numberAct={numberAct}
                numberInvoice={numberInvoice}
                text={parameters?.act_message}
                formats={[{ id: 1, name: 'PDF с печатью' }, { id: 2, name: 'Word с печатью' }]}
                partnerEmail={parameters?.email}
                handleSendEmailSuccess={handleSendEmailSuccess}
                detailState={orders?.length > 0 ? true : false}
            />

            <Notification
                type={notificationOpen.type}
                text={notificationOpen.text}
                open={notificationOpen.state}
                setOpen={(state) => setNotification({ state })}
            />


        </div>
    )
};

export default Buttons;