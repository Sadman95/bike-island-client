import { createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
    const color = colors;

    const themeOption = {
        colors: color,
        heading: customization.mode == 'light' ? color.grey900 : color.darkTextTitle,
        paper: customization.mode == 'light' ? color.paper : color.darkPaper,
        backgroundDefault: customization.mode == 'light' ? color.paper : color.darkPaper,
        background: customization.mode == 'light' ? color.primaryLight : color.darkLevel2,
        darkTextPrimary: customization.mode == 'light' ? color.grey700 : color.grey300,
        darkTextSecondary: customization.mode == 'light' ? color.grey800 : color.darkSecondaryLight,
        textDark: customization.mode == 'light' ? color.grey900 : color.darkLevel2,
        menuSelected: customization.mode == 'light' ? color.secondaryDark : color.secondaryLight,
        menuSelectedBack: customization.mode == 'light' ? color.secondaryLight : color.secondaryDark,
        divider: customization.mode == 'light' ? color.grey500 : color.grey200,
        customization
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;
