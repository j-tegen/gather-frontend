export const getErrors = (exception) => {
    if(exception.graphQLErrors) {
        return exception.graphQLErrors.reduce((res, err) => [...res, err.message], [])
    }
    return exception.message
}