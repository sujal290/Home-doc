// lib/github.js

const OWNER = "sujal290"
const REPO = "Fullstackkgsg"
const BRANCH = "main"

export async function getFolder(path = "") {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`

  const res = await fetch(url, {
    // prevents caching stale file lists
    cache: "no-store"
  })

  if (!res.ok) {
    return []
  }

  return res.json()
}
