"use client"
import Loader from '@/components/Loader'
import Meetingsetup from '@/components/Meetingsetup'
import { useGetcallbyid } from '@/Hook/getcallbyid'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const Meeting = ({ params:{id} }: { params: { id: string } }) => {
  const {user,isLoaded}=useUser();
  const {call,isCallLoading}=useGetcallbyid(id)
  const [isSetupComplete,setisSetupComplete]=useState(false)
  if(!isLoaded||isCallLoading) return <Loader/>
  return (
    <main className='h-screenvw-full'>
      <StreamCall call={call}>
        <StreamTheme>
         {!isSetupComplete?(<Meetingsetup/>):('Meeting Room')}

        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
