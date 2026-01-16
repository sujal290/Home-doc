export default function PreviewPage({ params }) {
  const file = decodeURIComponent(params.file)
  const isImage = /\.(jpg|jpeg|png|webp)$/i.test(file)
  const isPdf = /\.pdf$/i.test(file)

  return (
    <div className="p-4">
      {isPdf && (
        <iframe
          src={`/uploads/${file}`}
          className="w-full h-screen"
        />
      )}

      {isImage && (
        <img
          src={`/uploads/${file}`}
          className="max-w-full mx-auto"
        />
      )}
    </div>
  )
}
