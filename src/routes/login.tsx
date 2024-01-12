import { SessionContext, signIn } from "@solid-mediakit/auth/client";
import { Show, useContext } from "solid-js";
import { User } from "@auth/core/types";
import { Navigate } from "@solidjs/router";

export function userId(user: User) {
    return user.email ? user.email : user.id;
}

export default function Home() {
    const session = useContext(SessionContext)

    return (
        <main>
            <h1>Home</h1>
            <Show
                when={session?.()?.user}
                fallback={
                    <>
                        <span>You are not signed in.</span>
                        <button onClick={() => signIn("discord")}>Sign In</button>
                    </>
                }
            >
                {(user) => (<>
                    <Navigate href={`/users/${userId(user())}`} />
                </>
                )}
            </Show>
        </main>
    );
}
