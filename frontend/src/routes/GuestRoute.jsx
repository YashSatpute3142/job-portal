
import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const GuestRoute = () => {
    const { user } = useSelector(store => store.auth)

    return user ? <Navigate to="/" replace /> : <Outlet />
}

export default GuestRoute
