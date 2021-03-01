export class FileNotFoundError extends Error {
  errorMessage: string
  constructor(errorMessage: string) {
    super()
    this.errorMessage = errorMessage

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FileNotFoundError)
    }
  }
}
