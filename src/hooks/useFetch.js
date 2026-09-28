import { useEffect, useState, useCallback } from 'react'

export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const load = useCallback(() => {
    setLoading(true); setError(null)
    fetcher()
      .then((r) => setData(r.data))
      .catch((e) => setError(e.response?.data?.error || 'Could not load data.'))
      .finally(() => setLoading(false))
    
    }, deps)

}
