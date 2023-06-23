import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  color: #000;
  font-size: 32px;
  font-weight: 500;
  margin: 0px 0px 10px 0px;
`;

export const Subtitle = styled.h3`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  margin: 0px 0px 60px 0px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const InputTitle = styled.h3`
  color: #000;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0px
`;

export const Input = styled.input`
  width: 404px;
  height: 32px;
  margin-bottom: 10px;
  padding: 10px 0px 10px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  ::placeholder {
    color: var(--muted, #d9d9d9);
    font-size: 15x;
    font-weight: 500;
    font-family: 'Poppins';
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 404px;
  height: 32px;
  padding: 10px 0px 10px 10px;
  background-color: #3a5b22;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  margin-top: 64px;
  font-family: 'Poppins';
`;

export const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const Image = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: cover;
`;
