import * as crypto from "crypto";
import type { Context } from "@netlify/functions";

const verify_signature = async (req: Request, secret: string) => {
  const WEBHOOK_SECRET = secret;

  const signature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(await req.json())
    .digest("hex");

  const xHubSignature = req.headers.get("x-hub-signature-256") ?? "";

  let trusted = Buffer.from(`sha256=${signature}`, "ascii");
  let untrusted = Buffer.from(xHubSignature, "ascii");
  return crypto.timingSafeEqual(trusted, untrusted);
};

const notify = async (message: string, discordWebhookUrl: string) => {
  const body = {
    content: message,
    embeds: [
      {
        image: {
          url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTFvOXJ5b2tkbzg5MmFpeDd5c2p2andjM3FvMzh6Z3JxZ3kzZW5qdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eImrJKnOmuBDmqXNUj/giphy.gif",
        },
      },
    ],
  };

  const response = await fetch(discordWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.log(`Failed to notify Discord: ${response.statusText}`);
    return false;
  }

  return true;
};

const onStart = (payload: any) => {
  const { starred_at, action, sender, repository } = payload;

  return `${sender.login} ${action} start on ${repository.full_name} at ${starred_at}`;
};

const onIssues = (payload: any) => {
  const { action, issue, repository, sender } = payload;

  if (action === "opened") {
    return `${sender.login} ${action} issue: "${issue.title}" on ${repository.full_name}`;
  }

  if (action === "closed") {
    return `${sender.login} ${action} issue: "${issue.title}" on ${repository.full_name}`;
  }

  if (action === "reopened") {
    return `${sender.login} ${action} issue: "${issue.title}" on ${repository.full_name}`;
  }

  return `Action ${action} is not supported`;
};

export default async (req: Request, context: Context) => {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const webhookSecret = process.env.SECRET_TOKEN;
  let message = "";
  const githubEvent = req.headers.get("x-github-event") || "unknown";
  const payload = await req.json();

  // console.log({ payload });

  if (!webhookSecret) {
    return new Response("Missing secret", { status: 500 });
  }

  if (!discordWebhookUrl) {
    return new Response("Missing Discord webhook URL", { status: 500 });
  }

  // TODO: validate payload on signature validation method

  // const signatureValidated = await verify_signature(req, webhookSecret);
  // if (!signatureValidated) {
  //   return new Response("Invalid signature", { status: 401 });
  // }

  switch (githubEvent) {
    case "star":
      message = onStart(payload);
      break;

    case "issues":
      message = onIssues(payload);
      break;

    default:
      message = `Event ${githubEvent} is not supported`;
  }

  const notified = await notify(message, discordWebhookUrl);

  return notified
    ? new Response("Notified Discord")
    : new Response("Failed to notify Discord", { status: 500 });
};
