import React, {useState, useEffect} from 'react'
import './DoctorView.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import CalendlyEmbed from '../../../mycomponents/calendly/CalendlyEmbed'
import PageLoading from '@/mycomponents/loading/PageLoading'
const API_PATH = import.meta.env.VITE_API_PATH;

const DoctorView = () => {

  const { doctorId } = useParams()
  const [doctorInfo, setDoctorInfo] = useState(null)

  useEffect(() => {
    console.log(name);
    const fetchDoctorInfo = async () => {
      try {
        const response = await axios.get(`${API_PATH}/doctors/view/${doctorId}`)
        setDoctorInfo(response.data)
      } catch (error) {
        console.error('Error fetching doctor information:', error)
      }
    }

    fetchDoctorInfo()
  }, [doctorId])

  // if (!doctorInfo) {
  //   return (<PageLoading />)
  // }

  return (
    <div className='doctorView'>
      <div className='card'>
        <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" />
        <h2>Dr, Samantha Jonas</h2>
        <p>new your somewhere</p>
        <h3>Specialist in cancer</h3>
        <div className='numericals'>
            <div className='experience'>
                <h1>10</h1>
                <p>Years</p>
            </div>
            <div className='experience'>
                <h1>10</h1>
                <p>Years</p>
            </div>
            <div className='experience'>
                <h1>10</h1>
                <p>Years</p>
            </div>
        </div>

        <Button>Talk with Doctor</Button>
        <p>or</p>
        <CalendlyEmbed />
      </div>
    </div>
  )
}

export default DoctorView
