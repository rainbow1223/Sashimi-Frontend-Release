import React, {useContext} from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'
import Spacer from "../Spacer";
import {Context} from "../../contexts/Mobile";

interface TopBarProps {
}

const TopBar: React.FC<TopBarProps> = () => {
  const {
    isMobile
  } = useContext(Context);
  return (
    <StyledTopBar>
      <StyledContainer size="lg">
        <StyledTopBarInner>
          <StyledLogoWrapper>
            <Logo />
          </StyledLogoWrapper>
          <StyledMobileWrapper>
            <Nav />
            {isMobile && <Spacer />}
            <StyledAccountButtonWrapper>
              <AccountButton />
            </StyledAccountButtonWrapper>
          </StyledMobileWrapper>
        </StyledTopBarInner>
      </StyledContainer>
    </StyledTopBar>
  )
}

const StyledLogoWrapper = styled.div`
  width: 260px;
  @media (max-width: 414px) {
    width: auto;
  }
`

const StyledMobileWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  @media (max-width: 576px) {
    flex-flow: row-reverse nowrap;
  }
`

const StyledTopBar = styled.div``

const StyledContainer = styled(Container)`
  padding: 0 !important;
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 414px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 156px;
  @media (max-width: 414px) {
    justify-content: center;
    width: auto;
  }
`

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 414px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }
`

export default TopBar
