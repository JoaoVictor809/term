'use client'
import dynamic from "next/dynamic";

const PagTerm = dynamic(() => import('../../../components/screenTerm'), { ssr: false });

export default function termPage() {
    return (
        <div>
            <PagTerm/>
        </div>
    )
}

