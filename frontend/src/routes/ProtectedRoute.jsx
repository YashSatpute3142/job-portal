
import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = () => {
    const { user } = useSelector(store => store.auth)

    return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
