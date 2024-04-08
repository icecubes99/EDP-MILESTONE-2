import GeneratePayroll from '@/components/shared/GeneratePayroll'
import Sidebar from '@/components/shared/Sidebar'
import UnivHeader from '@/components/shared/UnivHeader'
import React from 'react'

const page = () => {
    return (
        <main>
            <UnivHeader />
            <div className='flex flex-row'>
                <Sidebar />
                <div>
                    <GeneratePayroll />
                </div>
            </div>
        </main>
    )
}

export default page