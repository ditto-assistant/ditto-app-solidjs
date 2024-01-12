
import { RouteDefinition, RouteLoadFuncArgs, createAsync, useParams } from "@solidjs/router";
import { Show } from "solid-js";
import { For } from "solid-js";
import { A } from "@solidjs/router";


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

const getConversations = (userId: string) => {
    return async () => {
        "use server";
        const url = `http://localhost:32032/users/${userId}/conversations`
        const rsp = await fetch(url)
        const jason = await rsp.json() as ConversationJson[]
        console.log(jason)
        return jason
    }
}

export const route = {
    load: (args: RouteLoadFuncArgs) => getConversations(args.params.userId),
} satisfies RouteDefinition;

// export function routeData({ params }: RouteDataArgs) {
//     return createServerData$(
//         async (s) => {
//             const url = `http://localhost:32032/users/${s.user}/conversations`
//             const rsp = await fetch(url)
//             const jason = await rsp.json() as ConversationJson[]
//             console.log(jason)
//             return jason
//         },
//         {
//             key: () => {
//                 return {
//                     user: params.userId,
//                 }

//             },
//         }
//     )
// }

export default function Conversations() {
    const params = useParams();
    const rd = createAsync(getConversations(params.userId));
    return <>
        <Show when={rd()?.[0]}>
            <div class="container-convs">
                <For each={rd()}>
                    {(conv) =>
                        <div class="item-conv">
                            <A href={`${conv[0]}`}>{conv[1] ? conv[1] : "Untitled"}</A>
                            <p>Chat count: {conv[2]}</p>
                            <p>Created: {conv[3]}</p>
                            <p>Updated: {conv[4]}</p>
                        </div>}
                </For>
            </div>
        </Show>
    </>
}