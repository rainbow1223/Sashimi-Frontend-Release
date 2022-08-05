import React from 'react'
import styled from 'styled-components'
import {
  Button
} from 'antd';
import {
  Link
} from 'react-router-dom';

import chef from '../../assets/img/chef.png'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'

import Balances from './components/Balances'

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon={<img src={chef} height={120} />}
        title="MasterChef is Ready"
        subtitle="Stake SASHIMI/Uniswap LP tokens to eat your yummy SASHIMI!"
      />
      <Balances />
      <Spacer size="lg" />
      <Center>
        <Button size="large" type="primary">
          <Link to="/farms">
            See the Menu
          </Link>
        </Button>
      </Center>
    </Page>
  )
}

const Center = styled.div`
  margin: 0 auto;
`;


export default Home
