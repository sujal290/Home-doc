export const runtime = "nodejs"

import fs from "fs"
import path from "path"

export async function POST(req) {
  const { oldPath, newName } = await req.json()

  const oldAbs = path.join(process.cwd(), "public/uploads", oldPath)
  const newAbs = path.join(path.dirname(oldAbs), newName)

  if (!fs.existsSync(oldAbs)) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  fs.renameSync(oldAbs, newAbs)

  return Response.json({ success: true })
}
