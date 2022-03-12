import Colour from "../../lib/colour";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledInput = styled.input`
    padding: 6px 8px;
    font-size: 16px;
    border: 1px solid ${props => props.isAppInput ? Colour.DeepGrey : Colour.GreyBorder};
    outline: none;
    min-width: 250px;
    width: 100%;
    display: block;
    border-radius: 8px;
    box-sizing: border-box;
    color: ${Colour.Black};
    background-color: ${props => props.isAppInput ? Colour.White : Colour.WhiteBlue};
    
    ::-webkit-input-placeholder {
        font-size: 14px;
    }
    &[type=number]::-webkit-outer-spin-button,
    &[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type=number] {
        -moz-appearance:textfield;
    }

`;

const Label = styled.label`
    font-size: 14px;
    color: ${Colour.Black};
`;

const RightLabel = styled.label`
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    color: ${Colour.Primary};
`;

const LabelWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`;

const ErrorLabel = styled.span`
    margin-top: 4px;
    font-size: 14px;
    color: ${Colour.Error};
`;

export default function Input(props) {
    function onTextChange(event) {
        if (props.onChange) {
            props.onChange(event.currentTarget.value);
        }
    }

    function onRightClickChange() {
        if (props.onRightLabelClick) {
            props.onRightLabelClick();
        }
    }

    return (
        <div>
            {props.label && (
                <LabelWrapper>
                    <Label htmlFor={props.name}>{props.label}</Label>
                    {props.rightLabel && <RightLabel onClick={onRightClickChange}>{props.rightLabel}</RightLabel>}
                </LabelWrapper>
            )}
            <StyledInput
                name={props.name}
                id={props.name}
                value={props.value}
                onChange={onTextChange}
                hasLabel={!!props.label}
                type={props.type}
                placeholder={props.placeholder}
                autoComplete={props.autoComplete}
                required={props.required}
                isAppInput={props.isAppInput}
                min={props.minVal}
                step={props.step}
            />
            {props.error && <ErrorLabel>{props.error}</ErrorLabel>}
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    rightLabel: PropTypes.string,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onRightLabelClick: PropTypes.func,
    autoComplete:  PropTypes.string,
    required:  PropTypes.bool,
    isAppInput: PropTypes.bool,
}
