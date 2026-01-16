"use client"
import { useState } from "react"
import FolderActions from "./FolderActions"
import FileCard from "./FileCard"

export default function FolderTree({ data, basePath, refresh }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="ml-4">
      {Object.entries(data).map(([name, node]) => {
        const currentPath = `${basePath}/${name}`

        if (node.type === "folder") {
          return (
            <div key={currentPath} className="mt-2">
              <div
                className="cursor-pointer font-medium"
                onClick={() => setOpen(!open)}
              >
                📁 {name}
              </div>

              {/* POWER CONTROLS */}
              <FolderActions
                folderPath={currentPath}
                refresh={refresh}
              />

              {open && (
                <FolderTree
                  data={node.children}
                  basePath={currentPath}
                  refresh={refresh}
                />
              )}
            </div>
          )
        }

        // FILE
        return (
          <FileCard
            key={currentPath}
            folder={basePath}
            file={name}
            refresh={refresh}
          />
        )
      })}
    </div>
  )
}
