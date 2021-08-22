import { useCallback, useEffect } from "react"

export const useDebouncedEffect = (effect: any, delay: any, deps: any) => {
  const callback = useCallback(effect, deps)

  useEffect(() => {
    const handler = setTimeout(() => {
      callback()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [callback, delay])
}
