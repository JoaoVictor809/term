'use client'
import dynamic from 'next/dynamic'

// const PageMain = dynamic(() => import('../../components/mainPg'), {ssr:false} )
const PageAuth = dynamic(() => import('../../components/screenAuth'), {ssr:false} )
export default function Home() {
  return (
    <PageAuth />
  )
} 
