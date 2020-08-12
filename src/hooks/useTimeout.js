import { useEffect, useRef } from 'react'

export const useTimeout = (callback, delay) => {
    const ref = useRef()

    useEffect(() => {
        ref.current = callback
    }, [callback])

    useEffect(() => {
        const tick = () => ref.current()

        if (delay !== null) {
            const id = setTimeout(tick, delay)
            return () => clearTimeout(id)
        }
    }, [delay])
}
