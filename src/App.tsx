import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  Layout
} from 'antd';
import styled, { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'

import DisclaimerModal from './components/DisclaimerModal'
import Mobile from './contexts/Mobile';
import TopBar from './components/TopBar'
import SashimiFooter from './components/Footer';

import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import YamProvider from './contexts/YamProvider'
import TransactionProvider from './contexts/Transactions'

import useModal from './hooks/useModal'

import FAQ from './views/FAQ'
import Farms from './views/Farms/Farms'
import DoubleFarms from './views/Farms/DoubleFarms'
import Home from './views/Home'
import Staking from './views/Staking'
import Investment from './views/Investment'
import InvestmentLending from './views/InvestmentLending';
import Vault from './views/Vault'
import ComingSoon from './views/ComingSoon'

import { getEthChainInfo } from './utils/getEthChainInfo'

import theme from './theme'
import './App.less';

const {
  Header,
  Content,
  Footer
} = Layout;

const App: React.FC = () => {

  return (
    <Providers>
      <Router>
        <StyledLayout>
          <StyledHeader>
            <TopBar />
          </StyledHeader>
          <StyledContent>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/farms">
                <Farms />
              </Route>
              <Route path="/double-farms">
                <DoubleFarms />
              </Route>
              <Route path="/staking">
                <Staking />
              </Route>
              <Route path="/investment">
                {/*<Investment />*/}
                <InvestmentLending />
              </Route>
              <Route path="/investment-lend">
                <InvestmentLending />
              </Route>
              <Route path="/faq">
                <FAQ />
              </Route>
              <Route path="/exchanges">
                <ComingSoon title={'Sashimi Swap'}/>
              </Route>
              <Route path="/vault">
                <Vault />
              </Route>
            </Switch>
          </StyledContent>
          <StyledFooter>
            <SashimiFooter />
            <Disclaimer />
          </StyledFooter>
        </StyledLayout>
      </Router>
    </Providers>
  )
}

// https://infura.io/docs/gettingStarted/chooseaNetwork
// https://www.anyblockanalytics.com/news/overview-ethereum-blockchain-networks/
const Providers: React.FC = ({ children }) => {

  const {
    chainId,
    rpcUrl
  } = getEthChainInfo();

  return (
    <Mobile>
      <ThemeProvider theme={theme}>
        <UseWalletProvider
          chainId={chainId}
          connectors={{
            walletconnect: { rpcUrl },
          }}
        >
          <YamProvider>
            <TransactionProvider>
              <FarmsProvider>
                <ModalsProvider>{children}</ModalsProvider>
              </FarmsProvider>
            </TransactionProvider>
          </YamProvider>
        </UseWalletProvider>
      </ThemeProvider>
    </Mobile>
  )
}

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />,
  )

  useEffect(() => {
    const seenDisclaimer = true // localStorage.getItem('disclaimer')
    if (!seenDisclaimer) {
      onPresentDisclaimerModal()
    }
  }, [onPresentDisclaimerModal])

  return <div />
}

const StyledLayout = styled(Layout)`
  position: relative;
`

const StyledContent = styled(Content)`
  padding: 12px 64px;
  margin: 24px auto;
  background-color: #ffffff;
  min-width: 1200px;
  min-height: calc(100vh - 256px);
  @media (max-width: 1200px) {
    min-width: 968px;
  }
  @media (max-width: 968px) {
    min-width: 90%;
  }
  @media (max-width: 414px) {
    padding: 12px 0;
    min-width: 100%;
  }
`

const StyledHeader = styled(Header)`
  background-color: #ffffff;
  @media (max-width: 414px) {
    padding: 0;
  }
`

const StyledFooter = styled(Footer)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  transform: translateY(104%);
`

export default App
