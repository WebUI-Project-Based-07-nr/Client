import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, vi } from 'vitest'
import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'

describe('EnhacedTablePagination', () => {
  const handleChangePageMock = vi.fn()

  const paginationProps = {
    page: 1,
    pageInput: 1,
    rowsPerPage: 10,
    pageCount: 5,
    itemsCount: 50,

    handleChangePage: handleChangePageMock,
    handleChangeRowsPerPage: vi.fn(),
    handleChangePageInput: vi.fn(),
    handlePageSubmit: vi.fn()
  }

  beforeEach(() => {
    render(<EnhancedTablePagination pagination={paginationProps}/>)
  })
  test('should render the first page', () => {
    expect(screen.getByText(/1-10.*of .*50/)).toBeInTheDocument()
  })

  test('should change page from 1 to 2', async () => {
    const nextPageButton = screen.getByLabelText('Go to next page')
    await userEvent.click(nextPageButton)

    expect(handleChangePageMock).toHaveBeenCalledWith(expect.anything(), 2)
  })
})
