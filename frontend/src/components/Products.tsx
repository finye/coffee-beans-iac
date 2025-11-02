import { useEffect, useState } from "react";
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

const ErrorMessage = styled.div`
  color: crimson;
  text-align: center;
  padding: 20px;
  margin: 20px;
`;

interface BeanData {
  id: string;
  name: string;
  description: string;
  /*   imageUrl: string; */
  price: string;
  weight: string;
}

const API = import.meta.env.VITE_API_BASE_URL;

const Products = () => {
  const [beans, setBeans] = useState<BeanData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/beans`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(setBeans)
      .catch((err) => setError(String(err)));
  }, []);

  if (error) {
    return <ErrorMessage>Failed to load products: {error}</ErrorMessage>;
  }

  return (
    <CardsContainer>
      {beans.map((bean) => (
        <Card
          key={bean.id}
          name={bean.name}
          /*    imageUrl={bean.imageUrl} */
          description={bean.description}
          price={bean.price}
          weight={bean.weight}
        />
      ))}
    </CardsContainer>
  );
};

export default Products;
