import styled, { createGlobalStyle } from "styled-components";
import Products from "./components/Products";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Open Sans", Sans-serif;
  }
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

  return (
    <>
      <GlobalStyles />
      <Header>
        <Title>Coffee beans iac</Title>
      </Header>
      <Products />
    </>
  );
}

export default App;
