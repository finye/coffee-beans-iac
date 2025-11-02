import Card from "./components/Card.tsx";

import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.header`
  position: sticky;
  background-color: #8b4513;
  top: 0;
  padding: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  color: white;
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
      <GlobalStyles />
      <Header>
        <Title>Coffee beans iac</Title>
      </Header>
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
