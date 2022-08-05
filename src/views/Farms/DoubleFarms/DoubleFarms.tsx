import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import {
  Button
} from 'antd';
import { useWallet } from 'use-wallet'

import chef from '../../../assets/img/chef.png'

import Page from '../../../components/Page'
import PageHeader from '../../../components/PageHeader'
import WalletProviderModal from '../../../components/WalletProviderModal'

import useModal from '../../../hooks/useModal'

import DoubleFarm from '../DoubleFarm'

import FarmCards from './components/FarmCards'
import styled from "styled-components";

const DoubleFarms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={[
                    <img src={chef} height="120" key="1" alt="sashimi-big"/>,
                    <img src={chef} height="80" key="2" alt="sashimi-small"/>
                  ]}
                // subtitle="Earn more SASHIMI by staking LP."
                title="Select Your Favorite Table (Beta)"
              />
              {/*<h1>This project is in beta. Use at your own risk.*/}
              {/*  You can turn to stake page and review the contract.*/}
              {/*</h1>*/}
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <DoubleFarm />
            </Route>
          </>
        ) : (
          <StyledDiv>
            <Button
              onClick={onPresentWalletProviderModal}
              type="primary"
              size="large"

            >
              🔓 Unlock Wallet
            </Button>
          </StyledDiv>
        )}
      </Page>
    </Switch>
  )
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
`

export default DoubleFarms
