import React, {useEffect, useMemo, useState} from 'react'
import {Row, Col, Slider, Button, InputNumber, Spin} from 'antd';

import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import BigNumber from "bignumber.js";

import usdtImg from '../../../../src/assets/img/vault-coins/usdt.svg';
import daiImg from '../../../../src/assets/img/vault-coins/dai.png';
import usdcImg from '../../../../src/assets/img/vault-coins/usdc.svg';
import wbtcImg from '../../../../src/assets/img/vault-coins/wbtc.svg';

import '../Vault.less';
import {UpOutlined, DownOutlined} from "@ant-design/icons/lib";
import {provider} from "web3-core";
import {
  getControllerContract,
  getStrategyContract,
  getVaultContract,
  vaultDeposit,
  vaultWithdraw
} from '../../../utils/vault';
import useTokenBalance from "../../../hooks/useTokenBalance";
import {getBalanceNumber} from "../../../utils/formatBalance";
import {useVaultUserBalance} from "../../../hooks/vault/useVaultUserBalance";
import useAllowance from "../../../hooks/vault/useAllowance";
import {getContract} from "../../../utils/erc20";
import ButtonUnlockWallet from '../../../components/ButtonUnlockWallet/index'
import useApprove from "../../../hooks/vault/useApprove";

import { weiUnitDecimal, vaultController } from '../../../sushi/lib/constants';
import {getEthChainInfo} from "../../../utils/getEthChainInfo";
import {Link} from "react-router-dom";

const {
  ethscanType
} = getEthChainInfo();

function formatter(value: any) {
  return `${value}%`;
}

const imgUrls = {
  USDT: usdtImg,
  DAI: daiImg,
  USDC: usdcImg,
  WBTC: wbtcImg,
  'ETH-USDT': usdtImg,
  'DAI-ETH': daiImg,
  'USDC-ETH': usdcImg,
  'WBTC-ETH': wbtcImg,
};

interface TokenPanelProps {
  // why: https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
  tokenName: keyof typeof imgUrls,
  vaultAddr: string,
  stableCoinAddr: string,
  stableBalance: BigNumber,
  weiUnit: keyof typeof weiUnitDecimal,
  ratio: BigNumber,
  valueLocked: BigNumber,
  wethPrice: number,
  // tokenPrice: number,
  apy: number,
  extraAPY: string,
  isStable?: boolean
}

const isVolunteer = window.location.href.includes('volunteer');

