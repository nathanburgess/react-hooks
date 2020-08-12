import { useEffect } from 'react'

export const useOnMount = handler => {
    useEffect(() => {
        handler()
    }, [handler])
}
