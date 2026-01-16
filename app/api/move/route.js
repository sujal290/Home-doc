export const runtime = "nodejs"

import fs from "fs"
import path from "path"

export async function POST(req) {
  const { from, to } = await req.json()

  const src = path.join(process.cwd(), "public/uploads", from)
  const dest = path.join(process.cwd(), "public/uploads", to)

  fs.renameSync(src, dest)

  return Response.json({ success: true })
}
