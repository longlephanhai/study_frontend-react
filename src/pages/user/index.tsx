import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { callApiFetchUsers } from '../../services/api';
import TableUser from '../../components/user/table.user';


const UserPage = () => {

  const queryClient = useQueryClient();

  // const [current, setCurrent] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  // const [totalPage, setTotalPage] = useState(0);
  const [query, setQuery] = useState(`current=1&pageSize=2`);

  const { isLoading, isError, data, error } = useQuery<IBackendRes<IModelPaginate<IUser>>, Error>({
    queryKey: ['fetchUser', query],
    queryFn: (): Promise<IBackendRes<IModelPaginate<IUser>>> => callApiFetchUsers(query),
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
    queryClient.invalidateQueries({ queryKey: ['fetchUser', query] });
  };

  return (
    <>
      {data && <TableUser data={data} onChange={onChange} />}
    </>
  )
}

export default UserPage