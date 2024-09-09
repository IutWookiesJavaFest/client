import { useState, useEffect} from "react";
import {
  Command,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const API_PATH = import.meta.env.VITE_API_PATH;
import {SquarePlus} from 'lucide-react';
import Cart from "./Cart";

const medicineJson = [
  {
    id: 1,
    name: "PRODEP 20 MG Cap",
    genericName: "FLUOXETINE",
    imageUrl: "https://www.lazzpharma.com/Content/ImageData/Product/Small/feeb068c-601d-4b17-a3ac-c4210cd3e5f2/PRODEP%20.webp",
    price: 10,
  },
  {
    id: 2,
    name: "Paracetamol 500 MG",
    genericName: "Acetaminophen",
    imageUrl: "https://example.com/path/to/paracetamol-image.jpg",
    price: 15,
  },
  {
    id: 3,
    name: "Ibuprofen 200 MG",
    genericName: "Ibuprofen",
    imageUrl: "https://example.com/path/to/ibuprofen-image.jpg",
    price: 16,
  },
  {
    id: 4,
    name: "Amoxicillin 250 MG",
    genericName: "Amoxicillin",
    imageUrl: "https://example.com/path/to/amoxicillin-image.jpg",
    price: 20,
  },
  {
    id: 5,
    name: "Omeprazole 40 MG",
    genericName: "Omeprazole",
    imageUrl: "https://example.com/path/to/omeprazole-image.jpg",
    price: 11,
  },
  {
    id: 6,
    name: "Aspirin 81 MG",
    genericName: "Acetylsalicylic Acid",
    imageUrl: "https://example.com/path/to/aspirin-image.jpg",
    price: 25,
  },
];

const Medicine = () => {
  
  const navigate = useNavigate(); 
  const [inputValue, setInputValue] = useState("");
  const [medicines, setMedicines] = useState(medicineJson);
  const [filteredMedicines, setFilteredMedicines]= useState(medicineJson);
  const [pageLoading, setPageLoading] = useState(true);

  const getAllMedicines = async () => {
    try {
      // POST request using Axios to save the task
      const response = await axios.post(`${API_PATH}/todos`, formData);

      // Handle successful response (e.g., redirect or show success message)
      console.log('Task saved successfully:', response.data);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error saving task:', error);
    }
  };

  useEffect(() => {
    const tempFilteredMedicines = medicines
    .filter((medicine) =>
      medicine.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      medicine.genericName.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, 10);

    if (inputValue === "") setFilteredMedicines([]);
    else setFilteredMedicines(tempFilteredMedicines);
  }, [inputValue]);

  const viewMedicine = (medicine) => {
    //navigate(`/medicine/view/${medicine.id}`); // Navigate to the medicine detail page
    navigate(`/medicine/view/${medicine.id}`,  { state: { medicine } });
  };

  const createMedicine = () => {
    navigate(`/medicine/create`); // Navigate to the medicine detail page
  };

  const updateMedicine = (medicine) => {
    navigate(`/medicine/update`,  { state: { medicine } }); // Navigate to the medicine detail page
  };

  const deleteMedicine = async (medicineId) => {
    const updatedMedicines = filteredMedicines.filter((medicine) => medicine.id !== medicineId);
    setFilteredMedicines(updatedMedicines);

    try {
      const response = await axios.delete(`${API_PATH}/todos/${medicineId}`); // Fetch task by ID
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  }

  return (
    <div className='p-[7vw] md:p-[5vw] pt-[18vw] md:pt-[12vw] lg:pt-[8vw]'>
      <h2 className="text-center text-[6vw] md:text-[3vw] lg:text-[2vw] mb-[3.5vw] md:mb-[2vw] lg:mb-[1.5vw]">Buy Medicine</h2>
      
      <Command className="rounded-lg border shadow-md md:w-[500px] mx-auto mb-[6vw] md:mb-[4vw]">
        <CommandInput
          placeholder="Type to search for a medicine..."
          value={inputValue}
          onValueChange={setInputValue}
        />
        <CommandList>
          {/* {(
            filteredMedicines.map((medicine) => (
              <CommandItem key={medicine} className='cursor-pointer' onClick={() => navigate(`/medicine/${medicine.id}`)}>
                  {medicine.name}
              </CommandItem>
            ))
          )} */}
        </CommandList>
      </Command>
      
      <Button className="mb-[5vw] md:mb-[3vw] lg:mb-[2vw]" onClick={()=> createMedicine()}><SquarePlus className="mr-[2%]"/>Add Medicine</Button>
      <div className="flex flex-wrap justify-between mb-[8vw] md:mb-[6vw] lg:mb-[4vw]">
        {filteredMedicines.map((medicine) => (
          <div key={medicine.id} className="w-[45%] md:w-[30%] lg:w-[22%] md:p-[3%] lg:p-[3%] xl:w-[18%] xl:p-[2%] border shadow-md mb-[10%] md:mb-[5%] lg:mb-[3%] cursor-pointer">
            <img
              src={medicine.imageUrl}
              alt={medicine.name}
              className="w-full h-auto mb-2"
            />
            <h3 className="font-semibold">{medicine.name}</h3>
            <p>{medicine.genericName}</p>
            <p className="font-semibold">${medicine.price}</p>
            {/* <div className="mt-[5%] flex justify-between">
              <Button className='w-[48%] ' onClick={()=> updateMedicine(medicine)}>
                Edit
              </Button>
              <Button variant="outline" className='w-[48%]' onClick={()=> deleteMedicine(medicine.id)}>
                Delete
              </Button>
            </div> */}
            
            <Button className="w-[100%] mt-[5%]" onClick={() => viewMedicine(medicine)}>Buy</Button>
          </div>
        ))}
      </div>
      <Cart />
    </div>
  )
}

export default Medicine
