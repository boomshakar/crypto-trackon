import React from "react";
import Colour from "../../lib/colour";
import styled from "styled-components";

const LoaderWrapper = styled.div`
    font-size: 120px;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Colour.Primary};
`;
const LoaderWrapperMini = styled.div`
    font-size: 60px;
    width: 100%;
    height: 100%;
    display: flex;
    font-weight: 700;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    color: ${Colour.Primary};
`;

export default function Loader() {
    return (
        <LoaderWrapper colour={Colour.White}>
            <i className="fas fa-circle-notch fa-spin" />
        </LoaderWrapper>
    );
}
export function LoaderMini() {
    return (
        <LoaderWrapperMini colour={Colour.White}>
            <i className="fas fa-circle-notch fa-spin" />
        </LoaderWrapperMini>
    );
}
