package dep22.mitit.feature.auction.bid;

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
@RequestMapping("/api/v1/bids")
public class BidRestController {

    private final BidService bidService;
    private final UserService userService;

    @PostMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public Bid createBid(@RequestParam("auctionId") UUID auctionId,
                         @RequestBody Bid bid,
                         Principal userPrincipal) {
        User user = userService.getUserFromUserPrincipal(userPrincipal);
        return bidService.createBid(bid, auctionId, user);
    }

    @GetMapping
    @ResponseBody
    public List<Bid> getBidsOfAuction(@RequestParam("auctionId") UUID auctionId) {
        return bidService.getBidsByAuctionId(auctionId);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Bid getBidById(@PathVariable UUID id) {
        return bidService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable UUID id) {
        bidService.deleteById(id);
    }
}
