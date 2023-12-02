import { Outlet } from "solid-start";
import { Show, useContext } from "solid-js";
import { SessionContext } from "@solid-mediakit/auth/client";

export default function UsersLayout() {
    const session = useContext(SessionContext)
    return (
        <Show when={session?.()} keyed>
            {(sess) => (
                <>
                    <header>
                        <Show when={sess.user}>
                            {(user) => (
                                <>
                                    <Show when={user().image}>{(image) => <img src={image()} />}</Show>
                                    <span>Hey there {user().name}! You are signed in!</span>
                                </>
                            )}
                        </Show>
                    </header>

                    <Outlet />
                </>
            )}
        </Show >
    );
}