import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const myImportantValue = process.env.MY_IMPORTANT_VALUE;

  if (!myImportantValue) {
    throw "MY_IMPORTANT_VALUE is not set";
  }

  return new Response(myImportantValue);
};
