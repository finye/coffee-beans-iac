import { APIGatewayProxyHandlerV2 } from "aws-lambda";

interface BeanData {
  id: string;
  name: string;
  description: string;
  /*   imageUrl: string; */
  price: string;
  weight: string;
}

export const handler: APIGatewayProxyHandlerV2 = async () => {
  const beans: BeanData[] = [
    {
      id: "Guji-buna-001",
      name: "Guji",
      description: "Vibrant and complex — peach, berries, and a hint of cocoa.",
      /*  imageUrl: "../coffee.jpg", */
      price: "10.50€",
      weight: "250 gram",
    },
    {
      id: "Sidamo-buna-002",
      name: "Sidamo",
      description: "Smooth and sweet with balanced fruit and chocolate notes.",
      /* imageUrl: "../coffee.jpg", */
      price: "10.50€",
      weight: "250 gram",
    },
    {
      id: "Yirgacheffe-buna-003",
      name: "Yirgacheffe",
      description:
        "Floral and citrusy with jasmine aroma — light, bright, and elegant.",
      /*  imageUrl: "../coffee.jpg", */
      price: "10.50€",
      weight: "250 gram",
    },
    {
      id: "Harrar-buna-004",
      name: "Harrar",
      description:
        "Bold and wild — rich blueberry tones with dark chocolate depth.",
      /*   imageUrl: "../coffee.jpg", */
      price: "10.50€",
      weight: "250 gram",
    },
  ];
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(beans),
  };
};
