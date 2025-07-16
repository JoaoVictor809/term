'use client'
import dynamic from 'next/dynamic'

const PageMain = dynamic(() => import('../../../components/mainPg'), {ssr:false} )

export default function Register() {
    return(
        <PageMain />
    )
}