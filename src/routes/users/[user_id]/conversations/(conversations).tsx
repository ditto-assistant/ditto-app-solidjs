
import { createServerData$ } from "solid-start/server";
import { A, RouteDataArgs } from "solid-start";
import { useRouteData } from "solid-start";
import { Show } from "solid-js";
import { For } from "solid-js";


type ConversationJson = [number, string, number, string, string]

class Conversation {
    id: number;
    title: string;
    chatCount: number;
    createdAt: string;
    updatedAt: string;

    constructor(tuple: ConversationJson) {
        [this.id, this.title, this.chatCount, this.createdAt, this.updatedAt] = tuple;
    }

}

export function routeData({ params }: RouteDataArgs) {
    return createServerData$(
        async (s) => {
            const url = `http://localhost:32032/users/${s.user}/conversations`
            const rsp = await fetch(url)
            const jason = await rsp.json() as ConversationJson[]
            return jason
        },
        {
            key: () => {
                return {
                    user: params.user_id,
                }

            },
        }
    )
}

export default function Conversations() {
    const rd = useRouteData<typeof routeData>();
    return <>
        <Show when={rd()?.[0]}>
            <div class="container-convs">
                <For each={rd()}>
                    {(conv) =>
                        <div class="item-conv">
                            <A href={`${conv[0]}/chats`}>{conv[1] ? conv[1] : "Untitled"}</A>
                            <p>Chat count: {conv[2]}</p>
                            <p>Created: {conv[3]}</p>
                            <p>Updated: {conv[4]}</p>
                        </div>}
                </For>
            </div>
        </Show>
    </>
}