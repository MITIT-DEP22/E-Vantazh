package dep22.mitit.feature.vehicle;

import dep22.mitit.feature.user.User;
import dep22.mitit.feature.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipal;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/vehicles")
public class VehicleRestController {

    private final VehicleService vehicleService;
    private final UserService userService;

    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle,
                                 Principal userPrincipal) {
        User user = userService.getUserFromUserPrincipal(userPrincipal);
        return vehicleService.createVehicle(vehicle, user);
    }

    @GetMapping
    public List<Vehicle> getVehiclesOfOperator(Principal userPrincipal){
        User user = userService.getUserFromUserPrincipal(userPrincipal);
        return vehicleService.getVehiclesOfUser(user.getId());
    }

    @GetMapping("/{id}")
    public Vehicle getVehicleById(@PathVariable UUID id) {
        return vehicleService.getVehicleById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteVehicleById(@PathVariable UUID id) {
        vehicleService.deleteVehicleById(id);
    }
}
