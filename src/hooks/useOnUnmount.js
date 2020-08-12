import { useEffect } from 'react'

export const useOnUnmount = handler => {
    useEffect(
        () => () => {
            handler()
        },
        [handler]
    )
}
