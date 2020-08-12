import { useEffect, useRef } from 'react'

export const useInterval = (callback, delay) => {
    const saved = useRef()

    useEffect(() => {
        saved.current = callback
    }, [callback])

    useEffect(() => {
        function tick() {
            saved.current()
        }

        if (delay !== null) {
            const id = setInterval(tick, delay)
            return () => {
                clearInterval(id)
            }
        }
    }, [delay])
}
