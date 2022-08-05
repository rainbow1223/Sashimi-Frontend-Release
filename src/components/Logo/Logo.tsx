import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import chef from '../../assets/img/chef.png'
import exp from "constants";

export const LogoImg = () => (
  <StyledLogo src={chef} />
)

const Logo: React.FC = () => {
  return (
    <StyledLink to="/">
      <LogoImg />
      <StyledText>
          SashimiSwap
      </StyledText>
    </StyledLink>
  )
}

const StyledLogo = styled.img`
  height: 32px;
  margin-top: -4
`

const StyledLink = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

const StyledText = styled.span`
  color: ${(props) => props.theme.color.grey[600]};
  font-family: 'Reem Kufi', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-left: ${(props) => props.theme.spacing[2]}px;
`

const MasterChefText = styled.span`
  font-family: 'Kaushan Script', sans-serif;
  @media (max-width: 414px) {
    display: none;
  }
`

export default Logo
