import { getSession } from "@solid-mediakit/auth";
import { signOut } from "@solid-mediakit/auth/client";
import { Show, type VoidComponent } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { authOptions } from "~/server/auth";

export const routeData = () => {
  return createServerData$(async (_, event) => {
    const session = await getSession(event.request, authOptions);
    if (!session) {
      throw redirect("/");
    }
    return session;
  });
};

const Protected: VoidComponent = () => {
  const session = useRouteData<typeof routeData>();
  function clickSignOut() {
    void signOut({
      redirectTo: "/",
      redirect: true,
    });
  }
  return (
    <Show when={session()} keyed>
      {(us) => (
        <main>
          <h1>Protected</h1>
          <Show when={us.user}>
            {(user) => (
              <>
                <Show when={user().image}>{(image) => <img src={image()} />}</Show>
                <span>Hey there {user().name}! You are signed in!</span>
                <button
                  onClick={clickSignOut}
                >
                  Sign Out
                </button>
              </>
            )}
          </Show>
        </main>
      )}
    </Show>
  );
};

export default Protected;
