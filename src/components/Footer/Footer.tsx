import React from 'react'
import styled from 'styled-components'

import Nav from './components/Nav'

const Footer: React.FC = () => (
  <StyledFooter>
    <Nav />
  </StyledFooter>
)

const StyledFooter = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: ${props => props.theme.topBarSize}px;
  color: #ffffff;
  width: 100%;
`

export default Footer
