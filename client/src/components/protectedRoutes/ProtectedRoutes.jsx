import { OrderContext } from "../../context/OrderProvider"
import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoutes() {
    const {user,isLoading} = useContext(OrderContext)

    if (isLoading) {
        return <h1>Loading...</h1>;
      }
      if (!isLoading && !user) {
        return <Navigate to="/signin" />;
      }
      if (!isLoading && user) {
        return (
        <Outlet />)
      }
}
