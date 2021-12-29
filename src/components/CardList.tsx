import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const disclosure = useDisclosure()

  // TODO SELECTED IMAGE URL STATE
  const [selectedImage, setSelectedImage] = useState('')

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string) {
    setSelectedImage(url)

    console.log('img: ', url)

    disclosure.onOpen()
  }

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid spacing="40px" columns={3} >
        {cards.map((card: Card) => {
          return (
            <Card key={card.id} data={card} viewImage={() => { handleViewImage(card.url) }} />
          )
        })}
      </SimpleGrid>
      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage imgUrl={selectedImage} isOpen={disclosure.isOpen} onClose={disclosure.onClose} />
    </>
  );
}
