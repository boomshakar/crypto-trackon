import { getColorShape, getVariantColour } from "./util";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Colour from "../../lib/colour";

const ButtonComponent = styled.button`
    border-radius: ${props => props.isCircle ? "23px" : "6px"};
    cursor: pointer;
    outline: none;
    padding: 8px 20px;
    background-color: ${props => props.variantColour || props.colourShape.background};
    color: ${props => props.colourShape.text};
    border: 1px solid ${props => props.variantColour || props.colourShape.border};
    font-size: 16px;
    width: ${props => props.fullWidth ? "100%" : "auto"};
`;

const Loader = styled.span`
    font-size: 14px;
    margin-left: 8px;
    color: ${props => props.colour};
`;

export default function Button(props) {
    const colour = getColorShape(props.state);
    const variantColour = props.state === "filled" ? getVariantColour(props.variant) : undefined;

    return (
        <ButtonComponent
            colourShape={colour}
            variantColour={variantColour}
            onClick={props.onClick}
            fullWidth={props.fullWidth}
            isCircle={props.shape === "circle"}
            disabled={props.disabled}
            type={props.type}
        >
            {props.children}
            {props.loading && (
                <Loader colour={Colour.White}>
                    <i className="fas fa-circle-notch fa-spin" />
                </Loader>
            )}
        </ButtonComponent>
    )
}

Button.defaultProps = {
    state:   "filled",
    type:    "button",
    variant: "primary",
    shape: "circle",
};

Button.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    type: PropTypes.oneOf(["submit", "button"]),
    state: PropTypes.oneOf(["filled", "hollow", "outline"]),
    variant: PropTypes.oneOf(["primary", "black", "subdue", "success"]),
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    shape: PropTypes.oneOf(["circle", "rectangle"]),
}
