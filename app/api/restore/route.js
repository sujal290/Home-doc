export const runtime = "nodejs"

import fs from "fs"
import path from "path"

export async function POST(req) {
  const { trashFile, restoreTo } = await req.json()

  const src = path.join(
    process.cwd(),
    "public/uploads/.trash",
    trashFile
  )

  const dest = path.join(
    process.cwd(),
    "public/uploads",
    restoreTo,
    trashFile.replace(/^\d+_/, "")
  )

  fs.renameSync(src, dest)

  return Response.json({ success: true })
}
