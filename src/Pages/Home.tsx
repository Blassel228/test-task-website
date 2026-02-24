import styled from "styled-components";
import background from "../Assets/ripples-of-sand-in-black-and-white.jpg";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: url(${background});
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

const HeroContent = styled.div`
  max-width: 900px;
  z-index: 2;
  animation: fadeIn 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  letter-spacing: -2px;
  line-height: 1.1;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: #e5e7eb;
  margin-bottom: 48px;
  line-height: 1.6;
  font-weight: 300;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
`;

const CTAButton = styled.button`
  background: #febd69;
  color: #131921;
  border: none;
  padding: 20px 64px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(254, 189, 105, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #ffffff;
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(255, 255, 255, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const HomePage = () => {
  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Style & Quality</HeroTitle>
          <HeroSubtitle>
            Experience the perfect blend of aesthetics and functionality.
            <br />
            Your journey starts here.
          </HeroSubtitle>
          <CTAButton>
            Explore Collection
          </CTAButton>
        </HeroContent>
      </HeroSection>
    </Container>
  );
};

export default HomePage;