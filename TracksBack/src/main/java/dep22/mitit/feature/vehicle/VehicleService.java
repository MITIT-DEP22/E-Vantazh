package dep22.mitit.feature.vehicle;

import dep22.mitit.exception.EntityWasNotFoundException;
import dep22.mitit.feature.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    public Vehicle createVehicle(Vehicle vehicle, User user) {
        vehicle.setOperator(user);
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getVehiclesOfUser(UUID userId) {
        return vehicleRepository.findByOperator_Id(userId);
    }

    public Vehicle getVehicleById(UUID id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new EntityWasNotFoundException(
                        String.format("Vehicle with id %s was not found"))
                );
    }

    public void deleteVehicleById(UUID id) {
        vehicleRepository.deleteById(id);
    }
}
