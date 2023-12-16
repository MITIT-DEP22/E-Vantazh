package dep22.mitit.feature.order;

import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.cargo.Cargo;
import dep22.mitit.feature.file.File;
import dep22.mitit.feature.image.Image;
import dep22.mitit.feature.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Builder
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
public class Order extends AbstractBaseEntity {
    @Column(name = "title")
    private String title;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name = "price")
    private Double price;
    @Column(name = "minimal_step")
    private Double minimalStep;

    @Column(name = "tender_start")
    private LocalDateTime tenderStart;
    @Column(name = "tender_stop")
    private LocalDateTime tenderStop;

    @Column(name = "status")
    private Status status;

    private UUID routeId;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "winner_id", referencedColumnName = "id")
    private User winner;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<Requirement> requirements = new ArrayList<>();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<Cargo> cargos = new ArrayList<>();

    @ManyToMany
    private List<Image> images = new ArrayList<>();

    @ManyToMany
    private List<File> files = new ArrayList<>();
}
