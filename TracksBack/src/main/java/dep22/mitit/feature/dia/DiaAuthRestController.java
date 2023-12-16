package dep22.mitit.feature.dia;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/dia")
public class DiaAuthRestController {

    private final DiaAuthService diaAuthService;
    private final String returnLink = "https://team2-git.mil.gov.ua/";
    private final long TIMEOUT_MILLIS = 500;

//    @GetMapping
//    public String authorize() {
//        try {
//            String session_token = service.getCreateSessionAndGetToken();
//            // String branch_id = service.postCreateBranchAndGetId(session_token);
//            String branch_id = "4caf73a1a770b0ca18a9d1aa454d627954c6477097ce95aca4893211bf5bbd7c5bb7eac945670aed9af612245cbd39bc82c2ad725433b3f0794a535ccb7b3c65";
//            String offer_id = service.postCreateOfferAndGetId(session_token, branch_id, this.returnLink);
//            String deepLink = service.postCreateOfferRequestAndGetDeeplink(branch_id, offer_id, this.returnLink, session_token);
//            model.addAttribute("deeplink", deepLink);
//            return "diaTest";
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "error"; // TODO Redirect where?
//        }
//    }
}
