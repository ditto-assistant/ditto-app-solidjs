import {
  createHandler,
  renderAsync,
  StartServer,
} from "solid-start/entry-server";

import { loadEnv } from "vite";
loadEnv("", process.cwd(), ".env");

export default createHandler(
  renderAsync((event) => <StartServer event={event} />)
);

