package dep22.mitit.feature.token;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TokenRepository extends JpaRepository<Token, UUID> {
    List<Token> findByIsRevokedAndIsExpiredAndUser_Id(boolean isRevoked, boolean isExpired, UUID id);

    Optional<Token> findByToken(String jwt);
}
