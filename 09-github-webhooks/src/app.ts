import { envs } from "./config/envs.adapter";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  const server = new Server(envs.PORT);
  server.start();
}
