export const CHANGE_PAGE = 'CHANGE_PAGE'
export const SET_CRITICAL_EXCEPTION = 'SET_CRITICAL_EXCEPTION'
export const CLEAR_CRITICAL_EXCEPTION = 'CLEAR_CRITICAL_EXCEPTION'

export function changePage (destinationPage) {
    return {
        type: CHANGE_PAGE,
        currentPage: destinationPage
    }
}

export function setCriticalException(payload) {
    return {
        type: SET_CRITICAL_EXCEPTION,
        exception: payload.exception
    }
}

export function clearCriticalException() {
    return {
        type: CLEAR_CRITICAL_EXCEPTION
    }
}
