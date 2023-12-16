package dep22.mitit.feature.tender_comment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TenderCommentRepository extends JpaRepository<TenderComment, UUID> {
    List<TenderComment> findByOrder_Id(UUID id);
}
