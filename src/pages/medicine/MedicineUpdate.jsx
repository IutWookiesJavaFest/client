import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from 'react-router-dom';
import PageLoading from "@/mycomponents/loading/PageLoading";
import ButtonLoading from "@/mycomponents/loading/Loading";
const API_PATH = import.meta.env.VITE_API_PATH;

const MedicineUpdate = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [pageLoading, setPageLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    imgLink: "",
    genericName: "",
    price: "",
  });

  //check if medicineId parsed 
  if (!location.state || !location.state.medicine) {
    useEffect(() => {
      console.error("No medicine ID found in location state");
      navigate("/medicine"); // Redirect to a safe page, like medicine list
    }, []); // Runs only on initial render
    return null; // Render nothing while redirecting
  }

  const { medicine } = location.state;

  // Fetch the medicine details by ID when the component mounts
  useEffect(() => {
    // const fetchMedicine = async () => {
    //   try {
    //     const response = await axios.get(`${API_PATH}/medicine/get/${medicine.id}`);
    //     const { name, imgLink, genericName, price } = response.data;
    //     setFormData({ name, imgLink, genericName, price });
    //     setPageLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching the medicine details:", error);
    //   }
    // };

    // fetchMedicine();

    const { name, imgLink, genericName, price } = medicine;
    setFormData({ name, imgLink, genericName, price });
    setPageLoading(false);

  }, [medicine.id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Axios PUT request to update the medicine
  const handleUpdate = async () => {
    try {
      setButtonLoading(true);
      const response = await axios.put(`${API_PATH}/medicine/update/${medicine.id}`, formData);
      console.log("Medicine updated successfully:", response.data);
      setButtonLoading(false);
      navigate(`/medicine`);
    } catch (error) {
      console.error("Error updating the medicine:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] pt-[2vw]">
      <Card className="w-[350px]">
        {pageLoading?
            <PageLoading />
            :
            <>
            <CardHeader>
                <CardTitle>Update Medicine</CardTitle>
                <CardDescription>Update the existing medicine details.</CardDescription>
            </CardHeader>
            <CardContent>
            <form>
                <div className="grid w-full items-center gap-4">
                {/* Name Field */}
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                    id="name"
                    placeholder="Name of medicine"
                    value={formData.name}
                    onChange={handleChange}
                    />
                </div>

                {/* Image Link Field */}
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="imgLink">Image Link</Label>
                    <Input
                    id="imgLink"
                    placeholder="Image link of your medicine"
                    value={formData.imgLink}
                    onChange={handleChange}
                    />
                </div>

                {/* Generic Name Field */}
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="genericName">Generic Name</Label>
                    <Input
                    id="genericName"
                    placeholder="Generic name of medicine"
                    value={formData.genericName}
                    onChange={handleChange}
                    />
                </div>

                {/* Price Field */}
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="price">Price</Label>
                    <Input
                    type="number"
                    id="price"
                    placeholder="Price of medicine"
                    value={formData.price}
                    onChange={handleChange}
                    />
                </div>

                <Button type="button" onClick={()=>handleUpdate()}>
                    {buttonLoading?
                        <ButtonLoading />
                        :
                        "Save"
                    }
                </Button>
                </div>
            </form>
            </CardContent>
            </>
        }
      </Card>
    </div>
  );
};

export default MedicineUpdate;
