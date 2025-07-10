'use client'
import dynamic from 'next/dynamic'

const PageMain = dynamic(() => import('../../components/mainPg'), {ssr:false} )
export default function Home() {
  return (
    <PageMain />
  )
} 
