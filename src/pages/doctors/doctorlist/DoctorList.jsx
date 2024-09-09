import React, { useState } from 'react'
import './DoctorList.css'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 
import {SquarePlus} from 'lucide-react';
import { Button } from '@/components/ui/button';

const DoctorList = () => {
  
  const DoctorListJson = [
    {
        id: 1,
        name: "Dr. John Smith",
        specialist: "Cardiologist",
        address: "123 Heart Ave, Cardio City, CA 90210",
        fee: 200
    },
    {
      id: 2,
        name: "Dr. Emily Brown",
        specialist: "Dermatologist",
        address: "456 Skin St, Derm Town, NY 10001",
        fee: 150
    },
    {
      id: 3,
        name: "Dr. Michael Johnson",
        specialist: "Pediatrician",
        address: "789 Child Ln, Kidsville, TX 73301",
        fee: 120
    },
    {
      id: 4,
        name: "Dr. Sarah Wilson",
        specialist: "Neurologist",
        address: "321 Brain Rd, Neuro City, FL 33101",
        fee: 250
    }
  ];

  //search filter
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filter the doctor list based on search input
  const filteredDoctors = DoctorListJson.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    doctor.specialist.toLowerCase().includes(searchInput.toLowerCase()) ||
    doctor.address.toLowerCase().includes(searchInput.toLowerCase())
  );


  const navigate = useNavigate(); // Initialize useNavigate
  
  const createDoctor = () => {
    navigate(`/doctors/create`);
  };

  // Function to handle navigation to the doctor's detailed view
  const navigateToDoctor = (id) => {
    navigate(`/doctors/view/${id}`);
  };

  return (
    <div className='doctorList'>
      <h1>List of Doctors</h1>
      <div className='searchBar'>
        <FaSearch/>
        <input type="text" value={searchInput} onChange={handleSearchInputChange} placeholder='Search doctor by name, keyword'/>
      </div>

      <Button className="mb-[5vw] md:mb-[3vw] lg:mb-[2vw]" onClick={()=> createDoctor()}><SquarePlus className="mr-[2%]"/>Add Medicine</Button>
      <Table className="cursor-pointer">
        <TableHeader>
            <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Specialist</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Fee</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDoctors.map((doctor) => (
            <TableRow key={doctor.id} onClick={() => navigateToDoctor(doctor.id)}>
                <TableCell className="font-medium w-[25%]">{doctor.name}</TableCell>
                <TableCell className="w-[20%]">{doctor.specialist}</TableCell>
                <TableCell>{doctor.address}</TableCell>
                <TableCell className="text-right">{doctor.fee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DoctorList
