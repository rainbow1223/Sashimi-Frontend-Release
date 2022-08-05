import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'

import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useYam from '../../../hooks/useYam'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'

import { getBalance } from '../../../utils/erc20';
import { getBalanceNumber } from '../../../utils/formatBalance'
import { getSushiSupply } from '../../../sushi/utils'
import { getSushiAddress } from '../../../sushi/utils'
import BigNumber from 'bignumber.js'
import CountUp from 'react-countup'
import { getEthChainInfo } from '../../../utils/getEthChainInfo';

const {
  stakingPool
} = getEthChainInfo();

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    const sumWeth = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [burnedSashimi, setBurnedSashimi] = useState<BigNumber>(new BigNumber(0));
  const [fishFeedBalance, setFishFeedBalance] = useState<BigNumber>(new BigNumber(0));
  const yam = useYam()
  const sushiBalance = useTokenBalance(getSushiAddress(yam))
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()

  useEffect(() => {
    async function fetchTotalSupply() {
      const [
        supply,
        stakedBalance,
        burnedSashimi,
        fishFeedBalance,
      ] = await Promise.all([
        getSushiSupply(yam),
        getBalance(ethereum, getSushiAddress(yam), stakingPool).then(res => new BigNumber(res)),
        getBalance(ethereum, getSushiAddress(yam), '0x000000000000000000000000000000000000dead').then(res => new BigNumber(res)),
        getBalance(ethereum, getSushiAddress(yam), '0x84ee348617563944ffd4a23843e086a7dc0224f3').then(res => new BigNumber(res))
      ]);
      setTotalSupply(supply.minus(stakedBalance));
      setBurnedSashimi(new BigNumber(burnedSashimi));
      setFishFeedBalance(new BigNumber(fishFeedBalance));
    }
    if (yam) {
      fetchTotalSupply()
    }
  }, [yam, setTotalSupply])

  const circulatingPercent = totalSupply
    ? `(${(getBalanceNumber(totalSupply) / (10**6)).toFixed(2)}%)` : '';

  return (
    <>
      <TotalSupply>
        {account && <div>
          Total Sashimi Supply: {(100000000 - getBalanceNumber(burnedSashimi)).toLocaleString('currency', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          <a href="https://etherscan.io/token/0xC28E27870558cF22ADD83540d2126da2e4b464c2" target="_blank"> Contract</a>
        </div>}
        {account && <div>
          Total Sashimi Burned: {getBalanceNumber(burnedSashimi).toLocaleString('currency', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          <a href="https://etherscan.io/token/0xC28E27870558cF22ADD83540d2126da2e4b464c2?a=0x000000000000000000000000000000000000dead" target="_blank"> Burn Record</a>
        </div>}
        {account && <div>
          Total in Sashimi Treasury: {getBalanceNumber(fishFeedBalance).toLocaleString('currency', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          <a href="https://etherscan.io/address/0x84ee348617563944ffd4a23843e086a7dc0224f3#tokentxns" target="_blank"> Treasury Record</a>
        </div>}
      </TotalSupply>
      <StyledWrapper>
        <StyledCard>
          <CardContent>
            <StyledBalances>
              <StyledBalance>
                <div style={{ flex: 1 }}>
                  <Label text="Your SASHIMI Balance" />
                  <Value
                    value={!!account ? getBalanceNumber(sushiBalance) : 'Locked'}
                  />
                </div>
              </StyledBalance>
            </StyledBalances>
            <Footnote>
              Pending harvest
              <FootnoteValue>
                <PendingRewards /> SASHIMI
              </FootnoteValue>
            </Footnote>
          </CardContent>
        </StyledCard>
        <Spacer />

        <StyledCard>
          <CardContent>
            <Label text={`Circulating SASHIMI Supply ${circulatingPercent}`} />
            <Value
              value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
            />
            <Footnote>
              New rewards per block
              {/* TODO: Follow the plan */}
              <FootnoteValue>10 SASHIMI</FootnoteValue>
            </Footnote>
          </CardContent>
        </StyledCard>
      </StyledWrapper>
    </>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 12px 0 0 0;
  color: ${(props) => props.theme.color.grey[400]};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
    padding: 0 16px;
  }
`

const StyledCard = styled(Card)`
  max-width: 450px;
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

const TotalSupply = styled.div`
  color: #aa9585;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
`

export default Balances
