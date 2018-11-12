export const PAGE_TITLE = 'PAGE_TITLE'
export const SEARCH_PLACEHOLDER = 'SEARCH_PLACEHOLDER'
export const SEARCH_INPUT = 'SEARCH_INPUT'

export const setPageTitle = title => ({
  type: PAGE_TITLE,
  title,
})

export const setSearchPlaceholder = placeholder => ({
  type: SEARCH_PLACEHOLDER,
  placeholder,
})

export const setSearchInput = input => ({
  type: SEARCH_INPUT,
  input,
})
