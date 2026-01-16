export const runtime = "nodejs"

import fs from "fs"
import path from "path"

export async function POST(req) {
  const { oldPath, newName } = await req.json()

  const oldFullPath = path.join(
    process.cwd(),
    "public/uploads",
    oldPath
  )

  const newFullPath = path.join(
    path.dirname(oldFullPath),
    newName
  )

  fs.renameSync(oldFullPath, newFullPath)

  return Response.json({ success: true })
}
