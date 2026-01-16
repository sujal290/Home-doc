"use client"

export default function HomeActions() {
  async function createFolder() {
    const name = prompt("New folder name?")
    if (!name) return

    await fetch("/api/folder/create", {
      method: "POST",
      body: JSON.stringify({
        parentPath: "",
        folderName: name
      })
    })

    location.reload()
  }

  return (
    <button
      onClick={createFolder}
      className="border px-4 py-2 rounded mb-6"
    >
      ➕ New Folder
    </button>
  )
}
