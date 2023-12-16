package dep22.mitit.feature.cargo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CargoRepository extends JpaRepository<Cargo, UUID> {
    List<Cargo> findByOrder_Id(UUID id);
}
