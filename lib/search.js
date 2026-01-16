export const runtime = "nodejs"

import fs from "fs"
import path from "path"

export function searchFiles(dir, query, results = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(dir, item.name)

    if (item.isDirectory()) {
      searchFiles(fullPath, query, results)
    } else if (item.name.toLowerCase().includes(query)) {
      results.push(
        fullPath.replace(
          path.join(process.cwd(), "public/uploads") + "/",
          ""
        )
      )
    }
  }

  return results
}
