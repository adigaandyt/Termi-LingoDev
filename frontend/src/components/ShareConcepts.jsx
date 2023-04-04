import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookIcon,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    WorkplaceShareButton,
    LinkedinIcon,
    TwitterIcon
  } from "react-share";
function ShareConcepts(){
    const {concept}=useSelector(state=>state.concept)
    const URL=`http://localhost:3000/search/${concept.conceptName.english}/${concept.categories[0]}`
    return(<>
    <div className="text-center">
        <WhatsappShareButton className="mx-1" url={URL}  openShareDialogOnClick>
        <WhatsappIcon  size={32} round={true}/>
        </WhatsappShareButton>

        <FacebookShareButton className="mx-1"  url={URL}>
        <FacebookIcon size={32} round={true}/>
        </FacebookShareButton>

        <LinkedinShareButton className="mx-1" url={URL}>
            <LinkedinIcon size={32} round={true}/>
        </LinkedinShareButton>

        <TwitterShareButton className="mx-1" url={URL}>
            <TwitterIcon size={32} round={true}/>
        </TwitterShareButton>
    </div>
    </>)
}
export default ShareConcepts