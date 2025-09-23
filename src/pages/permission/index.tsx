import { Divider } from "antd"
import TablePermission from "../../components/permission/permission.table"
import PermissionHead from "../../components/permission/permission.head"

const PermissionPage = () => {
  return (
    <>
      <PermissionHead />
      <Divider />
      <TablePermission />
    </>
  )
}

export default PermissionPage