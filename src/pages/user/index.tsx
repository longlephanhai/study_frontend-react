import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { callApiFetchUsers } from '../../services/api';
import TableUser from '../../components/user/user.table';


const UserPage = () => {

  const queryClient = useQueryClient();

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
      {data &&
        <TableUser
          data={data}
          onChange={onChange}
        />
      }
    </>
  )
}

export default UserPage