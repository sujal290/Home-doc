
export const runtime = "nodejs"

import { writeFile, mkdir } from "fs/promises"
import fs from "fs"
import path from "path"

export async function POST(req) {
  const formData = await req.formData()
  const file = formData.get("file")
  const folderPath = formData.get("folderPath") || ""

  if (!file) {
    return Response.json({ error: "No file" }, { status: 400 })
  }

  const uploadDir = path.join(
    process.cwd(),
    "public/uploads",
    folderPath
  )

  if (!fs.existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  await writeFile(path.join(uploadDir, file.name), buffer)

  return Response.json({ success: true })
}
