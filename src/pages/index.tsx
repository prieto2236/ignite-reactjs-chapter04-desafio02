import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string
  description: string
  url: string
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM - OK
    async ({ pageParam = null }) => {
      const response = await api.get('api/images', {
        params: { after: pageParam }
      })

      return response.data
    }, {
    // TODO GET AND RETURN NEXT PAGE PARAM - OK
    getNextPageParam: ({ after }) => {
      if (after) {
        return after
      } else {
        return null
      }
    },
  }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY - OK
    return data?.pages?.map(p => {
      return p.data
    }).flat()
  }, [data]);

  // TODO RENDER LOADING SCREEN - OK
  if (isLoading) {
    return (
      <Loading />
    )
  }
  // TODO RENDER ERROR SCREEN - OK
  else if (isError) {
    return (
      <Error />
    )
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE - OK */}
        {hasNextPage && <Button mt="6" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>{!isFetchingNextPage ? 'Carregar mais' : 'Carregando...'}</Button>}
      </Box>
    </>
  );
}
