import { useEffect, useState } from 'react'

export const useFetch = (url, options) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const doFetch = async () => {
            try {
                const res = await fetch(url, options)
                setResponse(await res.json())
            } catch (e) {
                setError(e)
            }
        }
        doFetch().then()
    }, [options, url])

    return { response, error }
}
