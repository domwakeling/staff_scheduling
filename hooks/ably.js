// Re-write of the hook available at https://github.com/ably-labs/react-hooks
import Ably from "ably/promises";
import { useEffect } from 'react';

const ably = new Ably.Realtime.Promise({ authUrl: `${process.env.NEXT_PUBLIC_URL}/api/ably/createTokenRequest` });

export function useChannel(channelName, callbackOnMessage) {

    const channel = ably.channels.get(channelName);

    const onMount = async () => {
        await channel.subscribe(msg => { callbackOnMessage(msg); });;
    }

    const onUnmount = async () => {
        await channel.unsubscribe.apply(channel);

        setTimeout(async () => {
            // React is very mount/unmount happy, so if we just detatch the channel
            // it's quite likely it will be reattached again by a subsequent onMount calls.
            // To solve this, we set a timer, and if all the listeners have been removed, we know that the component
            // has been removed for good and we can detatch the channel.

            if (channel.listeners.length === 0) {
                await channel.detach();
            }
        }, 2500);
    }

    const useEffectHook = () => {
        onMount();
        return () => { onUnmount(); };
    };

    useEffect(useEffectHook);

    return [channel, ably];
}