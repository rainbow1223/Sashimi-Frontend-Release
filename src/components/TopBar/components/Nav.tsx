import React, { useContext } from 'react'
import styled from 'styled-components'
import {
  Dropdown,
  Button,
  Menu
} from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import {
  If,
  Then,
  Else
} from 'react-if'
import { NavLink } from 'react-router-dom'
import { Context } from '../../../contexts/Mobile';

const trigger:('click' | 'hover' | 'contextMenu')[] = ['click'];

interface Link {
  link?: string,
  text?: string,
  isExternal?: boolean
  linkTarget?: string
  isMobile?: boolean
}

const links:Link[] = [
  {
    link: '/',
    text: 'Home'
  },
  {
    link: '/farms',
    text: 'Farms'
  },
  {
    link: '/lending/#/',
    text: 'Lending',
    isExternal: true,
    linkTarget: '_self'
  },
  // {
  //   link: '/double-farms',
  //   text: 'Double\xa0Farm(Beta)'
  // },
  {
    link: '/app/#/swap',
    text: 'Exchanges',
    isExternal: true,
    linkTarget: '_self'
  },
  {
    link: '/staking',
    text: 'Staking'
  },
  {
    link: '/investment',
    text: 'Investment'
  },
  {
    link: '/vault',
    text: 'Vault'
  },
  {
    link: 'https://info.sashimi.cool/',
    text: 'Info↗',
    isExternal: true
  },
  {
    link: 'https://snapshot.sashimi.cool/#/sashimi',
    text: 'Proposals↗',
    isExternal: true
  },
  {
    link: 'https://v2.sashimi.cool/',
    text: 'V2↗',
    isExternal: true
  },
  // In Ethereum Chain Only
  {
    link: 'https://heco.sashimi.cool/',
    text: 'Heco',
    linkTarget: '_self',
    isExternal: true,
    isMobile: true,
  },
];

const chains = [
  {
    link: 'https://heco.sashimi.cool/',
    text: 'Heco',
    linkTarget: '_self',
  },
  {
    link: 'https://bsc.sashimi.cool/',
    text: 'BSC',
    linkTarget: '_self',
  },
  // {
  //   link: 'https://v2.sashimi.cool/',
  //   text: 'Ethereum',
  //   linkTarget: '_self',
  // }
];
const chainSelect = () => {
  return (
    <Menu>
      {
        chains.map((item, index) => {
          return <Menu.Item key={index}>
            <StyledAbsoluteLink href={item.link} target={item.linkTarget || '_blank'}>{item.text}</StyledAbsoluteLink>
          </Menu.Item>
        })
      }
    </Menu>
  )
};

const OverLay = () => {
  return (
    <Menu>
      {
        links.map((v, i) => (
          <>
            {i === 0 ? null : <Menu.Divider />}
            <Menu.Item key={v.text}>
              {
                v.isExternal ? (
                  <StyledAbsoluteLink href={v.link} target={v.linkTarget || '_blank'}>{v.text}</StyledAbsoluteLink>
                ) : (
                  <StyledLink exact activeClassName="active" to={v.link}>{v.text}</StyledLink>
                )
              }
            </Menu.Item>
          </>
        ))
      }
    </Menu>
  );
}

const Nav: React.FC = () => {
  const {
    isMobile
  } = useContext(Context)
  return (
    <If condition={isMobile}>
      <Then>
        <Dropdown trigger={trigger} overlay={OverLay}>
          <Button
            type="primary"
            icon={<MenuOutlined />}
          />
        </Dropdown>
      </Then>
      <Else>
        <StyledNav>
          {
            links.map((v, index) => {
              if (v.isMobile) {
                return null;
              }
              return v.isExternal ? (
                <StyledAbsoluteLink href={v.link} target={v.linkTarget || '_blank'} key={index}>{v.text}</StyledAbsoluteLink>
              ) : (
                <StyledLink exact activeClassName="active" to={v.link} key={index}>{v.text}</StyledLink>
              )
            })
          }
          <div>
            <Dropdown overlay={chainSelect}>
              <Button>
                Ethereum <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </StyledNav>
      </Else>
    </If>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 1200px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
  @media (max-width: 414px) {
    padding-left: ${(props) => props.theme.spacing[1]}px;
    padding-right: ${(props) => props.theme.spacing[1]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 1200px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
  @media (max-width: 414px) {
    padding-left: ${(props) => props.theme.spacing[1]}px;
    padding-right: ${(props) => props.theme.spacing[1]}px;
  }
`

export default Nav
