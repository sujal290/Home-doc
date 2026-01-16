import fs from "fs/promises"
import path from "path"

export default async function PreviewPage({ params }) {
  const resolvedParams = await params

  if (!resolvedParams?.path) {
    return <div className="p-4">Invalid file path</div>
  }

  const filePath = decodeURIComponent(resolvedParams.path.join("/"))
  const absolutePath = path.join(
    process.cwd(),
    "public/uploads",
    filePath
  )

  const isImage = /\.(jpg|jpeg|png|webp)$/i.test(filePath)
  const isPdf = /\.pdf$/i.test(filePath)
  const isText = /\.(txt|md|json|csv)$/i.test(filePath)

  // TEXT FILE CONTENT
  let textContent = null
  if (isText) {
    textContent = await fs.readFile(absolutePath, "utf8")
  }

  return (
    <div className="p-4">
      {isPdf && (
        <iframe
          src={`/uploads/${filePath}`}
          className="w-full h-screen"
        />
      )}

      {isImage && (
        <img
          src={`/uploads/${filePath}`}
          className="max-w-full mx-auto"
          alt="Preview"
        />
      )}

      {isText && (
        <pre className="bg-black text-green-400 p-4 rounded overflow-auto">
          {textContent}
        </pre>
      )}

      {!isPdf && !isImage && !isText && (
        <div>
          <p className="mb-2">
            Preview not supported for this file type.
          </p>
          <a
            href={`/uploads/${filePath}`}
            download
            className="text-blue-500 underline"
          >
            Download file
          </a>
        </div>
      )}
    </div>
  )
}
