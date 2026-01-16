export const runtime = "nodejs"

import fs from "fs"
import path from "path"

export async function POST(req) {
  const { folder, file } = await req.json()

  const filePath = path.join(
    process.cwd(),
    "public/uploads",
    folder,
    file
  )

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }

  return Response.json({ success: true })
}
