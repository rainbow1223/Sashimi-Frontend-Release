import React from 'react'
import {
  Row,
  Col
} from 'antd';
import styled from 'styled-components'
import {contractAddresses} from '../../../sushi/lib/constants';
import {getEthChainInfo} from "../../../utils/getEthChainInfo";

const {
    ethscanType,
    chainId
} = getEthChainInfo();

const contractAddressesTemp = contractAddresses as {[index: string]:any};

const Nav: React.FC = () => {
    const smVal = 3;
    const xsVal = 12;
    return (
    <StyledRow gutter={18} justify="space-around">
      <Col sm={smVal} xs={xsVal}>
        <StyledLink
          target="_blank"
          href={`https://${ethscanType}etherscan.io/address/${contractAddressesTemp.sushi[chainId]}#code`}
        >
          Sashimi Contract
        </StyledLink>
      </Col>
      <Col sm={4} xs={xsVal}>
        <StyledLink
          target="_blank"
          href={`https://${ethscanType}etherscan.io/address/${contractAddressesTemp.masterChef[chainId]}#code`}
        >
          MasterChef Contract
        </StyledLink>
      </Col>
      <Col sm={smVal} xs={xsVal}>
        <StyledLink target="_blank" href="https://discord.com/invite/mSEc2uv">
          Discord
        </StyledLink>
      </Col>
      <Col sm={smVal} xs={xsVal}>
        <StyledLink target="_blank" href="https://t.me/joinchat/KABj-Bz6CVzyi23HK2rjzA">
          Telegram
        </StyledLink>
      </Col>
      <Col sm={2} xs={xsVal}>
        <StyledLink target="_blank" href="https://twitter.com/SASHIMISASHIMI5">
          Twitter
        </StyledLink>
      </Col>
      <Col sm={2} xs={xsVal}>
        <StyledLink target="_blank" href="https://github.com/SashimiProject/sashimiswap">
          Github
        </StyledLink>
      </Col>
      <Col sm={2} xs={xsVal}>
        <StyledLink target="_blank" href="https://docs.sashimi.cool/">
          Docs
        </StyledLink>
      </Col>
      <Col sm={smVal} xs={xsVal}>
        <StyledLink target="_blank" href="https://sashimi.cool/files/sashimi_audit_report.pdf">
          Audit Report
        </StyledLink>
      </Col>
      <Col sm={2} xs={xsVal}>
        <a href="/api/farms/getList" target="_blank" style={{color: '#FFF'}}>
          APY API
        </a>
      </Col>
    </StyledRow>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
`

const StyledRow = styled(Row)`
  text-align: center;
  @media (min-width: 576px) {
    min-width: 80%;
  }
`

const StyledLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[200]};
  }
`

export default Nav
