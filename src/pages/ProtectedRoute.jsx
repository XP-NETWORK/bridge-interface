import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import NFTaccount from "../components/NFTaccount"

export default function ProtectedRoute() {
    const from = useSelector(state => state.general.from)

  return from ? <NFTaccount /> : <Navigate to="/connect" replace />
}
