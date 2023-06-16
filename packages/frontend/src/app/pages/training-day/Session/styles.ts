import styled from 'styled-components';

export const ClassContainer = styled.div`
  width: 400px;
  border: 1px solid #ccc;
  padding: 20px;
`;

export const ClassHeader = styled.h2`
  margin: 0;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
`;

export const GridItem = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyGridItem = styled(GridItem)`
  background-color: green;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
