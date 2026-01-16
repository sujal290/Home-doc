"use client"
import { useState } from "react"

export default function UploadBox({ onUpload }) {
  const [folder, setFolder] = useState("Parents")

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    await fetch("/api/upload", {
      method: "POST",
      body: formData
    })

    onUpload()
  }

  return (
    <div className="border-dashed border-2 p-4 rounded">
      <select
        value={folder}
        onChange={e => setFolder(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      >
        <option>Parents</option>
        <option>Me</option>
        <option>Sister-1</option>
        <option>Sister-2</option>
        <option>Common</option>
      </select>

      <input type="file" onChange={handleUpload} />
    </div>
  )
}
