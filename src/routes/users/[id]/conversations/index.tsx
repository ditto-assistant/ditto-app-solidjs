import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Show } from "solid-js";
import { SolidMarkdown } from "solid-markdown";

export function routeData() {
    return createServerData$(async () => {
        const rsp = await fetch('http://localhost:32032/users/1/conversations/1/chats')
        const jason = await rsp.json()
        console.log(jason)
        return jason
    })
}

const Conversations = () => {
    const rd = useRouteData<typeof routeData>();
    return <>
        <Show when={rd()[2]}>
            {(rd0) => <SolidMarkdown>{rd0()[3]}</SolidMarkdown>}
        </Show>
        <p>Hello World </p>
    </>
}

export default Conversations;