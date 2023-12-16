package dep22.mitit.feature.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import dep22.mitit.feature.auth.confirmation_token.ConfirmationToken;
import dep22.mitit.feature.auth.confirmation_token.ConfirmationTokenService;
import dep22.mitit.feature.auth.request.AuthRequestDto;
import dep22.mitit.feature.auth.response.AuthResponseDto;
import dep22.mitit.feature.token.TokenService;
import dep22.mitit.feature.user.User;
import dep22.mitit.feature.user.UserRepository;
import dep22.mitit.feature.user.exception.UserWasNotFoundException;
import dep22.mitit.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ConfirmationTokenService confirmationTokenService;

    public AuthResponseDto authenticate(AuthRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                ));

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UserWasNotFoundException(
                        String.format("Failed to authenticate. User with email %s was not found", request.email())
                ));
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        tokenService.revokeAllUserTokens(user);
        tokenService.saveUserToken(user, jwtToken);

        return new AuthResponseDto(jwtToken, refreshToken);
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiredAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        userRepository.updateIsEnabledByEmail(true, confirmationToken.getUser().getEmail());
        return "Email successfully confirmed! Navigate to <a href='https://oleksandrix.space'>back to the site</a> and search!";
    }

    public void refresh(HttpServletRequest request, HttpServletResponse response)  throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UserWasNotFoundException(
                            String.format("Failed to refresh token. User with email %s was not found", userEmail)));
            if (jwtService.isTokenValid(refreshToken, user)) {
                String accessToken = jwtService.generateToken(user);
                tokenService.revokeAllUserTokens(user);
                tokenService.saveUserToken(user, accessToken);
                AuthResponseDto authResponse = new AuthResponseDto(accessToken, refreshToken);
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
