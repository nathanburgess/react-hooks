import { useEffect } from 'react'

export const useWhenVisible = (
    target,
    callback,
    options = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
    }
) => {
    useEffect(() => {
        const current = target.current
        if (!current) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) callback()
        }, options)

        observer.observe(current)

        return () => observer.unobserve(current)
    }, [target, callback, options])
}
