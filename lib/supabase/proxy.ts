import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // Return early effectively disabling middleware auth checks
  // since we are moving to a static template without backend for now.
  return NextResponse.next({
    request,
  })
}
