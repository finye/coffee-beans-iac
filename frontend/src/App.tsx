import Card from "./components/Card.tsx";
import styled from "styled-components";

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

function App() {
  const cardData = [
    {
      title: "Guji",
      description:
        "Vibrant and complex — peach, berries, and a hint of cocoa.",
      imageUrl: "../coffee.jpg",
      imageAlt: "Guji coffee package",
      price: "10.50€",
      weight: "250 gram",
    },
    {
      title: "Sidamo",
      description:
        "Smooth and sweet with balanced fruit and chocolate notes.",
      imageUrl: "../coffee.jpg",
      imageAlt: "Sidamo coffee package",
      price: "10.50€",
      weight: "250 gram",
    },
    {
      title: "Yirgacheffe",
      description:
        "Floral and citrusy with jasmine aroma — light, bright, and elegant.",
      imageUrl: "../coffee.jpg",
      imageAlt: "Yirgacheffe coffee package",
      price: "10.50€",
      weight: "250 gram",
    },
    {
      title: "Harrar",
      description:
        "Bold and wild — rich blueberry tones with dark chocolate depth.",
      imageUrl: "../coffee.jpg",
      imageAlt: "Harrar coffee package",
      price: "10.50€",
      weight: "250 gram",
    },
  ];
  return (
    <>
      <div>
        <h1>Coffee beans iac</h1>
      </div>
      <CardsContainer>
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            imageUrl={card.imageUrl}
            imageAlt={card.imageAlt}
            description={card.description}
            price={card.price}
            weight={card.weight}
          />
        ))}
      </CardsContainer>
    </>
  );
}

export default App;
