"use client"

export default function TrashFileActions({ trashFile }) {
  async function restoreFile() {
    const restoreTo = prompt("Restore to folder (e.g. Parents/Docs)")
    if (!restoreTo) return

    await fetch("/api/restore", {
      method: "POST",
      body: JSON.stringify({
        trashFile,
        restoreTo
      })
    })

    location.reload()
  }

  return (
    <button
      onClick={restoreFile}
      className="text-green-600 text-sm"
    >
      Restore
    </button>
  )
}
