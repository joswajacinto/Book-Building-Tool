import React from "react";
import styled from "styled-components";

const Head = styled.div`
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 0;
  align-content: space-around;
  vertical-align: middle;
  & h1 {
    margin: 0;
  }
  & p {
    margin: 0;
  }
`;

const Title = props => {
  return (
    <Head>
      <h1>HTML Cleaner</h1>
      <p>{props.version}</p>
    </Head>
  );
};

export default Title;
