package dep22.mitit.exception;

public class EntityWasNotFoundException extends RuntimeException{
    public EntityWasNotFoundException() {}

    public EntityWasNotFoundException(String message) {
        super(message);
    }
}
