import SendToast from "./SendToast"

const ErrorHandler = (status) => {
    if (status === 422) {
        SendToast('error', 'Ошибка, проверь корректность введенных данных')
        return
    }

    if (status === 401) {
        SendToast('error', 'Доступ запрещен, необходимо авторизоваться')
        return
    }

    if (status === 403) {
        SendToast('error', 'Не достаточно прав')
        return
    }

    SendToast('error', 'Ошибка, обратись в службу поддержки')
}

export default ErrorHandler;