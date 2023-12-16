package dep22.mitit.exception;

public abstract class AbstractAlreadyExistsException extends RuntimeException {
    public AbstractAlreadyExistsException() {}

    public AbstractAlreadyExistsException(String message) {
        super(message);
    }
}