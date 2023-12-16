package dep22.mitit.handler;

import dep22.mitit.dto.ExceptionDto;
import dep22.mitit.exception.AbstractWasNotFoundException;
import dep22.mitit.exception.EntityWasNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class WasNotFoundExceptionHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(WasNotFoundExceptionHandler.class);

    @ExceptionHandler
    public ResponseEntity<ExceptionDto> catchAbstractWasNotFoundException(EntityWasNotFoundException ex) {
        LOGGER.warn(ex.getMessage());
        return new ResponseEntity<>(
                new ExceptionDto(ex.getMessage()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionDto> catchAbstractWasNotFoundException(AbstractWasNotFoundException ex) {
        LOGGER.warn(ex.getMessage());
        return new ResponseEntity<>(
                new ExceptionDto(ex.getMessage()),
                HttpStatus.NOT_FOUND
        );
    }
}