const TokenPanel: React.FC<TokenPanelProps> = ({
  tokenName, vaultAddr, stableCoinAddr, stableBalance,
  weiUnit, ratio, valueLocked,
  wethPrice, apy, extraAPY, isStable
}) => {
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet();

  const vaultContract: Contract = useMemo(() => getVaultContract(ethereum, vaultAddr), [ethereum]);

  const stableContract: Contract = useMemo(() => getContract(ethereum, stableCoinAddr), [ethereum]);
  const stableTokenAllowance = useAllowance(stableContract, vaultAddr);
  const { onApprove } = useApprove(stableContract, vaultAddr);

  const walletBalance: BigNumber = useTokenBalance(stableCoinAddr);
  const [walletBalanceShow, setWalletBalanceShow] = useState(0);
  useEffect(() => {
    let walletBalanceShow = getBalanceNumber(walletBalance, weiUnitDecimal[weiUnit]);
    setWalletBalanceShow(walletBalanceShow);
  }, [walletBalance]);

  const vaultUserBalance = useVaultUserBalance(vaultContract);
  const [vaultUserBalanceShow, setVaultUserBalanceShow] = useState(0);
  useEffect(() => {
    let vaultUserBalanceShow = getBalanceNumber(vaultUserBalance, weiUnitDecimal[weiUnit]);
    setVaultUserBalanceShow(vaultUserBalanceShow);
  }, [vaultUserBalance]);

  const [depositPercent, setDepositPercent] = useState(0);
  const [depositValue, setDepositValue] = useState(new BigNumber(0));
  const [depositValueShow, setDepositValueShow] = useState(0);

  const [withdrawPercent, setWithdrawPercent] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState(new BigNumber(0));
  const [withdrawValueShow, setWithdrawValueShow] = useState(0);

  const [panelHidden, setPanelHidden] = useState(true);

  const [depositButtonLoading, setDepositButtonLoading] = useState(false);
  const [withdrawButtonLoading, setWithdrawButtonLoading] = useState(false);

  useEffect(() => {
    const depositValueShow = Number.parseFloat(getBalanceNumber(depositValue, weiUnitDecimal[weiUnit]).toFixed(weiUnitDecimal[weiUnit]));
    setDepositValueShow(depositValueShow);
  }, [depositValue]);

  useEffect(() => {
    const withdrawValueShow = Number.parseFloat(getBalanceNumber(withdrawValue, weiUnitDecimal[weiUnit]).toFixed(weiUnitDecimal[weiUnit]));
    setWithdrawValueShow(withdrawValueShow);
  }, [withdrawValue]);

  // reset
  useEffect(() => {
    if (!account) {
      setWithdrawPercent(0);
      setWithdrawValue(new BigNumber(0));
      setDepositPercent(0);
      setDepositValue(new BigNumber(0));
      setWalletBalanceShow(0);
      setVaultUserBalanceShow(0);
    }
  }, [account, ethereum]);

  const walletTokenUnit = isStable ? '' : 'UNI-V2 LP';
  const depositTokenUnit = isStable ? '' : 'svUNI-V2';
  const vaultTokenName = isStable ? `sv${tokenName}` : tokenName;

  const depositLinkInDesc = isStable
    ? `https://etherscan.io/token/${stableCoinAddr}` : `https://info.uniswap.org/pair/${stableCoinAddr}`;

  return (
    <>
      {/* staking */}
      <Row className="vault-card">
        <Col span={24}>
          <Row className={`vault-stable-info ${panelHidden && 'vault-stable-info-hidden'}`} onClick={() => setPanelHidden(!panelHidden)}>
            <Col span={15} md={7}>
              <Row>
                <Col className="vault-info-subtitle">
                  <img src={imgUrls[tokenName]} alt="btc-logo" style={{width: '40px', height: '40px', marginRight: '8px'}}/>
                </Col>
                <Col className="vault-info-title">
                  <a className="vault-info-title vault-display-block"
                     href={`https://${ethscanType}etherscan.io/address/${vaultAddr}`} target="_blank">{tokenName} Vault ↗
                  </a>
                  <a className="vault-info-subtitle vault-display-block"
                     href={depositLinkInDesc} target="_blank">
                    {tokenName} {walletTokenUnit} ↗
                  </a>
                </Col>
              </Row>
            </Col>

            <Col span={6} md={7}>
              <Row justify="center" style={{flexDirection: "column", alignItems: "center"}}>
                <Col span={24} className="vault-info-subtitle">APY</Col>
                <Col span={24} className="vault-info-title">{apy ? apy.toFixed(2) : '0.0'}%
                  {isStable ? <>+ <Link to={`/farms/${vaultTokenName}`}>{extraAPY.substring(0, extraAPY.indexOf('.') + 3)}%↗</Link></> :
                  <>+ <Link to={`/farms/${tokenName}%20svUNI-V2`}>{extraAPY.substring(0, extraAPY.indexOf('.') + 3)}%↗</Link></>}
                </Col>
              </Row>
            </Col>

            <Col span={0} md={8}>
              <Row justify="end" style={{flexDirection: "column", alignItems: "flex-end"}}>
                <Col span={24} className="vault-info-subtitle">Available to deposit</Col>
                <Col span={24} className="vault-info-title">{walletBalanceShow.toFixed(8)} {tokenName} {walletTokenUnit}</Col>
              </Row>
            </Col>
            <Col span={3} md={2}>
              <Row align="middle" justify="end" style={{height: "100%"}}>
                <Col>
                  <Button
                    type="primary"
                    icon={panelHidden ? <DownOutlined/> : <UpOutlined />}
                    onClick={() => {}}
                  />
                </Col>
              </Row>
            </Col>

          </Row>
        </Col>
        {isVolunteer && <Col span={24}>
          <Button type="primary" onClick={() => {
            if (!account) {
              alert('Please login');
              return;
            }
            vaultContract.methods.earn().send({from: account});
          }}>
            earn
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={async () => {
            if (!account) {
              alert('Please login');
              return;
            }
            const controllerContract = getControllerContract(ethereum, vaultController);
            const strategyAddress = await controllerContract.methods.strategies(stableCoinAddr).call();
            const strategyContract = getStrategyContract(ethereum, strategyAddress);
            await strategyContract.methods.harvest().send({from: account});
          }}>
            harvest
          </Button>
        </Col>}
        {/* Deposit */}
        <Row className={`vault-operation-panel ${panelHidden && 'vault-operation-panel-hidden'}`}>

          <Col span={24} className="vault-operation-info-container">
            <div className="vault-operation-info-bg">
              <div>
                Deposit
                <a href={depositLinkInDesc} target="_blank"> {tokenName} {walletTokenUnit} ↗ </a>
                {!isStable && 'to farm (and dump) UNI'} for more {tokenName} {walletTokenUnit} tokens.
              </div>
              <div>
                Total value locked = ${(isStable
                ? stableBalance.div(10 ** weiUnitDecimal[weiUnit]) : valueLocked.div(10 ** weiUnitDecimal[weiUnit])
                  .times(wethPrice)).toNumber().toLocaleString('currency', {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
              })}
              </div>
              <div>
                1 {vaultTokenName} {depositTokenUnit} = {ratio.toNumber()} {tokenName} {walletTokenUnit}.
              </div>
            </div>
          </Col>

          <Col span={24} md={12} className="vault-operation-card">
            <div className="vault-balance">Your Wallet: {walletBalanceShow.toFixed(8)} {tokenName} {walletTokenUnit}</div>
            <div className="vault-blank"/>
            <InputNumber className="vault-input-number" placeholder="0" max={walletBalanceShow} value={depositValueShow} onChange={(value ) => {
              const valueTemp = value || 0;
              const depositValue: BigNumber = (new BigNumber(valueTemp)).times(10 ** weiUnitDecimal[weiUnit]);
              const depositValueTemp = depositValue.gt(walletBalance) ? walletBalance : depositValue;
              setDepositValue(depositValueTemp);
              let depositPercent = 0;
              if (!walletBalance.isEqualTo(0)) {
                depositPercent = Number.parseFloat(depositValueTemp.div(walletBalance).times(100).toNumber().toFixed(1));
              }
              setDepositPercent(depositPercent);
            }}/>
            <div className="vault-blank"/>
            <Row>
              <Col span={2} md={2}>
                <Row align="middle" justify="start" style={{"height": "100%"}}>
                  <Col>
                    {depositPercent}%
                  </Col>
                </Row>
              </Col>
              <Col span={18} md={19}>
                <Slider
                  tipFormatter={formatter}
                  min={0}
                  max={100}
                  onChange={(value: number) => {
                    if (!account) {
                      return;
                    }
                    setDepositPercent(value);
                    setDepositValue(walletBalance.times(value).div(100));
                  }}
                  value={typeof depositPercent === 'number' ? depositPercent : 0}
                />
              </Col>
              <Col span={4} md={3}>
                <Row align="middle" justify="end" style={{height: "100%"}}>
                  <Col>
                    <Button size="small" type="primary" onClick={() => {
                      setDepositPercent(100);
                      setDepositValue(walletBalance);
                    }}>
                      MAX
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="vault-blank"/>
            <div>{depositPercent}% = {depositValueShow} {tokenName} {walletTokenUnit}</div>
            <div className="vault-blank"/>
            <div className="vault-button-container">
              <Spin spinning={depositButtonLoading}>
                {
                  account ?
                  <Button size="large" type="primary" style={{ width: '60%'}}
                          disabled={depositValue.isEqualTo(0)}
                          onClick={async () => {
                            setDepositButtonLoading(true);
                            try {
                              if (stableTokenAllowance.isEqualTo(0)) {
                                const result = await onApprove();
                                if (!result) {
                                  alert('Approved failed!');
                                }
                              }
                              await vaultDeposit(vaultContract, account, depositValue.decimalPlaces(weiUnitDecimal[weiUnit]));
                              setDepositButtonLoading(false);
                              setDepositPercent(0);
                              setDepositValue(new BigNumber(0));
                            } catch(e) {
                              console.log('deposit error: ', e);
                              setDepositButtonLoading(false);
                            }
                          }}>
                    Deposit
                  </Button> : <ButtonUnlockWallet/>
                }
              </Spin>
            </div>
          </Col>
          {/* Withdraw */}
          <Col span={24} md={12} className="vault-operation-card">
            <div className="vault-balance">Your Balance: {vaultUserBalanceShow.toFixed(8)} {vaultTokenName} {depositTokenUnit}</div>
            <div className="vault-blank"/>
            <InputNumber className="vault-input-number" placeholder="0" max={vaultUserBalanceShow} value={withdrawValueShow} onChange={(value ) => {
              const valueTemp = value || 0;
              const withdrawValue: BigNumber = (new BigNumber(valueTemp)).times(10 ** weiUnitDecimal[weiUnit]);
              const withdrawValueTemp = withdrawValue.gt(vaultUserBalance) ? walletBalance : withdrawValue;
              setWithdrawValue(withdrawValueTemp);
              let withdrawPercent = 0;
              if (!walletBalance.isEqualTo(0)) {
                withdrawPercent = Number.parseFloat(withdrawValue.div(vaultUserBalance).times(100).toNumber().toFixed(1));
              }
              setWithdrawPercent(withdrawPercent);
            }}/>
            <div className="vault-blank"/>
            <Row>
              <Col span={2} md={2}>
                <Row align="middle" justify="start" style={{"height": "100%"}}>
                  <Col>
                    {withdrawPercent}%
                  </Col>
                </Row>
              </Col>
              <Col span={18} md={19}>
                <Slider
                  tipFormatter={formatter}
                  min={0}
                  max={100}
                  onChange={(value: number) => {
                    if (!account) {
                      return;
                    }
                    setWithdrawPercent(value);
                    setWithdrawValue(vaultUserBalance.times(value).div(100));
                  }}
                  value={typeof withdrawPercent === 'number' ? withdrawPercent : 0}
                />
              </Col>
              <Col span={4} md={3}>
                <Row align="middle" justify="end" style={{height: "100%"}}>
                  <Col>
                    <Button size="small" type="primary" onClick={() => {
                      setWithdrawPercent(100);
                      setWithdrawValue(vaultUserBalance);
                    }}>
                      MAX
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="vault-blank"/>
            <div>{withdrawPercent}% = {withdrawValueShow} {tokenName} {depositTokenUnit}</div>
            <div className="vault-blank"/>
            <div className="vault-button-container">
              <Spin spinning={withdrawButtonLoading}>
                {
                  account ?
                  <Button size="large" type="primary" style={{ width: '60%'}}
                          disabled={withdrawValue.isEqualTo(0)}
                          onClick={async () => {
                            setWithdrawButtonLoading(true);
                            try {
                              if (stableTokenAllowance.isEqualTo(0)) {
                                const result = await onApprove();
                                if (!result) {
                                  alert('Approved failed!');
                                }
                              }
                              await vaultWithdraw(vaultContract, account, withdrawValue.decimalPlaces(weiUnitDecimal[weiUnit]));
                              setWithdrawButtonLoading(false);
                              setWithdrawPercent(0);
                              setWithdrawValue(new BigNumber(0));
                            } catch(e) {
                              console.log('withdraw error: ', e);
                              setWithdrawButtonLoading(false);
                            }
                          }}
                  >
                    Withdraw (0.5% Fee)
                  </Button> : <ButtonUnlockWallet/>
                }
              </Spin>
            </div>
          </Col>
        </Row>
      </Row>
    </>
  )
}

export default TokenPanel
