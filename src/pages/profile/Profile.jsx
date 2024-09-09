import React, { useState, useEffect } from 'react'
import ProfileCalendar from './ProfileCalendar'
import { PencilLine } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import PageLoading from '@/mycomponents/loading/PageLoading';


const Profile = () => {
  const navigate = useNavigate(); 

  const profileInfo = {
    name: "Tafsir Rahman",
    email: "190041130tafsir@gmail.com",
    imgLink: "https://avatars.githubusercontent.com/u/83116065?v=4",
    age: 24,
  }
  const [profile, setProfile] = useState();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(()=>{
    setProfile(profileInfo);
    setPageLoading(false);
  }, [])

  const editProfile = () => {
    navigate(`/profile/update`, { state: { profile } }); // Navigate to the medicine detail page
  };

  return (
    <div className='bg-gray-200 h-[100vh] flex lg:flex-wrap flex-col lg:flex-row items-center justify-between px-[5vw] pt-[22vw] sm:pt-[14vw] lg:pt-[8vw] xl:pt-[4vw]'>
        {pageLoading?
          <PageLoading />
          :
          <>
          <div className='w-[350px] bg-white p-[30px] rounded-lg mb-[30px]'>
            <div className='flex justify-between mb-[20px]'>
              <p className='font-semibold'>Profile</p>
              <PencilLine className='cursor-pointer' onClick={()=> editProfile()}/>
            </div>
            <img src={profile.imgLink} className='mb-[20px] rounded-md'/>
            <label>Name: </label>
            <p className='text-gray-700 mb-[4%]'>{profile.name}</p>
            <label>Email: </label>
            <p className='text-gray-700 mb-[4%]'>1{profile.email}</p>
            <label>Age: </label>
            <p className='text-gray-700 mb-[4%]'>{profile.age}</p>
          </div>

          <div className='w-[350px] bg-white'>
            <img src="https://avatars.githubusercontent.com/u/83116065?v=4" />
            <label>Name: </label>
            <p className='text-gray-700 mb-[2%]'>Tafsir Rahman</p>
            <label>Email: </label>
            <p className='text-gray-700 mb-[2%]'>190041130tafsir@gmail.com</p>
            <label>Age: </label>
            <p className='text-gray-700 mb-[2%]'>24</p>
          </div>

          <div className='w-[350px] bg-white'>
            <img src="https://avatars.githubusercontent.com/u/83116065?v=4" />
            <label>Name: </label>
            <p className='text-gray-700 mb-[2%]'>Tafsir Rahman</p>
            <label>Email: </label>
            <p className='text-gray-700 mb-[2%]'>190041130tafsir@gmail.com</p>
            <label>Age: </label>
            <p className='text-gray-700 mb-[2%]'>24</p>
          </div>
          </>
        }
    </div>
  )
}

export default Profile
