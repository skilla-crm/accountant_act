import { useEffect } from "react";

const useRefetchDocsList = (refetch, isReady) => {
    useEffect(() => {
        if (window?.channelData && isReady) {
            const { userId, channel } = window.channelData;

            channel.listen(
                "Broadcasting.UserReceivedEvent",
                (e) => {

                    const { id, person, type } = e;
                    if (isReady && type === 'ACT') {
                        setTimeout(() => {
                            refetch()
                        }, 500)

                    }
                }
            );

            return () => {
                channel.stopListening("Broadcasting.UserReceivedEvent");
            };
        }
    }, [window?.channelData, isReady])
};

export default useRefetchDocsList;