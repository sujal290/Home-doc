export const runtime = "nodejs"

import fs from "fs"
import path from "path"
import Link from "next/link"
import DriveActions from "@/components/DriveActions"
import FileActions from "@/components/FileActions"
import TrashFileActions from "@/components/TrashFileActions"

export default async function DrivePage({ params }) {
  const resolvedParams = await params
  const folderPathArray = resolvedParams?.path || []

  const relativePath = folderPathArray.join("/")
  const absolutePath = path.join(
    process.cwd(),
    "public/uploads",
    relativePath
  )

  if (!fs.existsSync(absolutePath)) {
    return <div className="p-6">Folder not found</div>
  }

  const items = fs.readdirSync(absolutePath, { withFileTypes: true })
  const folders = items.filter(i => i.isDirectory())
  const files = items.filter(i => i.isFile())

  const breadcrumbs = folderPathArray.map((seg, i) => ({
    name: seg,
    href: "/drive/" + folderPathArray.slice(0, i + 1).join("/")
  }))

  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* Breadcrumbs */}
      <div className="text-sm mb-4 text-gray-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {breadcrumbs.map(b => (
          <span key={b.href}>
            {" / "}
            <Link href={b.href} className="hover:underline">
              {b.name}
            </Link>
          </span>
        ))}
      </div>

      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">
        📁 {folderPathArray.at(-1)}
      </h1>

      {/* CLIENT ACTIONS (Create folder, upload, delete folder) */}
      <DriveActions currentPath={relativePath} />

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* FOLDERS */}
        {folders.map(folder => (
          <Link
            key={folder.name}
            href={`/drive/${relativePath}/${folder.name}`}
            className="border rounded p-4 hover:bg-gray-50"
          >
            📁 {folder.name}
          </Link>
        ))}

        {/* FILES */}
        {files.map(file => (
  <div
    key={file.name}
    className="border rounded p-4 flex flex-col gap-2"
  >
    {/* IF WE ARE IN TRASH */}
    {relativePath === ".trash" ? (
      <>
        <span>🗑️ {file.name}</span>

        <TrashFileActions trashFile={file.name} />
      </>
    ) : (
      <>
        <span>📄 {file.name}</span>

        <div className="flex gap-3 text-sm">
          <Link
            href={`/preview/${relativePath}/${file.name}`}
            className="text-blue-600"
          >
            Open
          </Link>

          <a
            href={`/uploads/${relativePath}/${file.name}`}
            download
            className="text-green-600"
          >
            Download
          </a>
        </div>

        <FileActions
          currentPath={relativePath}
          itemName={file.name}
        />
      </>
    )}
  </div>
))}

      </div>
    </main>
  )
}
