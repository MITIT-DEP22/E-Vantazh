package dep22.mitit.feature.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String username);

    boolean existsByEmail(String email);

    @Transactional
    @Modifying
    @Query("update User u set u.isEnabled = ?1 where u.email = ?2")
    void updateIsEnabledByEmail(boolean isEnabled, String email);


}
