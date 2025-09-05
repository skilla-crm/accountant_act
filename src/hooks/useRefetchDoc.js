import { useEffect } from "react";

const useRefetchDoc = (doc_id, refetch, isReady) => {
    useEffect(() => {
        if (window?.channelData && isReady) {
            const { userId, channel } = window.channelData;

            channel.listen(
                "Broadcasting.UserReceivedEvent",
                (e) => {
                    const { id, person, type, action } = e;
                    if (isReady && id == doc_id && userId !== person.id) {
                        refetch()
                    }
                }
            );

            return () => {
                channel.stopListening("Broadcasting.UserReceivedEvent");
            };
        }
    }, [window?.channelData, isReady])
}

export default useRefetchDoc;