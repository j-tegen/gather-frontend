import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import SERVER_URL from './settings'
import registerServiceWorker from './registerServiceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache }from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'

import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

const httpLink = new HttpLink({ uri: SERVER_URL })

const authLink = setContext((_, {headers }) => {
    const session = localStorage.getItem('session')
    return {
        headers: {
            ...headers,
            authorization: session ? `JWT ${JSON.parse(session).token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <BrowserRouter >
                <App />
            </BrowserRouter>
        </MuiPickersUtilsProvider>
    </ApolloProvider>

    , document.getElementById('root')
)
registerServiceWorker()
