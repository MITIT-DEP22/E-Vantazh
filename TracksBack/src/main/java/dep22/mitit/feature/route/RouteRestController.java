package dep22.mitit.feature.route;

import dep22.mitit.feature.user.User;
import dep22.mitit.feature.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/routes")
@RequiredArgsConstructor
public class RouteRestController {

    private final RouteService routeService;
    private final UserService userService;

    @PostMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public Route createRoute(@RequestBody Route route,
                             Principal userPrincipal) {
        User user = userService.getUserFromUserPrincipal(userPrincipal);
        return routeService.createRoute(route, user);
    }

    @GetMapping
    @ResponseBody
    public Route getRouteByOrderId(@RequestParam UUID orderId) {
        return routeService.getRouteByOrderId(orderId);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Route getRouteById(@PathVariable UUID id) {
        return routeService.getRouteById(id);
    }
}
