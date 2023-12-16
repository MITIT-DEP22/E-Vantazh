package dep22.mitit.feature.user.exception;

import dep22.mitit.exception.AbstractAlreadyExistsException;

public class UserAlreadyExistsException extends AbstractAlreadyExistsException {
    public UserAlreadyExistsException() {
    }

    public UserAlreadyExistsException(String message) {
        super(message);
    }
}