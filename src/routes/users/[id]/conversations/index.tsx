import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { For, Show } from "solid-js";
import { SolidMarkdown } from "solid-markdown";

interface ChatMessage {
    chatIndex: number;
    isUser: boolean;
    message: string;
    timestamp: string;
}

type ChatMsgJson = [number, boolean, string, string];

class ChatMessage {
    chatIndex: number;
    isUser: boolean;
    message: string;
    timestamp: string;

    constructor(tuple: ChatMsgJson) {
        [this.chatIndex, this.isUser, this.message, this.timestamp] = tuple;
    }
}


export function routeData() {
    return createServerData$(async () => {
        const rsp = await fetch('http://localhost:32032/users/1/conversations/1/chats?order=asc')
        const jason = await rsp.json() as ChatMsgJson[]
        // console.log(jason)
        return jason
    })
}

const Conversations = () => {
    const rd = useRouteData<typeof routeData>();
    return <>
        <Show when={rd()?.[0]}>
            <div class="chat-container">
                <For each={rd()}>
                    {(msg) => <div class={msg[1] ? "msg-user" : "msg-agent"}>
                        <SolidMarkdown>{msg[2]}</SolidMarkdown>
                    </div>}
                </For>
            </div>
        </Show>
    </>
}

export default Conversations;