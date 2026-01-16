export const runtime = "nodejs"

import path from "path"
import fs from "fs"
import { FAMILY_FOLDERS } from "@/lib/folders"
import { readTree } from "@/lib/readTree"

export async function GET() {
  const baseDir = path.join(process.cwd(), "public/uploads")
  const data = {}

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir)
  }

  FAMILY_FOLDERS.forEach(folder => {
    const folderPath = path.join(baseDir, folder)

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }

    data[folder] = {
      type: "folder",
      children: readTree(folderPath)
    }
  })

  return Response.json(data)
}
