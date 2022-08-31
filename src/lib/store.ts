import { writable } from 'svelte/store';

export type CommandTransaction = {
  id: string
  name?: string
  command: string
  stdout_raw: string
  stdout_html: string
  stderr_raw: string
  stderr_html: string
}

export enum ErrorType {
  server_error,
  transport_error,
  unknown_error,
}

export type ErrorNotif = {
  id: string
  message: string
  type: ErrorType
  time: number
}

function createHistoryCommand(value: CommandTransaction[]) {
  const { update, set, subscribe } = writable<CommandTransaction[]>(value)

  const remove = (id: string) => {
    update((state) => state.filter((item) => item.id !== id))
  }

  const add = (command_obj: CommandTransaction) => {
    update((state) => [...state, command_obj])
  }
  return {
    update,
    set,
    subscribe,
    remove,
    add,
  }
}

function createErrorStore(value: ErrorNotif[]) {
  const { update, set, subscribe } = writable<ErrorNotif[]>(value)

  const remove = (id: string) => {
    update((state) => state.filter((item) => item.id !== id))
  }

  const add = (command_obj: ErrorNotif) => {
    update((state) => [...state, command_obj])
  }
  return {
    update,
    set,
    subscribe,
    remove,
    add,
  }
}

export const history = createHistoryCommand([])
export const errors = createErrorStore([])
