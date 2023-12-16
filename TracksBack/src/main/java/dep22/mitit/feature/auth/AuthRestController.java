package dep22.mitit.feature.auth;

import dep22.mitit.exception.ValidationException;
import dep22.mitit.feature.auth.request.AuthRequestDto;
import dep22.mitit.feature.auth.response.AuthResponseDto;
import dep22.mitit.feature.user.User;
import dep22.mitit.feature.user.UserMapper;
import dep22.mitit.feature.user.UserService;
import dep22.mitit.feature.user.dto.UserDto;
import dep22.mitit.feature.user.dto.create.UserCreateRequestDto;
import dep22.mitit.util.ValidationUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthRestController {

    private final UserService userService;
    private final UserMapper userMapper;
    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String register(@RequestBody @Valid UserCreateRequestDto userCreateRequestDto,
                           BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = ValidationUtil.getErrors(bindingResult);
            throw new ValidationException("Failed to register new user", errors);
        }

        User user = userMapper.fromCreateRequestDtoToObject(userCreateRequestDto);
        return userService.createUser(user);
    }

    @GetMapping("/confirm")
    public String confirm(@RequestParam("token") String token) {
        return authService.confirmToken(token);
    }

    @PostMapping("/authenticate")
    public AuthResponseDto authenticate(@RequestBody AuthRequestDto request) {
        return authService.authenticate(request);
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authService.refresh(request, response);
    }
}
