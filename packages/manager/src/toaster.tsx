/**
 * @file Provides methods for toast-based notifications.
 */

import React from 'react';
import { OverlayToaster } from "@blueprintjs/core";

import {ApiError} from './api';

/**
 * Render `error` as a toast message.
 * @param error Error object. If this is a falsy value, the toast message will
 *    be removed.
 * @param errorMessage Message to show
 * @param key Used to uniquely identify the toast message
 */
export const setErrorToast = async (
  key: string,
  error: unknown,
  errorMessage: string
): Promise<void> => {
  const toaster = await OverlayToaster.create({maxToasts: 1});
  if (error) {
    toaster.show(
      {
        icon: 'warning-sign',
        intent: 'warning',
        message:
          error instanceof ApiError ? (
            <>
              {errorMessage}: {error.message}
              <br />
              Response: {String(error.response)}
            </>
          ) : (
            `${errorMessage}: ${error}`
          ),
      },
      key
    );
  } else {
    toaster.dismiss(key);
  }
};

/**
 * Display an informational toast message.
 * @param message Message to show
 */
export const showInfoToast = async (message: string): Promise<void> => {
  const toaster = await OverlayToaster.create({maxToasts: 1});

  toaster.show({icon: 'info-sign', message});
};

/**
 * Display a toast message to indicate that the app is saving something.
 * @param key Used to uniquely identify the toast message
 * @param isSaving Whether to show or hide the toast
 * @param message Message to show
 */
export const setSavingToast = async (
  key: string,
  isSaving: boolean,
  message: string
): Promise<void> => {
  const toaster = await OverlayToaster.create({maxToasts: 1});

  if (isSaving) {
    toaster.show({icon: 'floppy-disk', intent: 'primary', message}, key);
  } else {
    toaster.dismiss(key);
  }
};
