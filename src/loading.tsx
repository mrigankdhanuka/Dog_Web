export function Loading() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }