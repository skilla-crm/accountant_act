import s from './ButtonsList.module.scss';
import { useEffect, useState } from 'react';
//icons
import { ReactComponent as IconDocument } from '../../assets/icons/iconDocument.svg';
import { ReactComponent as IconDownload } from '../../assets/icons/iconDownload.svg';
//constants
import { BUTTON_TEXT, BUTTON_TEXT_EDO, BUTTON_TEXT_1C, BUTTON_TEXT_EXCEL } from '../../constants/upds';
//Api
import { useGetUpdDownloadMassMutation } from '../../redux/updsApiActions';
//components 
import Button from '../Genegal/Button/Button';
import ButtonSecond from '../Genegal/ButtonSecond/ButtonSecond';

const ButtonsList = ({ type, params }) => {
    const [getUpdDownload, { isLoading }] = useGetUpdDownloadMassMutation();
    const [loadEdo, setLoadEdo] = useState(false);
    const [load1c, setLoad1c] = useState(false);
    const [loadReport, setLoadReport] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setLoadEdo(false)
            setLoad1c(false)
            setLoadReport(false)
            return
        }
    }, [isLoading])


    const handleDownload = async (params) => {
        params.type === 'edo' && setLoadEdo(true);
        params.type === '1c' && setLoad1c(true);
        params.type === 'report' && setLoadReport(true);
        const data = await getUpdDownload({ params }).unwrap()
        const link = document.createElement('a');
        link.href = URL.createObjectURL(data);
        params.type === 'edo' && link.setAttribute('download', `Акты для ЭДО.zip`);
        params.type === '1c' && link.setAttribute('download', `Акты для 1С.xls`);
        params.type === 'report' && link.setAttribute('download', `Акты отчет.xls`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className={s.root}>
            <ButtonSecond
                handler={() => handleDownload({ ...params, type: 'edo' })}
                buttonText={BUTTON_TEXT_EDO}
                Icon={IconDownload}
                isLoading={loadEdo}
            />

            <ButtonSecond
                handler={() => handleDownload({ ...params, type: '1c' })}
                buttonText={BUTTON_TEXT_1C}
                Icon={IconDownload}
                isLoading={load1c}
            />

            <ButtonSecond
                handler={() => handleDownload({ ...params, type: 'report' })}
                buttonText={BUTTON_TEXT_EXCEL}
                Icon={IconDownload}
                isLoading={loadReport}
            />
        </div>
    )
};

export default ButtonsList;