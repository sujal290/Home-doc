"use client"
import { useState } from "react"

export default function FolderActions({ folderPath, refresh }) {
  const [newFolder, setNewFolder] = useState("")

  async function createFolder() {
    if (!newFolder) return

    await fetch("/api/folder/create", {
      method: "POST",
      body: JSON.stringify({
        parentPath: folderPath,
        folderName: newFolder
      })
    })

    setNewFolder("")
    refresh()
  }

  async function deleteFolder() {
    const ok = confirm(
      `Delete folder "${folderPath}" and EVERYTHING inside it?`
    )
    if (!ok) return

    await fetch("/api/folder/delete", {
      method: "POST",
      body: JSON.stringify({ folderPath })
    })

    refresh()
  }

  return (
    <div className="flex gap-2 mt-1 text-xs">
      <input
        value={newFolder}
        onChange={e => setNewFolder(e.target.value)}
        placeholder="New folder"
        className="border px-1 rounded"
      />

      <button
        onClick={createFolder}
        className="text-green-600"
      >
        + Add
      </button>

      <button
        onClick={deleteFolder}
        className="text-red-600"
      >
        Delete
      </button>
    </div>
  )
}
