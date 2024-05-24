import express from "express";
import { GithubController } from "./gihtub/controller";
import { GitHubService } from "./services/github.service";
import { DiscordService } from "./services/discord.service";
import { envs } from "../config/envs.adapter";
import { GithubSha256Middleware } from "./middlewares/sha256.middleware";

export class Server {
  private readonly app = express();
  private readonly githubController: GithubController;

  constructor(private readonly port: number) {
    const githubService = new GitHubService();
    const discordService = new DiscordService(envs.DISCORD_WEBHOOK_URL);
    this.githubController = new GithubController(githubService, discordService);
  }

  async start() {
    this.app.use(express.json());

    this.app.use(GithubSha256Middleware.verifySignature);

    this.app.post("/api/github", this.githubController.webhookHandler);

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
