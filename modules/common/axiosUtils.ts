import toast from './toast'

export function handleAxiosException(error: unknown): void {
  toast('error', 'Failed to load data :(')
  throw error
}
