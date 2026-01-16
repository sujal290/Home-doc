"use client"
import { useState } from "react"

export default function FileCard({ folder, file, refresh }) {
  const [renaming, setRenaming] = useState(false)
  const [newName, setNewName] = useState(file)

  async function deleteFile() {
    await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({ folder, file })
    })
    refresh()
  }

  async function renameFile() {
    await fetch("/api/rename", {
      method: "POST",
      body: JSON.stringify({
        folder,
        oldName: file,
        newName
      })
    })
    setRenaming(false)
    refresh()
  }

  return (
    <div className="border rounded p-3">
      {renaming ? (
        <>
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="border p-1 text-sm w-full"
          />
          <button onClick={renameFile} className="text-blue-500 text-xs">
            Save
          </button>
        </>
      ) : (
        <p className="truncate text-sm">{file}</p>
      )}

      <div className="flex gap-2 mt-2 text-xs">
        <a href={`/preview/${folder}/${file}`} className="text-blue-500">
          Preview
        </a>
        <a
          href={`/uploads/${folder}/${file}`}
          download
          className="text-green-500"
        >
          Download
        </a>
        <button onClick={() => setRenaming(true)} className="text-yellow-500">
          Rename
        </button>
        <button onClick={deleteFile} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  )
}
