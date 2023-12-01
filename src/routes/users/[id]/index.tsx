import { SessionContext, signOut } from "@solid-mediakit/auth/client";
import { Show, useContext, type VoidComponent } from "solid-js";
import { A } from "solid-start";

const Protected: VoidComponent = () => {
  const session = useContext(SessionContext)
  function clickSignOut() {
    console.log("signing out")
    signOut({
      redirectTo: "/",
      redirect: true,
    });
  }
  return (
    <Show when={session?.()} keyed>
      {(sess) => (
        <main>
          <Show when={sess.user}>
            {(user) => (
              <>
                <h1>{user().name}</h1>
                <button
                  onClick={clickSignOut}
                >
                  Sign Out
                </button>

                <A href="conversations">Conversations</A>

              </>
            )}
          </Show>
        </main>
      )
      }
    </Show >
  );
};

export default Protected;
