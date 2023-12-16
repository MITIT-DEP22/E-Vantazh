package dep22.mitit.feature.tender_proposal;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TenderProposalRepository extends JpaRepository<TenderProposal, UUID> {
    List<TenderProposal> findByOrder_Id(UUID id);
}
