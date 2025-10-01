import { Divider } from "antd";
import TestHead from "../../components/test/test.head";
import TableTest from "../../components/test/test.table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { callApiFetchTests } from "../../services/api";

const TestPage = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState(`current=1&pageSize=5&sort=-createdAt`);

  const { isLoading, isError, data, error } = useQuery<IBackendRes<IModelPaginate<ITest>>, Error>({
    queryKey: ['fetchTest', query],
    queryFn: (): Promise<IBackendRes<IModelPaginate<ITest>>> => callApiFetchTests(query),
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
      <TestHead />
      <Divider />
      {data &&
        <TableTest
          loading={loading}
          setLoading={setLoading}
          data={data}
          onChange={onChange}
        />
      }
    </>
  )
}

export default TestPage;