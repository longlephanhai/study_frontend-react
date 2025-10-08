import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { callApiFetchTopicsVocabularies } from "../../services/api";
import VocabularyHead from "../../components/vocabulary/vocabulary.head";
import { Divider } from "antd";
import TableVocabulary from "../../components/vocabulary/vocabulary.table";

const VocabularyPage = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState(`current=1&pageSize=5`);

  const { isLoading, isError, data, error } = useQuery<IBackendRes<IModelPaginate<ITopicVocabulary>>, Error>({
    queryKey: ['fetchTopicsVocabulary', query],
    queryFn: (): Promise<IBackendRes<IModelPaginate<ITopicVocabulary>>> => callApiFetchTopicsVocabularies(query),
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
      <VocabularyHead />
      <Divider />
      {data &&
        <TableVocabulary
          loading={loading}
          setLoading={setLoading}
          data={data}
          onChange={onChange}
        />
      }
    </>
  )
}

export default VocabularyPage;