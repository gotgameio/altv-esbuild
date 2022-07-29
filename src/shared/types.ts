/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SomeObject = Record<string, any>

export type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends SomeObject | boolean | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (T[K] extends (...args: any[]) => any ? T[K] : DeepRequired<T[K]>)
    : T[K]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConvertBoolsToObjects<T extends SomeObject> = {
  [K in keyof T]: T[K] extends boolean | SomeObject | undefined ? Extract<T[K], SomeObject> : T[K]
}

export type PluginMode = "client" | "server"

export type FilledPluginOptions = Readonly<DeepRequired<ConvertBoolsToObjects<IPluginOptions>>>

export interface IPluginDevOption {
  /**
   * `true` by default.
   */
  enabled?: boolean

  /**
   * Enables resource restart at any file change.
   *
   * `true` by default if `dev` enabled.
   */
  hotReload?: boolean

  /**
   * TCP Port that will be used for hot reload server (communication between altv server and esbuild plugin).
   *
   * `8877` by default.
   */
  hotReloadServerPort?: number

  /**
   * Enables players reconnect emulation (clearing some player stuff on resourceStop and emiting playerConnect).
   *
   * `true` by default if `dev` enabled.
   */
  playersReconnect?: boolean

  /**
   * Milliseconds delay before connecting players for {@link playersReconnect}
   * (this value is ignored if `playersReconnect` is disabled).
   *
   * `200` by default if `dev` enabled..
   */
  playersReconnectDelay?: number

  /**
   * Enables command for restarting resource (destroying everything, reconnecting client, etc.).
   *
   * The command name is "res" if `true` specified, otherwise your passed value.
   *
   * `true` by default if `dev` enabled.
   */
  restartCommand?: boolean | string

  /**
   * Enables emulation of clientside
   * {@link https://xxshady.github.io/custom-altv-types/interfaces/_alt_client_.iclientevent.html#connectioncomplete connectionComplete}
   * event in dev mode.
   *
   * `true` by default if `dev` enabled.
   */
  connectionCompleteEvent?: boolean

  /**
   * Enables emulation of clientside
   * {@link https://xxshady.github.io/custom-altv-types/interfaces/_alt_client_.iclientevent.html#disconnect disconnect}
   * event in dev mode.
   *
   * `true` by default if `dev` enabled.
   */
  disconnectEvent?: boolean

  /**
   * Enables handling of top level exceptions.
   *
   * `true` by default if `dev` enabled..
   */
  topLevelExceptionHandling?: boolean

  /**
   * Enables moving import of the modules included in esbuild option `external`
   * (as well as nodejs built-in modules) to the top of the bundle.
   *
   * Equals `topLevelExceptionHandling` by default.
   */
  moveExternalsOnTop?: boolean
}

export interface IPluginFixesOption {
  /**
   * https://github.com/altmp/altv-issues/issues/644
   *
   * `true` by default.
   */
  webViewFlickering?: boolean

  /**
   * https://github.com/altmp/altv-js-module/issues/106
   *
   * Works only with enabled `dev` option.
   *
   * `true` by default.
   */
  playerPrototype?: boolean
}

export interface IPluginOptions {
  mode: PluginMode

  /**
   * Enables dev mode and hot reload if not disabled.
   *
   * (some cleaning stuff on resource stop,
   * such as destroying vehicles or clearing all metadata set by resource,
   * players reconnect emulation, etc.).
   *
   * `false` by default.
   */
  dev?: boolean | IPluginDevOption

  /**
   * Enables alt:V or GTA bug fixes.
   *
   * `true` by default.
   */
  bugFixes?: boolean | IPluginFixesOption
}