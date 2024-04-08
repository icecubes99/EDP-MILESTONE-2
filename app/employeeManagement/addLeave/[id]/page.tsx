import React from 'react'
import AddLeave from '@/components/shared/AddLeave'

import Sidebar from "@/components/shared/Sidebar";
import UnivHeader from "@/components/shared/UnivHeader";
import ShowEmployeeDetailsMini from "@/components/shared/ShowEmployeeDetailsMini";


const page = ({ params }: { params: { id: string } }) => {
    return (
        <main>
            <UnivHeader />
            <div className='flex flex-row'>
                <Sidebar />
                <AddLeave params={params} />
            </div>
        </main>
    )
}

export default page