import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 10px 20px;
  background: rgba(35, 49, 66, 0.3);
`;

function BackgroundCourtesy(props) {
  const { background } = props;
  if (!background) return null;
  return (
    <Container color={background.color}>
      photo by {background.user.name}
    </Container>
  );
}

export default BackgroundCourtesy;
