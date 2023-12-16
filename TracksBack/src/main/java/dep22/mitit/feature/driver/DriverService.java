package dep22.mitit.feature.driver;

import dep22.mitit.exception.EntityWasNotFoundException;
import dep22.mitit.feature.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository driverRepository;

    public List<Driver> getDriversByOperatorId(UUID operatorId) {
        return driverRepository.findByOperator_Id(operatorId);
    }

    public Driver getDriverById(UUID id) {
        return driverRepository.findById(id)
                .orElseThrow(() -> new EntityWasNotFoundException(
                        String.format("Driver with id %s was not found", id)
                ));
    }

    public void deleteDriverById(UUID id) {
        driverRepository.deleteById(id);
    }

    public Driver createDriver(Driver driver, User user) {
        driver.setOperator(user);

        return driverRepository.save(driver);
    }
}
