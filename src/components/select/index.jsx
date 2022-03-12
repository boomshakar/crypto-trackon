import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Colour from "../../lib/colour";

const RSelect = styled.select`
    font-size: 14px;
    font-weight: 500;
    padding: 0px;
    border: none;
    outline: none;
    cursor: pointer;
    width: ${props => props.fullWidth ? "100%" : "auto"};
    background-color: ${props => props.isFormInput ? Colour.WhiteBlue : Colour.White};
`;

const SelectWrapper = styled.span`
    border-radius: 6px;
    border: 1px solid ${props => props.isFormInput ? Colour.GreyBorder : Colour.DeepGrey};
    padding: 10px 16px;
    color: ${Colour.BlackText};
    cursor: pointer;
    background-color: ${props => props.isFormInput ? Colour.WhiteBlue : Colour.White};
    display: block;
`;

const Icon = styled.span`
    color: ${Colour.BlackText};
`;

const Label = styled.label`
    font-size: 14px;
    color: ${Colour.Black};
    display: block;
    margin-bottom: 8px;
`;

export default function Select(props) {
    function onChange(event) {
        if (props.onSelect) {
            const selectedOption = props.options.find(option => option.value ===event.target.value);
            props.onSelect(selectedOption);
        }
    }

    return (
        <div>
            {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
            <SelectWrapper isFormInput={props.isFormInput}>
                {props.hasIcon && (
                    <Icon>
                        <i className={props.iconValue} />
                    </Icon>
                )}
                <RSelect
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    onChange={onChange}
                    fullWidth={props.fullWidth}
                    isFormInput={props.isFormInput}
                >
                    {props.options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
                </RSelect>
            </SelectWrapper>
        </div>
    )
}

Select.propTypes = {
    fullWidth: PropTypes.bool,
    isFormInput: PropTypes.bool,
    hasIcon: PropTypes.bool,
    iconValue: PropTypes.string,
    value: PropTypes.string,
    onSelect: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
}
