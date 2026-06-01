import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { DEMO_SESSION_COOKIE, decodeDemoSession } from "@/lib/demo-auth";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // ─── Mode démo (Supabase non configuré) ──────────────────────────────────
  if (!url || !key) {
    const demoCookie = request.cookies.get(DEMO_SESSION_COOKIE)?.value;
    const session = decodeDemoSession(demoCookie);
    return {
      supabaseResponse,
      user: session ? { id: session.id, email: session.email } : null,
      profile: session
        ? { role: session.role, full_name: session.full_name }
        : null,
    };
  }

  // ─── Mode Supabase ───────────────────────────────────────────────────────
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        supabaseResponse = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          supabaseResponse.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: { role: string; full_name: string | null } | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("user_id", user.id)
      .maybeSingle();
    profile = data;
  }

  return { supabaseResponse, user, profile };
}
