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
function ShareConcepts({concept}){
    // const {concept}=useSelector(state=>state.concept)
    const URL=`dir.y2022.kinneret.cc:7090/search/${encodeURIComponent(concept.conceptName.english)}/${encodeURIComponent(concept.categories[0])}`
    return(<>
    <div className="text-center m-2">
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