// src/hooks/useCountries.ts
import {useState, useEffect} from 'react'
import {Country} from '../../@types/Country'
import {useAuth} from '../../contexts/AuthContext'

export function useCountries(): Country[] {
    const [countries, setCountries] = useState<Country[]>([])
    const {token} = useAuth()

    useEffect(() => {
        async function fetchCountries() {
            try {
                const headers: Record<string, string> = {}
                if (token) headers.Authorization = `Bearer ${token}`

                const res = await fetch('http://localhost:8080/countries', {headers})
                const json = await res.json()
                const list = Array.isArray(json.data) ? (json.data as Country[]) : []
                setCountries(list.sort((a, b) => a.name.localeCompare(b.name)))
            } catch (err) {
                console.error(err)
            }
        }

        fetchCountries()
    }, [token])

    return countries
}
