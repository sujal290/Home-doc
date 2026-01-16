import fs from "fs"
import path from "path"
import Link from "next/link"
import HomeActions from "@/components/HomeActions"

export default function Home() {
  const uploadsPath = path.join(process.cwd(), "public/uploads")
  const folders = fs
    .readdirSync(uploadsPath, { withFileTypes: true })
    .filter(f => f.isDirectory())
    .map(f => f.name)

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🏠 MyGharFiles</h1>

      {/* CLIENT BUTTON */}
      <HomeActions />

      {/* ROOT FOLDERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {folders.map(folder => (
          <Link
            key={folder}
            href={`/drive/${folder}`}
            className="border rounded p-4 hover:bg-gray-900"
          >
            📁 {folder}
          </Link>
        ))}
      </div>
    </main>
  )
}
