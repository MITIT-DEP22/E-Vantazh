package dep22.mitit.feature.user;

import dep22.mitit.feature.user.dto.OperatorDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserRestController {

    private final UserService userService;
    private final OperatorMapper operatorMapper;

    @GetMapping("/profile")
    public User getUserProfile(Principal userPrincipal) {
        return userService.getUserFromUserPrincipal(userPrincipal);
    }

    @GetMapping("/operators")
    public List<OperatorDto> getOperators() {
        return userService.getOperators()
                .stream().map(operatorMapper::fromUserToOperator)
                .toList();
    }

    @GetMapping("/operators/{id}")
    public OperatorDto getOperator(@PathVariable UUID id) {
        return operatorMapper.fromUserToOperator(userService.findById(id));

    }
}
