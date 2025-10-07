import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { callApiCreateMultipleTopicsVocabularies } from "../../services/api";
import VocabularyHead from "../../components/vocabulary/vocabulary.head";

const VocabularyPage = () => {
  // const queryClient = useQueryClient();
  // const [loading, setLoading] = useState(false);

  // const [query, setQuery] = useState(`current=1&pageSize=5`);

  // const { isLoading, isError, data, error } = useQuery<IBackendRes<IModelPaginate<ITopicVocabulary>>, Error>({
  //   queryKey: ['fetchTopics', query],
  //   queryFn: (): Promise<IBackendRes<IModelPaginate<ITopicVocabulary>>> => callApiCreateMultipleTopicsVocabularies(query),
  // })

  // if (isLoading) {
  //   return <span>Loading...</span>
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>
  // }

  //@ts-ignore
  // const onChange = (pagination, filters, sorter, extra) => {
  //   setQuery(`current=${pagination.current}&pageSize=${pagination.pageSize}&sort=-createdAt`);
  //   queryClient.invalidateQueries({ queryKey: ['fetchUser', query] });
  // };
  return (
    <>
     <VocabularyHead />
    </>
  )
}

export default VocabularyPage;