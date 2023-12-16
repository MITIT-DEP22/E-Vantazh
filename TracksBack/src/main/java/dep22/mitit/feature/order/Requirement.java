package dep22.mitit.feature.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "order_requirements")
public class Requirement {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @Column(name = "requirement", nullable = false, columnDefinition = "TEXT")
    private String requirement;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    @JsonIgnore
    private Order order;
}
