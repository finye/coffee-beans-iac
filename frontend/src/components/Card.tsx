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
  color: rosybrown;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 16px;
`;

const Card = () => {
  return (
    <CardWrapper>
      <Title>Guji Buna</Title>
      <Description>
        Grown in the forested highlands of southern Ethiopia,
		Guji coffee is complex and lively, featuring notes of peach,
		berries, and cocoa. A bold yet refined expression of Ethiopian terroir.
      </Description>
      <Image src="../coffee.jpg" alt="coffee_package_img" />
    </CardWrapper>
  );
};

export default Card;
