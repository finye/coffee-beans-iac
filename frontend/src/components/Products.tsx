import { useEffect, useState } from "react";
import Card from "./Card.tsx";
import styled from "styled-components";
import { getConfig } from "../config";

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

const Message = styled.div`
  text-align: center;
  padding: 20px;
  margin: 20px;
`;

const ErrorMessage = styled(Message)`
  color: crimson;
`;

interface BeanData {
  id: string;
  name: string;
  description: string;
  price: string;
  weight: string;
}

const Products = () => {
  const [beans, setBeans] = useState<BeanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [cdnUrl, setCdnUrl] = useState<string>("");

  useEffect(() => {
    const fetchBeans = async () => {
      try {
        const config = await getConfig();
        setCdnUrl(config.cdnUrl);
        const response = await fetch(`${config.apiBaseUrl}/beans`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        setBeans(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBeans();
  }, []);

  if (loading) {
    return <Message>Loading products...</Message>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <CardsContainer>
      {beans.map((bean) => (
        <Card
          key={bean.id}
          name={bean.name}
          description={bean.description}
          price={bean.price}
          weight={bean.weight}
          cdnUrl={cdnUrl}
        />
      ))}
    </CardsContainer>
  );
};

export default Products;
