import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  background: var(--medGrey);
  color: var(--white);
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--maxWidth);
  padding: 0 20px;

  a {
    text-decoration: none;
    position: relative;
    &::after{
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 90%;
      height: 1px;
      background: #fff;
      opacity: 0;
      transition: opacity 0.3s linear;
    }
    &:hover:after{
      opacity: 1;
    }
  }

  span {
    font-size: var(--fontMed);
    color: var(--white);
    padding-right: 10px;

    @media screen and (max-width: 768px) {
      font-size: var(--fontSmall);
    }
  }
`;
