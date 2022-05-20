import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import NFTaccount from "../components/NFTsBoard/NFTaccount"

export default function ProtectedRoute() {
    const {from, widget} = useSelector(state => ({from :state.general.from, widget: state.general.widget}))

  return from ? <NFTaccount /> : <Navigate to={`/connect`} replace />
}
