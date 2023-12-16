package dep22.mitit.feature.cargo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.order.Order;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@Table(name = "cargos")
@NoArgsConstructor
@AllArgsConstructor
public class Cargo extends AbstractBaseEntity {
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "weight")
    private Double weight;
    @Column(name = "volume")
    private Double volume;
    @Column(name = "passengers_capacity")
    private Integer passengersCapacity;
    @Column(name = "dimension_height")
    private Integer dimensionHeight;
    @Column(name = "dimension_width")
    private Integer dimensionWidth;
    @Column(name = "dimension_length")
    private Integer dimensionLength;
    @Column(name = "type")
    private Type type;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;
}
