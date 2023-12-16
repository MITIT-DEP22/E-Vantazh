package dep22.mitit.handler;

import com.sun.jdi.InternalException;
import dep22.mitit.dto.ExceptionDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class InternalExceptionHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(AlreadyExistsExceptionHandler.class);

    @ExceptionHandler
    public ResponseEntity<ExceptionDto> catchAbstractAlreadyExistsException(InternalException ex) {
        LOGGER.warn(ex.getMessage());
        return new ResponseEntity<>(
                new ExceptionDto(ex.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
