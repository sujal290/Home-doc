"use client"
import { useEffect, useRef, useState } from "react"

const STORAGE_KEY = "mygharfiles_recent_searches"
const DEBOUNCE_DELAY = 300

export default function SearchBox() {
  const [q, setQ] = useState("")
  const [results, setResults] = useState([])
  const [recent, setRecent] = useState([])
  const [open, setOpen] = useState(false)

  const debounceRef = useRef(null)
  const containerRef = useRef(null)

  /* Load recent searches */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    setRecent(saved)
  }, [])

  /* Live debounced search */
  useEffect(() => {
    if (!q.trim()) {
      setResults([])
      return
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${q}`)
      const data = await res.json()
      setResults(data)
      setOpen(true)

      setRecent(prev => {
        const updated = [q, ...prev.filter(i => i !== q)].slice(0, 10)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(debounceRef.current)
  }, [q])

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Search input */}
      <input
        value={q}
        onChange={e => {
          setQ(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search files..."
        className="border px-3 py-1 w-64"
      />

      {/* RESULTS */}
      {open && results.length > 0 && (
        <div className="absolute z-10 mt-2 w-full border bg-black rounded p-2">
          {results.map(r => (
            <a
              key={r}
              href={`/drive/${r.substring(0, r.lastIndexOf("/"))}`}
              className="block hover:underline text-sm py-1"
              onClick={() => setOpen(false)}
            >
              📄 {r}
            </a>
          ))}
        </div>
      )}

      {/* RECENT SEARCHES */}
      {open && q.trim() === "" && recent.length > 0 && (
        <div className="absolute z-10 mt-2 w-full border bg-black rounded p-2 text-sm">
          <div className="text-gray-400 mb-1">Recent searches</div>
          {recent.map(item => (
            <button
              key={item}
              onClick={() => {
                setQ(item)
                setOpen(false)
              }}
              className="block text-left w-full hover:underline py-1"
            >
              🔍 {item}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
