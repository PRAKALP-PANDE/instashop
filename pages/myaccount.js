import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const MyAccount = () => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem('myuser')) {
            router.push('/')
        }
    }, [router.query])
    return (
        <div>MyAccount</div>
    )
}

export default MyAccount