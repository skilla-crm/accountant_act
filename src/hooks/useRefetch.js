import { useEffect } from "react";
import { useDispatch } from "react-redux";
//slice
import { setUpdate, setUpdateList } from "../redux/updateData/slice";

const useRefetch = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (window?.channelData) {
            const { userId, channel } = window.channelData;

            channel.listen(
                "Broadcasting.UserReceivedEvent",
                (e) => {
                    const { id, person, type, action } = e;
                    if (userId !== person.id) {
                        dispatch(setUpdate(id))
                    }

                    if (type === 'ACT') {
                        setTimeout(() => {
                            dispatch(setUpdateList())
                        }, 500)

                    }
                }
            );
        }
    }, [window?.channelData])
}

export default useRefetch;