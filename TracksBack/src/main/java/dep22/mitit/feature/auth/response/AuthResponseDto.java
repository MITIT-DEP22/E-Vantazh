package dep22.mitit.feature.auth.response;

public record AuthResponseDto(
        String accessToken,
        String refreshToken
) {
}
