import React from 'react'
import styled from 'styled-components'

import pic from './images/profile.png'

const Container = styled.img`

    width: ${props => props.dimension}px;
    height: ${props => props.dimension}px;

    display: ${props => props.displayFor === "desktop" ? 'block' : 'none'};

    @media (max-width: 768px) {
        display: ${props => props.displayFor === "mobile" ? 'block' : 'none'};
        align-self: center;
        width: 90%;
        height: auto;
        max-width: 304px;
        

    }



`


const ProfilePicture = props => {
    return (
        <Container src="/images/profile.png" alt="Me!" dimension={props.dimension} displayFor={props.displayFor} />
    );
}

export default ProfilePicture
