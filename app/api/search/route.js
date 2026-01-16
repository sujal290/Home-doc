import path from "path"
import { searchFiles } from "@/lib/search"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")?.toLowerCase()

  if (!q) return Response.json([])

  const base = path.join(process.cwd(), "public/uploads")
  const results = searchFiles(base, q)

  return Response.json(results)
}
