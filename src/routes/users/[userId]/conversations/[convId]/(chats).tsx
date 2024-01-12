import { A, RouteDefinition, RouteLoadFunc, RouteLoadFuncArgs, action, createAsync, useParams } from "@solidjs/router";
import { For, Show } from "solid-js";
import { SolidMarkdown } from "solid-markdown";

type ChatMsgJson = [number, boolean, string, string];

class ChatMessage {
    id: number;
    isUser: boolean;
    message: string;
    timestamp: string;

    constructor(tuple: ChatMsgJson) {
        [this.id, this.isUser, this.message, this.timestamp] = tuple;
    }
}

// export function routeData({ params }: RouteDataArgs) {
//     return createServerData$(
//         async (s) => {
//             const url = `http://localhost:32032/users/${s.user}/conversations/${s.conv}?order=asc&limit=100`
//             const rsp = await fetch(url)
//             const jason = await rsp.json() as ChatMsgJson[]
//             return jason
//         },
//         {
//             key: () => {
//                 return {
//                     user: params.userId,
//                     conv: params.convId
//                 }

//             },
//         }
//     )
// }

const getChats = (userId: string, convId: string) => {
    return async () => {
        "use server";
        const url = `http://localhost:32032/users/${userId}/conversations/${convId}?order=asc&limit=100`
        const rsp = await fetch(url)
        const jason = await rsp.json() as ChatMsgJson[]
        console.log(jason)
        return jason
    }
}

export const route = {
    load: (args: RouteLoadFuncArgs) => getChats(args.params.userId, args.params.convId),
} satisfies RouteDefinition;

const submitChat = action(async (formData: FormData) => {
    "use server";
    const message = formData.get("message") as string
    const userId = formData.get("userId") as string
    const convId = formData.get("convId") as string
    const url = `http://localhost:32032/users/${userId}/conversations/${convId}/prompt?target=cloud`
    console.log("sending", typeof message, message)
    const rsp = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ prompt: message })
    })
    const jason = await rsp.json()
    console.log(jason)
    return jason
})

export default function Chats() {
    const params = useParams();
    const rd = createAsync(getChats(params.userId, params.convId));

    return <>
        <A href={`/users/${params.userId}/conversations`}>⬅️ Back to conversations</A>
        <Show when={rd()?.[0]}>
            <div class="chat-container">
                <For each={rd()}>
                    {(msg) => <div class={msg[1] ? "msg-user" : "msg-agent"}>
                        <SolidMarkdown>{msg[2]}</SolidMarkdown>
                    </div>}
                </For>
            </div>
            <footer class="footer" >
                <form action={submitChat} method="post" class="chat-input-form">
                    <textarea id="chat_input_textarea" name="message" onKeyDown={(event) => {
                        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                            console.log("ctrl+enter submit")
                            document.getElementById("chatSubmitButton")?.click()
                        }
                    }} />
                    <input type="hidden" name="userId" value={params.userId} />
                    <input type="hidden" name="convId" value={params.convId} />
                    <button type="submit" id="chatSubmitButton" >Send</button>
                </form>
            </footer>
        </Show >
    </>
}
