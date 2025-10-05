import { Divider } from "antd"
import WritingHeader from "../../components/writing/writing.header"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { callApiFetchWritings } from "../../services/api";
import TableWriting from "../../components/writing/writing.table";

const WritingPage = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState(`current=1&pageSize=5`);

  const { isLoading, isError, data, error } = useQuery<IBackendRes<IModelPaginate<IWriting>>, Error>({
    queryKey: ['fetchWritings', query],
    queryFn: (): Promise<IBackendRes<IModelPaginate<IWriting>>> => callApiFetchWritings(query),
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
    queryClient.invalidateQueries({ queryKey: ['fetchUser', query] });
  };
  return (
    <>
      <WritingHeader />
      <Divider />
      {data &&
        <TableWriting
          loading={loading}
          setLoading={setLoading}
          data={data}
          onChange={onChange}
        />
      }
    </>
  )
}

export default WritingPage  