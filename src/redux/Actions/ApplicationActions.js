export const CHANGE_PAGE = 'CHANGE_PAGE'

export function changePage (destinationPage) {
    return {
        type: CHANGE_PAGE,
        currentPage: destinationPage
    }
}
