export default class ValidationError extends Error {
    private fieldName: string;
    private fieldError: string;

    constructor(fieldName: string, fieldError: string,  message?: string) {
        super(message)
        this.fieldName = fieldName;
        this.fieldError = fieldError;
        this.name = "ValidationError"
    }
}
