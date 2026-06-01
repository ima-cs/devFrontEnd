import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { DEMO_SESSION_COOKIE } from "@/lib/demo-auth";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Supabase non configuré — pas de session à clôturer côté Supabase
  }
  const response = NextResponse.redirect(new URL("/", request.url), {
    status: 303,
  });
  // Toujours nettoyer la session démo (sans effet si elle n'existait pas).
  response.cookies.delete(DEMO_SESSION_COOKIE);
  return response;
}
