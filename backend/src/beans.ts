import { APIGatewayProxyHandlerV2 } from "aws-lambda";

interface BeanData {
  id: string;
  name: string;
  description: string;
  price: string;
  weight: string;
}

const beans: BeanData[] = [
  {
    id: "Guji-buna-001",
    name: "Guji",
    description: "Vibrant and complex — peach, berries, and a hint of cocoa.",
    price: "25.00€",
    weight: "250 gram",
  },
  {
    id: "Sidamo-buna-002",
    name: "Sidamo",
    description: "Smooth and sweet with balanced fruit and chocolate notes.",
    price: "10.50€",
    weight: "250 gram",
  },
  {
    id: "Yirgacheffe-buna-003",
    name: "Yirgacheffe",
    description:
      "Floral and citrusy with jasmine aroma — light, bright, and elegant.",
    price: "20.00€",
    weight: "250 gram",
  },
  {
    id: "Harrar-buna-004",
    name: "Harrar",
    description:
      "Bold and wild — rich blueberry tones with dark chocolate depth.",
    price: "10.50€",
    weight: "250 gram",
  },
];

export const handler: APIGatewayProxyHandlerV2 = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(beans),
    };
  } catch (error) {
    console.error("Error fetching beans:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to fetch coffee beans",
      }),
    };
  }
};
