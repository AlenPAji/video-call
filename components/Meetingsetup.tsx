import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const Meetingsetup = ({setisSetupComplete}:{setisSetupComplete:(value:boolean)=>void}) => {
    const [isMicCamToggleOn,setMicCamToggleOn]=useState(false)
    const call=useCall();

    if(!call){
        throw new Error("usecall must be used within stream call component")
    }
    useEffect(()=>{
        if(isMicCamToggleOn){
            call?.camera.disable();
            call?.microphone.disable()
        }else{
            call?.camera.enable();
            call?.microphone.enable()
        }

    },[isMicCamToggleOn,call?.camera,call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col *:items-center justify-center gap-3
    text-white'>
        <h1 className='text-2xl font-bold'>Setup</h1>
        <VideoPreview/>
        <div className='flex h-16 items-center justify-center gap-2
        font-medium'>
            <label className='flex items-center justify-center gap-2 font-medium'>
            <input type="checkbox" checked={isMicCamToggleOn}  onChange={(e)=>setMicCamToggleOn(e.target.checked)}/>
            join with mic and camera off
            </label>
            <DeviceSettings/>
        </div>
        <button className='rounded-md bg-green-500 px-4 py-2.5' onClick={()=>{
            call.join();
            setisSetupComplete(true)
        }}></button>
        
      
    </div>
  )
}

export default Meetingsetup
