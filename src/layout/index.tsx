import { Outlet } from "react-router-dom"
import HeaderLayout from "../components/header"
import FooterLayout from "../components/footer"

const LayoutAdmin = () => {
  return (
    <>
      <HeaderLayout />

      <Outlet />

      <FooterLayout />
    </>
  )
}
export default LayoutAdmin