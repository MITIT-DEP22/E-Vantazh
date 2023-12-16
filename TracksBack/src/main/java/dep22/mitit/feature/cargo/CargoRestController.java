package dep22.mitit.feature.cargo;

import dep22.mitit.feature.user.User;
import dep22.mitit.feature.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/cargoes")
@RequiredArgsConstructor
public class CargoRestController {

    private final CargoService cargoService;
    private final UserService userService;

    @GetMapping("/types")
    @ResponseBody
    public Map<String, Map<String, String>> getCargoTypes() {
        return cargoService.getCargoTypes();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Cargo getCargoById(@PathVariable UUID id) {
        return cargoService.getCargoById(id);
    }

    @GetMapping
    @ResponseBody
    public List<Cargo> getCargoesOfOrder(@RequestParam UUID orderId) {
        return cargoService.getCargoesByOrderId(orderId);
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public Cargo createCargoForOrder(@RequestParam UUID orderId,
                                     @RequestBody Cargo cargo,
                                     Principal userPrincipal) {
        User user = userService.getUserFromUserPrincipal(userPrincipal);
        return cargoService.createCargoForOrder(cargo, orderId, user);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable UUID id) {
        cargoService.deleteById(id);
    }
}
