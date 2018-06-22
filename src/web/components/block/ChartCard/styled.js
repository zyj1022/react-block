import styled, { css } from 'styled-components';

export const Card = styled.div `
  margin-bottom: 20px;
`;

export const CardHeader = styled.div `
  padding: .75rem 1.25rem;
  margin-bottom: 0;
  background-color: #343b41;
  border-bottom: 1px solid #23282c;
`;

export const CardBody = styled.div `
  padding: 10px;
  background: ${props => props.bgColor ? props.bgColor : '#fff'};
  border-radius: 5px;
  min-height:160px
`;

// export const CardGroup = styled.
