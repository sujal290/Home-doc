
// import fs from "fs"
// import path from "path"

// export function readTree(dir) {
//   const items = fs.readdirSync(dir)
//   const tree = {}

//   items.forEach(item => {
//     const fullPath = path.join(dir, item)
//     const stat = fs.statSync(fullPath)

//     if (stat.isDirectory()) {
//       tree[item] = {
//         type: "folder",
//         children: readTree(fullPath)
//       }
//     } else {
//       tree[item] = { type: "file" }
//     }
//   })

//   return tree
// }


export const runtime = "nodejs"

import fs from "fs"
import path from "path"

const UPLOADS_DIR = path.join(process.cwd(), "public/uploads")

export function readTree(dir = UPLOADS_DIR) {
  // 🔥 FIX
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  return entries.map(entry => ({
    name: entry.name,
    type: entry.isDirectory() ? "folder" : "file"
  }))
}

