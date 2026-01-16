"use client"

import { useRef } from "react"

export default function DriveActions({ currentPath }) {
  const fileInputRef = useRef(null)

  async function createFolder() {
    const name = prompt("New folder name?")
    if (!name) return

    await fetch("/api/folder/create", {
      method: "POST",
      body: JSON.stringify({
        parentPath: currentPath,
        folderName: name
      })
    })

    location.reload()
  }

  async function deleteFolder() {
    const ok = confirm(
      "Delete this folder and EVERYTHING inside it?"
    )
    if (!ok) return

    await fetch("/api/folder/delete", {
      method: "POST",
      body: JSON.stringify({
        folderPath: currentPath
      })
    })

    location.href = "/"
  }

  async function renameItem(oldPath) {
  const newName = prompt("Enter new name")
  if (!newName) return

  await fetch("/api/rename", {
    method: "POST",
    body: JSON.stringify({ oldPath, newName })
  })

  location.reload()
}


  async function uploadFile(e) {
    e.preventDefault()

    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      alert("Please select a file first")
      return
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("folderPath", currentPath)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    })

    if (!res.ok) {
      alert("Upload failed")
      return
    }

    fileInputRef.current.value = ""
    location.reload()
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      <button
        onClick={createFolder}
        className="border px-3 py-1 rounded"
      >
        ➕ New Folder
      </button>

      <form onSubmit={uploadFile} className="flex gap-2 items-center">
        <input
          ref={fileInputRef}
          type="file"
          className="text-sm"
        />
        <button className="border px-3 py-1 rounded">
          ⬆ Upload File
        </button>
      </form>

      <button
        onClick={deleteFolder}
        className="border px-3 py-1 rounded text-red-600"
      >
        🗑 Delete Folder
      </button>
    </div>
  )
}
