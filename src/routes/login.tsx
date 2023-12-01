import { SessionContext, signIn } from "@solid-mediakit/auth/client";
import { Show, useContext } from "solid-js";
import { Navigate, } from "solid-start";

export default function Home() {
    const session = useContext(SessionContext)

    return (
        <main>
            <h1>Home</h1>
            <Show
                when={session?.()}
                fallback={
                    <>
                        <span>You are not signed in.</span>
                        <button onClick={() => signIn("discord")}>Sign In</button>
                    </>
                }
            >
                {(sess) => (<>
                    <Navigate href={`/users/${sess().user?.email?.replace(/[.@]/g, '-')}`} />
                </>
                )}
            </Show>
        </main>
    );
}
