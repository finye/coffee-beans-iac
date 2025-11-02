import Card from "./Card.tsx";
import styled from "styled-components";

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

interface CardData {
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  weight: string;
}

const cardData: CardData[] = [
  {
    name: "Guji",
    description:
        "Vibrant and complex — peach, berries, and a hint of cocoa.",
    imageUrl: "../coffee.jpg",
    price: "10.50€",
    weight: "250 gram",
  },
  {
    name: "Sidamo",
    description:
        "Smooth and sweet with balanced fruit and chocolate notes.",
    imageUrl: "../coffee.jpg",
    price: "10.50€",
    weight: "250 gram",
  },
  {
   name: "Yirgacheffe",
    description:
        "Floral and citrusy with jasmine aroma — light, bright, and elegant.",
    imageUrl: "../coffee.jpg",
    price: "10.50€",
    weight: "250 gram",
  },
  {
    name: "Harrar",
    description:
        "Bold and wild — rich blueberry tones with dark chocolate depth.",
	imageUrl: "../coffee.jpg",
    price: "10.50€",
    weight: "250 gram",
  },
];

const Products = () => {
  return (
    <CardsContainer>
      {cardData.map((card, index) => (
        <Card
          key={index}
          name={card.name}
          imageUrl={card.imageUrl}
          description={card.description}
          price={card.price}
          weight={card.weight}
        />
      ))}
    </CardsContainer>
  );
};

export default Products;
