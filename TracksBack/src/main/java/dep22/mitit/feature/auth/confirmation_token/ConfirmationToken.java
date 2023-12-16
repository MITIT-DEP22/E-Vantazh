package dep22.mitit.feature.auth.confirmation_token;

import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class ConfirmationToken extends AbstractBaseEntity {

    private String token;
    private LocalDateTime expiredAt;
    private LocalDateTime confirmedAt;

    @ManyToOne
    private User user;

}
