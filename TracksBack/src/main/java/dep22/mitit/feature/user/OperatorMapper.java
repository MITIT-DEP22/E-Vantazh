package dep22.mitit.feature.user;

import dep22.mitit.feature.driver.Driver;
import dep22.mitit.feature.driver.DriverRepository;
import dep22.mitit.feature.user.dto.OperatorDto;
import dep22.mitit.feature.vehicle.Vehicle;
import dep22.mitit.feature.vehicle.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OperatorMapper {

    private final VehicleRepository vehicleRepository;
    private final DriverRepository driverRepository;

    public OperatorDto fromUserToOperator(User user) {
        List<Vehicle> vehicles = vehicleRepository.findByOperator_Id(user.getId());
        List<Driver> drivers = driverRepository.findByOperator_Id(user.getId());

        return new OperatorDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone(),
                user.getCompanyName(),
                user.getRating(),
                user.getCountOfOrders(),
                user.getImage(),
                vehicles,
                drivers
        );
    }

}
