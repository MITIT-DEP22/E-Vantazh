package dep22.mitit.feature.user.exception;

import dep22.mitit.exception.AbstractWasNotFoundException;

public class UserWasNotFoundException extends AbstractWasNotFoundException {
    public UserWasNotFoundException() {
    }

    public UserWasNotFoundException(String message) {
        super(message);
    }
}
