package dep22.mitit.feature.tender_comment;

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
@RequestMapping("/api/v1/tender/comments")
public class TenderCommentRestController {

    private final UserService userService;
    private final TenderCommentService tenderCommentService;

    @ResponseBody
    @GetMapping("/{id}")
    public TenderComment getTenderCommentById(@PathVariable UUID id) {
        return tenderCommentService.getTenderCommentById(id);
    }

    @ResponseBody
    @GetMapping
    public List<TenderComment> getTenderCommentsForOrder(@RequestParam UUID orderId) {
        return tenderCommentService.getTenderCommentsByOrderId(orderId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public TenderComment createTenderComment(@RequestParam UUID orderId,
                                             @RequestBody TenderComment tenderComment,
                                             Principal userPrincipal) {
        User user = userService.getUserFromUserPrincipal(userPrincipal);
        return tenderCommentService.createTenderComment(tenderComment, orderId, user);
    }

    @DeleteMapping("/{id}")
    public void deleteTenderCommentById(@PathVariable UUID id) {
        tenderCommentService.deleteTenderCommentById(id);
    }

    @PutMapping("/{id}")
    public TenderComment updateTenderCommentById(@PathVariable UUID id,
                                                 @RequestBody TenderComment tenderComment) {
        return tenderCommentService.updateTenderCommentById(id, tenderComment);
    }
}
