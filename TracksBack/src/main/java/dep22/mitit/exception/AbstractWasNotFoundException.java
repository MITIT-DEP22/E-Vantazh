package dep22.mitit.exception;

public abstract class AbstractWasNotFoundException extends RuntimeException {
    public AbstractWasNotFoundException() {}

    public AbstractWasNotFoundException(String message) {
        super(message);
    }
}
