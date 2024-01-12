import { RouteSectionProps, useParams } from "@solidjs/router";
import { Show, useContext } from "solid-js";
import { SessionContext } from "@solid-mediakit/auth/client";
import { A } from "@solidjs/router";
import { userId } from "../login";
import { User } from "@auth/core/types";

export default function UsersLayout(props: RouteSectionProps) {
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
                                        <Show when={user().image}>{(image) => <img src={image()} loading="lazy" height={15} />}</Show>
                                        <span> {user().name}</span>
                                    </Show>
                                </>
                            )}
                        </Show>
                    </header>
                    <br />

                    {props.children}
                </>
            )}
        </Show >
    );
}