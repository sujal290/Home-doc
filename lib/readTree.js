import fs from "fs"
import path from "path"

export function readTree(dir) {
  const items = fs.readdirSync(dir)
  const tree = {}

  items.forEach(item => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      tree[item] = {
        type: "folder",
        children: readTree(fullPath)
      }
    } else {
      tree[item] = { type: "file" }
    }
  })

  return tree
}
