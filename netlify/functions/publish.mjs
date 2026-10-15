// "Publish" link for Notion: visiting https://wendychu.design/publish?key=<PUBLISH_KEY>
// triggers a Netlify rebuild, which pulls the latest content from Notion.
//
// Env vars (Netlify → Site configuration → Environment variables):
//   NETLIFY_BUILD_HOOK  the build hook URL (Site configuration → Build & deploy → Build hooks)
//   PUBLISH_KEY         any long random string; keeps strangers from triggering builds

const page = (title, body) =>
  new Response(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#ffede5;color:#1b2c63;font:16px/1.7 -apple-system,system-ui,sans-serif">
<main style="max-width:420px;padding:24px;text-align:center"><h1 style="font:400 32px Georgia,serif">${title}</h1><p>${body}</p></main>`,
    { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } }
  );

export default async (req) => {
  const key = new URL(req.url).searchParams.get("key");
  if (!process.env.PUBLISH_KEY || key !== process.env.PUBLISH_KEY) {
    return page("Not authorised", "This publish link is missing its key.");
  }
  if (!process.env.NETLIFY_BUILD_HOOK) {
    return page("Not set up yet", "Add NETLIFY_BUILD_HOOK to the site's environment variables.");
  }
  const res = await fetch(process.env.NETLIFY_BUILD_HOOK, { method: "POST", body: "{}" });
  if (!res.ok) return page("Something went wrong", `Netlify answered ${res.status}. Try again in a minute.`);
  return page("Publishing…", "Your Notion changes will be live on wendychu.design in about 2 minutes. You can close this tab.");
};

export const config = { path: "/publish" };
