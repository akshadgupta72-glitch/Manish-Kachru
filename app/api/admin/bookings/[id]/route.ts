import { isAdminEmail } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminStatus } from "@/types/admin";
import { NextResponse } from "next/server";

const allowedStatuses: AdminStatus[] = ["new", "contacted", "confirmed", "closed", "archived"];

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return Boolean(user && isAdminEmail(user.email));
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as { status?: AdminStatus; viewed_at?: string | null };
  const updatePayload: { status?: AdminStatus; viewed_at?: string | null } = {};

  if (body.status) {
    if (!allowedStatuses.includes(body.status)) {
      return NextResponse.json({ ok: false, message: "Invalid booking status." }, { status: 400 });
    }
    updatePayload.status = body.status;
  }

  if (Object.prototype.hasOwnProperty.call(body, "viewed_at")) {
    updatePayload.viewed_at = body.viewed_at || new Date().toISOString();
  }

  if (Object.keys(updatePayload).length === 0) {
    return NextResponse.json({ ok: false, message: "No booking updates supplied." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("booking_requests").update(updatePayload).eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("booking_requests").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
