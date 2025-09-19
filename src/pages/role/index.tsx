import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";
import { callApiFetchRoles } from "../../services/api";
import TableRole from "../../components/role/role.table";

const RolePage = () => {
  const queryClient = useQueryClient();

  const [query, setQuery] = useState(`current=1&pageSize=2`);

  const { isLoading, isError, data, error } = useQuery<IBackendRes<IModelPaginate<IRole>>, Error>({
    queryKey: ['fetchRole', query],
    queryFn: (): Promise<IBackendRes<IModelPaginate<IRole>>> => callApiFetchRoles(query),
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  //@ts-ignore
  const onChange = (pagination, filters, sorter, extra) => {
    setQuery(`current=${pagination.current}&pageSize=${pagination.pageSize}`);
    queryClient.invalidateQueries({ queryKey: ['fetchRole', query] });
  };

  return (
    <>
      {
        data && <TableRole
          data={data}
          onChange={onChange}
        />
      }
    </>
  )
}

export default RolePage