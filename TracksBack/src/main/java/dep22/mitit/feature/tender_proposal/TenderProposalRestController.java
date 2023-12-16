package dep22.mitit.feature.tender_proposal;

import dep22.mitit.feature.user.User;
import dep22.mitit.feature.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tender/proposals")
public class TenderProposalRestController {

    private final UserService userService;
    private final TenderProposalService tenderProposalService;

    @GetMapping
    @ResponseBody
    public List<TenderProposal> getTenderProposalsForOrder(@RequestParam UUID orderId) {
        return tenderProposalService.getTenderProposalsByOrderId(orderId);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public TenderProposal getTenderProposalById(@PathVariable UUID id) {
        return tenderProposalService.getTenderProposalById(id);
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public TenderProposal createTenderProposal(@RequestParam UUID orderId,
                                               @RequestBody TenderProposal tenderProposal,
                                               Principal userPrincipal) {
        User user = userService.getUserFromUserPrincipal(userPrincipal);
        return tenderProposalService.createTenderProposal(tenderProposal, orderId, user);
    }

    @DeleteMapping("/{id}")
    public void deleteTenderProposal(@PathVariable UUID id) {
        tenderProposalService.deleteTenderProposal(id);
    }
}
