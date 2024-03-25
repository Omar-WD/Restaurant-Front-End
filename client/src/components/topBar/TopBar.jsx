import { useContext } from "react"
import { OrderContext } from "../../context/OrderProvider"
import { useNavigate } from "react-router-dom"

export default function TopBar() {
    const {user,signout} = useContext(OrderContext)
    const navigate = useNavigate()
    const btnStyle = " text-amber-800 py-1 px-3 rounded-3xl"

    if(!user){
        return <div className="hidden">Guest</div>
    }

  return (
    <div className="flex flex-col justify-around py-2 gap-2 w-full font-extrabold text-amber-800 bg-amber-300 ">
        <h1 className="text-white ">Welcome {user.name} !</h1>
        <div className="flex justify-around">
        <button className={btnStyle} onClick={()=>navigate("/categories")}>Home</button> <button className={btnStyle} onClick={()=>navigate("/submittedOrders")}>OrdersList</button> <button className={btnStyle} onClick={signout}>SignOut</button>
        </div>
    </div>
  )
}
