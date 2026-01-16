import fs from "fs"
import path from "path"

export async function POST(req) {
  const { parentPath, folderName } = await req.json()

  const targetPath = path.join(
    process.cwd(),
    "public/uploads",
    parentPath,
    folderName
  )

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true })
  }

  return Response.json({ success: true })
}
