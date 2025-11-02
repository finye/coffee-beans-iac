import styled from "styled-components";

const CardWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  padding: 16px;
  max-width: 320px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 8px;
  color: darkorange;
`;

const Description = styled.p`
  font-size: 1em;
  color: #4f200d;
`;

/* const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 16px;
`; */

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Price = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #4f200d;
`;

const Weight = styled.span`
  font-size: 1rem;
  color: #4f200d;
`;
interface CardProps {
  name: string;
  /*  imageUrl: string; */
  description: string;
  price: string;
  weight: string;
}
const Card = ({
  name,
  /*  imageUrl, */ description,
  price,
  weight,
}: CardProps) => {
  return (
    <CardWrapper>
      <Title>{name}</Title>
      {/*      <Image src={imageUrl} alt={name} /> */}
      <Description>{description}</Description>
      <PriceSection>
        <Price>{price}</Price>
        <Weight>{weight}</Weight>
      </PriceSection>
    </CardWrapper>
  );
};

export default Card;
