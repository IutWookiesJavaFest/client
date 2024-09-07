import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react"
import PageLoading from '@/mycomponents/loading/PageLoading'
import ButtonLoading from "@/mycomponents/loading/Loading"
const API_PATH = import.meta.env.VITE_API_PATH;

const MedicineView = () => {

  const { id } = useParams();
  const [medicine, setMedicine] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [quantity, setQuantity] = useState(0)
  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => (prev > 0 ? prev - 1 : 1))

  const fetchDoctorInfo = async () => {
    try {
      const response = await axios.get(`${API_PATH}/medicines/`)
      setMedicine(response.data);
      setPageLoading(false);
    } catch (error) {
      console.error('Error fetching doctor information:', error)
    }
  }

  useEffect(() => {
    fetchDoctorInfo()
  }, [id])

  const addToCart = () => {
    setButtonLoading(true);
    // Retrieve the cart from local storage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Create a new cart item with the updated quantity and price
    const newItem = {
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      quantity: quantity,
      totalPrice: medicine.price * quantity, // Total price for this item
    };
  
    // Find if the item is already in the cart
    const itemIndex = cart.findIndex(item => item.id === newItem.id);
  
    if (itemIndex > -1) {
      // Item exists in the cart, update the quantity and total price
      cart[itemIndex].quantity += quantity;
      cart[itemIndex].totalPrice = cart[itemIndex].price * cart[itemIndex].quantity;
    } else {
      // Item does not exist in the cart, add new item
      cart.push(newItem);
    }
  
    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    setQuantity(0);
    setButtonLoading(false);
  };
  

  return (
    <div className="flex justify-center items-center bg-red-600 h-[100vh] pt-[5vw]">
        {
            pageLoading?
            (
                <PageLoading />
            )
            :
            (
            <Card className="w-[90vw] md:w-[40vw] xl:w-[22vw]">
            <CardHeader>
                <CardTitle className="lg:text-2xl font-bold">Aspirin</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="aspect-square relative">
                <img
                    src="https://www.lazzpharma.com/Content/ImageData/Product/Small/feeb068c-601d-4b17-a3ac-c4210cd3e5f2/PRODEP%20.webp"
                    alt="Aspirin"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
                </div>
                <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">$9.99</span>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        disabled={quantity === 0}
                    >
                        <MinusIcon className="h-4 w-4" />
                        <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span className="font-bold text-xl w-8 text-center">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={incrementQuantity}>
                        <PlusIcon className="h-4 w-4" />
                        <span className="sr-only">Increase quantity</span>
                    </Button>
                </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" 
                    disabled={quantity === 0}
                    onClick={()=> addToCart()}
                >
                    {
                        buttonLoading?
                        <ButtonLoading />
                        :
                        <>
                            <ShoppingCartIcon className="mr-2 h-4 w-4" /> 
                            <p>Add to Cart</p>
                        </>
                    }
                    
                </Button>
            </CardFooter>
            </Card>
            )
        }
    </div>
  )
}
export default MedicineView;