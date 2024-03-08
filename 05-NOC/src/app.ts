import { envs } from "./configs/plugins/envs.plugin";
import { Server } from "./presentation/server";

(() => {
  main();
})();

function main() {
  Server.start();

  // console.log(envs);
}
