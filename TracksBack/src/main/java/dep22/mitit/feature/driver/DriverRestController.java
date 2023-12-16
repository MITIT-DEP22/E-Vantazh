package dep22.mitit.feature.driver;

import dep22.mitit.feature.user.User;
import dep22.mitit.feature.user.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipal;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/drivers")
public class DriverRestController {

    private final UserService userService;
    private final DriverService driverService;

    @GetMapping
    public List<Driver> getDrivers(Principal userPrincipal) {
        User user = userService.getUserFromUserPrincipal(userPrincipal);
        return driverService.getDriversByOperatorId(user.getId());
    }

    @GetMapping("/{id}")
    public Driver getDriverById(@PathVariable UUID id) {
        return driverService.getDriverById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDriverById(@PathVariable UUID id) {
        driverService.deleteDriverById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Driver createDriver(@RequestBody Driver driver,
                               Principal userPrincipal) {
        User user = userService.getUserFromUserPrincipal(userPrincipal);
        return driverService.createDriver(driver, user);
    }

}
