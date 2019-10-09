import React from 'react'

import styled from 'styled-components'

const Container = styled.div`
    border-bottom: 1px solid rgba(33, 53, 113, 0.15);
    width: 100%;
    display: flex;
    justify-content: center;
`

const LinkList = styled.div`

    display: flex;
    align-items: center;
    
`

const Symbol = styled.svg`
    height: 59px;
    width: 76px;

    margin: 0 0 8px 24px;

    @media (max-width: 768px) {
        height: 39px;
        width: 51px;
        margin: 0;
    }
`

const Link = styled.a`
    height: 24px;
    margin: 16px 40px 0 0;
    font-family: 'Roboto Mono', monospace;
    color: #1b2c63;
    font-weight: 500;
    font-size: 13px;
    line-height: 1.85;
    letter-spacing: 2.43px;

    cursor: pointer;

    @media (max-width: 768px) {
        margin: 0 16px;
    }
`
const Spacer = styled.div`
    min-height: 116px;
    
    max-width: 1200px;
    width: 100vw;

    

    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        min-height: 134px;

        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
`

const Header = props => {
    return (
        <Container>
        <Spacer>
            <Symbol viewBox="0 0 50 39">
                <g fill="none" fill-rule="evenodd">
                    <path fill="#FFAA8E" d="M34.724 16.406c4.49 5.22 10.045 8.691 15.303 10.022a19.222 19.222 0 0 1-5.614 7.511c-8.364 6.842-20.833 5.778-27.851-2.375-7.018-8.153-5.927-20.309 2.437-27.15A19.888 19.888 0 0 1 27.312.383c.522 5.174 3.04 10.939 7.412 16.023z"/>
                    <path stroke="#1B2C63" stroke-width="2" d="M.603 23.285c3.067-.04 3.627 4.597 7.443 4.587 3.816-.01 3.87-4.627 7.741-4.627 3.87 0 3.87 4.627 7.742 4.627 3.87 0 4.674-4.627 7.74-4.627"/>
                </g>
            </Symbol>
            <LinkList>
                <Link>ABOUT ME</Link>
                <Link>WORK</Link>
                <Link>CONTACT</Link>
            </LinkList>
        </Spacer>
        </Container>
    );
}

export default Header
