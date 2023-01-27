// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

//@ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

console.log("Hello from Functions!");

serve(async (req) => {
  return new Response(JSON.stringify("salut"), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type, access-control-allow-methods, access-control-allow-origin, access-control-allow-headers",
      "Content-Type": "application/json",
    },
    status: 200,
  });
});
