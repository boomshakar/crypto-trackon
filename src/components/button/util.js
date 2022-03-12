import Colour from "../../lib/colour";

export function getColorShape(stateType) {
    const colours = {
        filled: {
            background: Colour.Primary,
            border:     Colour.Primary,
            text:       Colour.White,
        },
        hollow: {
            background: Colour.White,
            border:     Colour.White,
            text:       Colour.Black,
        },
        outline: {
            background: Colour.White,
            border:     Colour.DeepGrey,
            text:       Colour.TextGrey,
        },
    };

    return colours[stateType];
}

export function getVariantColour(variant) {
    const variants = {
        primary: Colour.Primary,
        black: Colour.Black,
        subdue: Colour.Subdue,
        success: Colour.NotificationSuccess,
    };

    return variants[variant];
}
