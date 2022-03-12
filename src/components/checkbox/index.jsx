import React from "react";
import { Checkbox as RCheckbox } from "antd";
import TextContent from "../textContent";
import PropTypes from "prop-types";

export default function Checkbox(props) {
    function onChange(event) {
        props.onChange(event.target.checked)
    }

    return (
        <RCheckbox checked={props.isChecked} onChange={onChange}>
            <TextContent fontSize={14}>{props.label}</TextContent>
        </RCheckbox>
    )
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.bool.isRequired,
}
