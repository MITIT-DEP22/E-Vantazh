package dep22.mitit.feature.user;

import dep22.mitit.email.EmailService;
import dep22.mitit.exception.EntityWasNotFoundException;
import dep22.mitit.feature.auth.confirmation_token.ConfirmationToken;
import dep22.mitit.feature.auth.confirmation_token.ConfirmationTokenService;
import dep22.mitit.feature.driver.Driver;
import dep22.mitit.feature.driver.DriverRepository;
import dep22.mitit.feature.user.dto.OperatorDto;
import dep22.mitit.feature.user.exception.UserAlreadyExistsException;
import dep22.mitit.feature.vehicle.Vehicle;
import dep22.mitit.feature.vehicle.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static dep22.mitit.util.EmailUtil.buildEmail;

@Service
@RequiredArgsConstructor
public class UserService {

    @Value(value = "${server.host}")
    private String host;

    @Value(value = "${server.port}")
    private String port;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailService emailService;

    public String createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(
                    String.format("Failed to create user. User with email %s already exists", user.getEmail())
            );
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        UUID token = UUID.randomUUID();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token.toString(),
                LocalDateTime.now().plusMinutes(15),
                null,
                user
                );


        confirmationTokenService.create(confirmationToken);

        String link = String.format("https://%s:%s/api/v1/auth/confirm?token=%s", host, 443, token);
        emailService.send(
                user.getEmail(),
                buildEmail(user.getFirstName(), link));

        return token.toString();
    }

    public User getUserFromUserPrincipal(Principal userPrincipal) {
        return (User) ((UsernamePasswordAuthenticationToken) userPrincipal).getPrincipal();
    }

    public List<User> getOperators() {
        return userRepository.findAll()
                .stream().filter(u -> u.getRole() == Role.OPERATOR)
                .toList();
    }

    public User findById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityWasNotFoundException(
                        String.format("Operator with if %s was not found", id)
                ));
    }
}
