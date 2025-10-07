/**
 * @module Docs
 * @description JSDoc definitions for the project
 * @author Nunzio Ricci <
 */

/**
 * @typedef {object} AppState
 * @property {AuthState} user - Authenticated user's username
 */

/**
 * @typedef {AuthAuthorizedState | AuthUnauthorizedState | AuthUncheckedState} AuthState
 */

/**
 * @typedef {{ status: "authorized" } & User} AuthAuthorizedState
 */

/**
 * @typedef {{ status: "unauthorized" }} AuthUnauthorizedState
 */

/**
 * @typedef {{ status: "unchecked" }} AuthUncheckedState
 */
