import { Outlet, useParams } from "solid-start";
import { Show, useContext } from "solid-js";
import { SessionContext } from "@solid-mediakit/auth/client";
import { A } from "solid-start";
import { userId } from "../login";
import { User } from "@auth/core/types";

export default function UsersLayout() {
    const session = useContext(SessionContext)
    const params = useParams()
    const fbIncorrectUser = (user: User) =>
        <div class="error-login">
            <p>Please use your email in the URL!</p>
            <A href={`/users/${userId(user)}`}>Return to your page</A>
        </div>

    return (
        <Show when={session?.()} keyed>
            {(sess) => (
                <>
                    <header>
                        <Show when={sess.user}>
                            {(user) => (
                                <>
                                    <Show when={user().email === params.userId} fallback={fbIncorrectUser(user())}>
                                        <Show when={user().image}>{(image) => <img src={image()} />}</Show>
                                        <span>Hey there {user().name}! You are signed in!</span>
                                    </Show>
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