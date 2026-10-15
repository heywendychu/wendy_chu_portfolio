// Safety net: rebuild once a day so Notion edits go live even if you forget to
// click the publish link. Uses the same NETLIFY_BUILD_HOOK env var.
export default async () => {
  if (!process.env.NETLIFY_BUILD_HOOK) return;
  await fetch(process.env.NETLIFY_BUILD_HOOK, { method: "POST", body: "{}" });
};

export const config = { schedule: "0 11 * * *" }; // 11:00 UTC ≈ 4am Los Angeles
