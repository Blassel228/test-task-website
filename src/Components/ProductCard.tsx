import Column from "./Column.tsx";
import styled from "styled-components";
import Logo from "../Assets/amazonLogo.png"


const ProductImage = styled.img`
  flex: 2;
  width: auto;
  object-fit: contain;
`

const ProductCard = () => {
  return(
    <Column className="cursor-pointer">
      <ProductImage src={Logo}/>
    </Column>
  )
}