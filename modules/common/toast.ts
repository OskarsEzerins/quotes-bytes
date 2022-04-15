import cogoToast, { CTOptions } from 'cogo-toast'

type toastType = 'info' | 'success' | 'warn' | 'error' | 'loading'

const DEFAULT_OPTIONS: CTOptions = {
  position: 'bottom-right',
}

// NOTE: does not support react 18 yet

function toast(type: toastType, msg: string) {
  const toast = cogoToast[type]

  const { hide } = toast(msg, { ...DEFAULT_OPTIONS, onClick: () => hide && hide() })
}

export default toast
