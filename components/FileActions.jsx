"use client"

export default function FileActions({ currentPath, itemName }) {
  async function deleteFile() {
    const ok = confirm("Delete this file?")
    if (!ok) return

    await fetch("/api/file/delete", {
      method: "POST",
      body: JSON.stringify({
        folderPath: currentPath,
        fileName: itemName
      })
    })

    location.reload()
  }

  async function renameFile() {
    const newName = prompt("Enter new name")
    if (!newName) return

    await fetch("/api/rename", {
      method: "POST",
      body: JSON.stringify({
        oldPath: `${currentPath}/${itemName}`,
        newName
      })
    })

    location.reload()
  }

  async function moveFile() {
    const target = prompt("Move to (e.g. Parents/Docs)")
    if (!target) return

    await fetch("/api/move", {
      method: "POST",
      body: JSON.stringify({
        from: `${currentPath}/${itemName}`,
        to: `${target}/${itemName}`
      })
    })

    location.reload()
  }

  return (
    <div className="flex gap-3 text-sm">
      <button onClick={renameFile} className="text-yellow-500">
        Rename
      </button>

      <button onClick={moveFile} className="text-blue-500">
        Move
      </button>

      <button onClick={deleteFile} className="text-red-600">
        Delete
      </button>
    </div>
  )
}
