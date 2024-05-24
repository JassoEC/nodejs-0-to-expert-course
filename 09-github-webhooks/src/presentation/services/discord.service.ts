export class DiscordService {
  constructor(private readonly discordWebhookUrl: string) {}

  async notify(message: string) {
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

    const response = await fetch(this.discordWebhookUrl, {
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
  }
}
