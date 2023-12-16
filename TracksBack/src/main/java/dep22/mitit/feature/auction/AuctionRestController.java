package dep22.mitit.feature.auction;

import dep22.mitit.feature.user.User;
import dep22.mitit.feature.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auctions")
@RequiredArgsConstructor
public class AuctionRestController {

    private final AuctionService auctionService;
    private final UserService userService;

    @GetMapping
    @ResponseBody
    public Auction getAuctionByOrderId(@RequestParam UUID orderId) {
        return auctionService.getAuctionByOrderId(orderId);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Auction getAuctionById(@PathVariable UUID id) {
        return auctionService.getById(id);
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public Auction createAuction(@RequestBody Auction auction,
                                 @RequestParam UUID orderId,
                                 Principal userPrincipal) {
        User user = userService.getUserFromUserPrincipal(userPrincipal);
        return auctionService.createAuction(auction, orderId, user);
    }

    @DeleteMapping("/{id}")
    public void deleteAuctionById(@PathVariable UUID id) {
        auctionService.deleteById(id);
    }
}
