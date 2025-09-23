import { Divider } from "antd"
import TablePermission from "../../components/permission/permission.table"
import PermissionHead from "../../components/permission/permission.head"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { callApiFetchPermissions } from "../../services/api";

const PermissionPage = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState(`current=1&pageSize=5&sort=-createdAt`);

  const { isLoading, isError, data, error } = useQuery<IBackendRes<IModelPaginate<IPermission>>, Error>({
    queryKey: ['fetchPermission', query],
    queryFn: (): Promise<IBackendRes<IModelPaginate<IPermission>>> => callApiFetchPermissions(query),
  })

  // if (isLoading) {
  //   return <span>Loading...</span>
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>
  // }

  //@ts-ignore
  const onChange = (pagination, filters, sorter, extra) => {
    setQuery(`current=${pagination.current}&pageSize=${pagination.pageSize}&sort=-createdAt`);
    queryClient.invalidateQueries({ queryKey: ['fetchPermission', query] });
  };
  return (
    <>
      <PermissionHead
        query={query}
        setQuery={setQuery}
      />
      <Divider />
      {data &&
        <TablePermission
          data={data}
          onChange={onChange}
          loading={loading}
          setLoading={setLoading}
        />
      }
    </>
  )
}

export default PermissionPage