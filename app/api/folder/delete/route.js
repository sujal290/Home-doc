export const runtime = "nodejs"

import fs from "fs"
import path from "path"

export async function POST(req) {
  const { folderPath } = await req.json()

  const fullPath = path.join(
    process.cwd(),
    "public/uploads",
    folderPath
  )

  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true })
  }

  return Response.json({ success: true })
}
