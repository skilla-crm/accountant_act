import { toast } from "react-toastify";
import { ReactComponent as IconEmail } from '../components/CustomToast/assets/iconEmail.svg';
import CustomToast from '../components/CustomToast/CustomToast';


const SendToast = (type, text) => {
    toast(
        ({ closeToast }) => (
            <CustomToast
                message={text}
                closeToast={closeToast}
                type={type}
                icon={type === 'email' ? <IconEmail /> : null}
                buttonClose={false}
            />
        ),
        {
            autoClose: 2500,
            closeButton: false,
        }
    )
};

export default SendToast;