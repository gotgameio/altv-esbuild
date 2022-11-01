export type AltAddEvent = (
  eventOrHandler: string | ((...args: unknown[]) => void),
  handler?: ((...args: unknown[]) => void)
) => void

export type AltAddUserEvent = (
  event: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (...args: any[]) => void
) => void

export type AltRemoveEvent =
  // generic event listener
  ((
    handler: ((...args: unknown[]) => void)
  ) => void) |
  // normal event listener
  ((
    event: string,
    handler: ((...args: unknown[]) => void)
  ) => void)

export type EventScope = "local" | "remote"

// eslint-disable-next-line @typescript-eslint/ban-types
export type BaseObjectClass = Function & (new (...args: unknown[]) => object)
