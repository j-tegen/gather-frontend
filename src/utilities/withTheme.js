import React from 'react'
import { create } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
    MuiThemeProvider,
    createMuiTheme,
    createGenerateClassName,
    jssPreset,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#39796b',
            main: '#004d40',
            dark: '#00251a',
            contrastText: '#fff',
        },
        secondary: {
            light: '#fd558f',
            main: '#c51162',
            dark: '#80038',
            contrastText: '#fff',
        },
    },
})


const jss = create(jssPreset())
const generateClassName = createGenerateClassName()

const withTheme = (Component) => {
    const WithTheme = (props) => {
        return (
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...props} />
                </MuiThemeProvider>
            </JssProvider>
        )
    }
    return WithTheme
}

export default withTheme
