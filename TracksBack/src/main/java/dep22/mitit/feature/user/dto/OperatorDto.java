package dep22.mitit.feature.user.dto;

import dep22.mitit.feature.driver.Driver;
import dep22.mitit.feature.image.Image;
import dep22.mitit.feature.vehicle.Vehicle;

import java.util.List;
import java.util.UUID;

public record OperatorDto(
        UUID id,
        String email,
        String firstName,
        String lastName,
        String phone,
        String companyName,
        double rating,
        int countOfOrders,
        Image image,
        List<Vehicle> vehicles,
        List<Driver> drivers
) {
}
