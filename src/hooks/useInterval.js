import { useEffect, useRef } from 'react'

export const useInterval = (callback, delay) => {
    const ref = useRef()

    useEffect(() => {
        ref.current = callback
    }, [callback])

    useEffect(() => {
        const tick = () => ref.current()

        if (delay !== null) {
            const id = setInterval(tick, delay)
            return () => {
                clearInterval(id)
            }
        }
    }, [delay])
}
