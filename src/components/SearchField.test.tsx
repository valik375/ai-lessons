import { useState } from 'react'
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import { SearchField } from './SearchField'

function SearchFieldWrapper() {
  const [value, setValue] = useState('')

  return <SearchField value={value} onChange={setValue} />
}

describe('SearchField component', () => {
  it('render SearchField component', async () => {
    render(<SearchFieldWrapper />)
    const searchInput = screen.getByRole('searchbox', { name: "Search items" })
    await userEvent.type(searchInput, 'лампа')
    expect(searchInput).toHaveValue('лампа')
  })
  
  it('render SearchField component with out clear button', () => {
    render(<SearchFieldWrapper />)
    const clearButton = screen.queryByRole('button', { name: "Clear search" })
    expect(clearButton).not.toBeInTheDocument()
  })
  
  it('render SearchField component with clear button', async () => {
    render(<SearchFieldWrapper />)
    const searchInput = screen.getByRole('searchbox', { name: "Search items" })
    await userEvent.type(searchInput, 'лампа')
    const clearButton = screen.getByRole('button', { name: "Clear search" })
    expect(clearButton).toBeInTheDocument()
    await userEvent.click(clearButton)
    expect(searchInput).toHaveValue('')
    expect(screen.queryByRole('button', { name: "Clear search" })).not.toBeInTheDocument()
  })
})
