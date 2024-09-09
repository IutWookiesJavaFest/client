import Map from '@/mycomponents/map/Map'
import React from 'react'

const Hospital = () => {

    const markerData = [
        {
          doctorName: "Dr. Samantha Jones",
          latitude: 23.8103,
          longitude: 90.4125
        },
        {
          doctorName: "Dr. John Doe",
          latitude: 24.9036,
          longitude: 91.8736
        },
        {
          doctorName: "Dr. Alice Brown",
          latitude: 22.3475,
          longitude: 91.8123
        }
      ]
      
  return (
    <div>
        <Map markers={markerData} />    
    </div>
  )
}

export default Hospital
