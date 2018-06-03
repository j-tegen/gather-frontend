import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import SERVER_URL from './settings'
import registerServiceWorker from './registerServiceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache }from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'

const httpLink = new HttpLink({ uri: SERVER_URL })

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>
    , document.getElementById('root')
)
registerServiceWorker()