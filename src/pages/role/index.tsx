import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { callApiFetchRoles } from "../../services/api";

const RolePage = () => {

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

  return (
    <div>RolePage</div>
  )
}

export default RolePage