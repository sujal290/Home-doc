export const runtime = "nodejs"

import fs from "fs"
import path from "path"

export async function POST(req) {
  const { folderPath, fileName } = await req.json()

  const src = path.join(
    process.cwd(),
    "public/uploads",
    folderPath,
    fileName
  )

  const trashDir = path.join(
    process.cwd(),
    "public/uploads/.trash"
  )

  if (!fs.existsSync(trashDir)) fs.mkdirSync(trashDir)

  const dest = path.join(trashDir, `${Date.now()}_${fileName}`)

  fs.renameSync(src, dest)

  return Response.json({ success: true })
}
