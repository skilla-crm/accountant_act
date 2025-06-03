import s from './ButtonsList.module.scss';
//icons
import { ReactComponent as IconDocument } from '../../assets/icons/iconDocument.svg';
import { ReactComponent as IconDownload } from '../../assets/icons/iconDownload.svg';
//constants
import { BUTTON_TEXT, BUTTON_TEXT_EDO, BUTTON_TEXT_1C, BUTTON_TEXT_EXCEL } from '../../constants/upds';
//components 
import Button from '../Genegal/Button/Button';
import ButtonSecond from '../Genegal/ButtonSecond/ButtonSecond';

const ButtonsList = ({ type, handleAddBill }) => {

    const handleDownloadForEdo = () => {
        console.log('эдо')
    }

    const handleDownloadFor1C = () => {
        console.log('1c')
    }

    const handleDownloadExcel = () => {
        console.log('эксель')
    }

    return (
        <div className={s.root}>
            <ButtonSecond
                handler={handleDownloadForEdo}
                buttonText={BUTTON_TEXT_EDO}
                Icon={IconDownload}
                isLoading={false}
            />

            <ButtonSecond
                handler={handleDownloadFor1C}
                buttonText={BUTTON_TEXT_1C}
                Icon={IconDownload}
                isLoading={false}
            />

            <ButtonSecond
                handler={handleDownloadExcel}
                buttonText={BUTTON_TEXT_EXCEL}
                Icon={IconDownload}
                isLoading={false}
            />

        </div>
    )
};

export default ButtonsList;