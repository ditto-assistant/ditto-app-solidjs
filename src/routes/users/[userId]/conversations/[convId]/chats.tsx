import { RouteDataArgs, useParams, useRouteData } from "solid-start";
import { createServerAction$, createServerData$ } from "solid-start/server";
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

export function routeData({ params }: RouteDataArgs) {
    return createServerData$(
        async (s) => {
            const url = `http://localhost:32032/users/${s.user}/conversations/${s.conv}/chats?order=asc&limit=100`
            const rsp = await fetch(url)
            const jason = await rsp.json() as ChatMsgJson[]
            return jason
        },
        {
            key: () => {
                return {
                    user: params.userId,
                    conv: params.convId
                }

            },
        }
    )
}


export default function Chats() {
    const rd = useRouteData<typeof routeData>();
    const [sending, { Form }] = createServerAction$(async (form: FormData, args) => {
        const message = form.get("message") as string
        const userId = form.get("userId") as string
        const convId = form.get("convId") as string
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
    const params = useParams()
    function ismetaKey(e: MouseEvent) {
        if (e.metaKey) {
            console.log("meta key pressed")
        } else {
            console.log("meta key not pressed")
        }
    }

    return <>
        <Show when={rd()?.[0]}>
            <div class="chat-container">
                <For each={rd()}>
                    {(msg) => <div class={msg[1] ? "msg-user" : "msg-agent"}>
                        <SolidMarkdown>{msg[2]}</SolidMarkdown>
                    </div>}
                </For>
            </div>
            <footer class="footer" >
                <Form class="chat-input">
                    <textarea name="message" onKeyDown={(event) => {
                        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                            console.log("ctrl+enter submit")
                            document.getElementById("chatSubmitButton")?.click()
                        }
                    }} />
                    <input type="hidden" name="userId" value={params.userId} />
                    <input type="hidden" name="convId" value={params.convId} />
                    <button type="submit" id="chatSubmitButton">Send</button>
                </Form>
            </footer>
        </Show >
    </>
}
