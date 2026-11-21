import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './src/App'

describe('App component', () => {
  it('should display GitHub as the default active tab', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'GitHub', level: 1 }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /GitHub/ }),
    ).toHaveAttribute('aria-current', 'page')
  })

  it('should switch to Docker when the user clicks Docker', async () => {
    const user = userEvent.setup()

    render(<App />)

    const dockerButton = screen.getByRole('button', {
      name: /Docker/,
    })

    await user.click(dockerButton)

    expect(
      screen.getByRole('heading', { name: 'Docker', level: 1 }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Containers, images, and running services'),
    ).toBeInTheDocument()

    expect(dockerButton).toHaveAttribute('aria-current', 'page')
  })

  it('should display recent activity tasks', () => {
    render(<App />)

    expect(
      screen.getByText('Fix authentication workflow'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Deploy production cluster'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Update container configuration'),
    ).toBeInTheDocument()
  })
})