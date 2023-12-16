package dep22.mitit.feature.vehicle;

import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "vehicles")
@NoArgsConstructor
public class Vehicle extends AbstractBaseEntity {

    @ManyToOne
    private User operator;

    private String digits;
    private String type;
    private String modelYear;
    private String carryingCapacity;
    private String fuelType;
    private String gabarites;
    private String cargoDimensions;
    private Double passengersCapacity;
    private String photoUrl;
}
