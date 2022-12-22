import { useSelector } from "react-redux"
import ConceptCard from "./ConceptCard"

function ConceptCardsList(){
    // const {concepts}=useSelector(state=>state.concept)
const concepts=[
    {
        "accepted": false,
        "_id": "639117564606f583b565bfe4",
        "categories": [
            "639d8f0987cdf6706e335db9",
            "639e49f8dfabd615c821584f"
        ],
        "shortDefinition": {
            "english": "Work related material rewards that refer to an employee’s physical or economic needs such as salary, bonus, gain sharing etc.",
            "arabic": "مكافآت مادية التي تتعلق بالعمل وتتطرق إلى الاحتياجات المادية والاقتصادية ",
            "hebrew": "תגמולים חומריים הקשורים בעבודה ומתייחסים לצרכים פיסיים וכלכליים "
        },
        "lastEdited": 1622406516588,
        "conceptName": {
            "hebrew": "תגמול מוחשי",
            "arabic": "مكافأة ملموسة",
            "english": "Tangible reward"
        },
        "lastEditedDisplayable": "Sun May 30 2021 23:28:36 GMT+0300",
        "longDefinition": {
            "arabic": "مكافأة مادية تقدم كمبادلة بين الموظف وصاحب العمل. يمكن أن تكون هناك مكافأة مباشرة مقابل العمل – الأجر، ساعات إضافية، مكافأة، تقاسم الأرباح أو مكافأة غير مباشرة التي تتعلق بالمزايا مثل دفع مقابل إجازة، مرض، تأمين صحي، هدية العيد وما إلى ذلك ",
            "english": "Tangible remuneration that is given in exchange between employee and employer. It may be a direct remuneration in return for work – salary overtime pay, bonus, division of profits or an indirect remuneration with benefits such as paying for a vacation, sick pay, health insurance, gifts for festivals, etc.",
            "hebrew": "תגמול חומרי הניתן כחליפין בין העובד למעסיק . יכול להיות תגמול ישיר בתמורה לעבודה – שכר, שעות נוספות, בונוס, חלוקת רווחים או תגמול עקיף הנוגע להטבות כמו תשלום חופשה, מחלה, ביטוח בריאות, מתנת חג וכד'"
        },
        "suggestedBy": "niran zakay",
        "readMore": "https://www.1338tryon.com/best-tangible-rewards-for-employee-incentives/",
        "firestore_id": "-Mayxfx8NKY2kW8ed65-"
    },
    {
        "accepted": false,
        "_id": "639117564606f583b565bff9",
        "categories": [
            "639d8f0987cdf6706e335db9",
            "639e49f8dfabd615c821584f"
        ],
        "shortDefinition": {
            "arabic": "مكافأة غير مادية التي تتطرق إلى الاحتياجات الشخصية، الاجتماعية والمهنية للموظف ",
            "english": "Non-monetary reinforcer rewards that refer to personal, social or professional needs, such as  recognition, promotion, training & development etc.",
            "hebrew": "תגמול לא חומרי המתייחס לצרכים אישיים, חברתיים ומקצועיים של העובד "
        },
        "lastEdited": 1622446295148,
        "conceptName": {
            "english": "Intangible reward",
            "arabic": "المكافأة غير الملموسة",
            "hebrew": "תגמול לא מוחשי"
        },
        "lastEditedDisplayable": "Mon May 31 2021 10:31:35 GMT+0300",
        "longDefinition": {
            "arabic": "مكافأة تلبي احتياجات الموظف غير اقتصادية مثل الاحتياجات الاجتماعية، المهنية والعاطفية. على شبيل المثال: التقدير، التعزيز، الإرشاد والتطوير، إلخ. ",
            "english": "The remuneration answers the employee’s non-financial needs such as social, professional and emotional needs. For example, respect, advancement, training and development, etc.",
            "hebrew": "תגמול העונה לצרכי העובד שאינם כלכליים כמו צרכים חברתים, מקצועיים ורגשיים. לדוגמא: הוקרה, קידום, הדרכה ופיתוח וכד'"
        },
        "suggestedBy": "Amani",
        "readMore": "http://www.hrcareertransition.com/wp-content/uploads/2010/04/5-Low-Cost-High-Return-Rewards.pdf",
        "firestore_id": "-Mb0KRmIyYdkOXljPH7G"
    },
    {
        "accepted": false,
        "_id": "639117564606f583b565bfe4",
        "categories": [
            "639d8f0987cdf6706e335db9",
            "639e49f8dfabd615c821584f"
        ],
        "shortDefinition": {
            "english": "Work related material rewards that refer to an employee’s physical or economic needs such as salary, bonus, gain sharing etc.",
            "arabic": "مكافآت مادية التي تتعلق بالعمل وتتطرق إلى الاحتياجات المادية والاقتصادية ",
            "hebrew": "תגמולים חומריים הקשורים בעבודה ומתייחסים לצרכים פיסיים וכלכליים "
        },
        "lastEdited": 1622406516588,
        "conceptName": {
            "hebrew": "תגמול מוחשי",
            "arabic": "مكافأة ملموسة",
            "english": "Tangible reward"
        },
        "lastEditedDisplayable": "Sun May 30 2021 23:28:36 GMT+0300",
        "longDefinition": {
            "arabic": "مكافأة مادية تقدم كمبادلة بين الموظف وصاحب العمل. يمكن أن تكون هناك مكافأة مباشرة مقابل العمل – الأجر، ساعات إضافية، مكافأة، تقاسم الأرباح أو مكافأة غير مباشرة التي تتعلق بالمزايا مثل دفع مقابل إجازة، مرض، تأمين صحي، هدية العيد وما إلى ذلك ",
            "english": "Tangible remuneration that is given in exchange between employee and employer. It may be a direct remuneration in return for work – salary overtime pay, bonus, division of profits or an indirect remuneration with benefits such as paying for a vacation, sick pay, health insurance, gifts for festivals, etc.",
            "hebrew": "תגמול חומרי הניתן כחליפין בין העובד למעסיק . יכול להיות תגמול ישיר בתמורה לעבודה – שכר, שעות נוספות, בונוס, חלוקת רווחים או תגמול עקיף הנוגע להטבות כמו תשלום חופשה, מחלה, ביטוח בריאות, מתנת חג וכד'"
        },
        "suggestedBy": "niran zakay",
        "readMore": "https://www.1338tryon.com/best-tangible-rewards-for-employee-incentives/",
        "firestore_id": "-Mayxfx8NKY2kW8ed65-"
    },
    {
        "accepted": false,
        "_id": "639117564606f583b565bff9",
        "categories": [
            "639d8f0987cdf6706e335db9",
            "639e49f8dfabd615c821584f"
        ],
        "shortDefinition": {
            "arabic": "مكافأة غير مادية التي تتطرق إلى الاحتياجات الشخصية، الاجتماعية والمهنية للموظف ",
            "english": "Non-monetary reinforcer rewards that refer to personal, social or professional needs, such as  recognition, promotion, training & development etc.",
            "hebrew": "תגמול לא חומרי המתייחס לצרכים אישיים, חברתיים ומקצועיים של העובד "
        },
        "lastEdited": 1622446295148,
        "conceptName": {
            "english": "Intangible reward",
            "arabic": "المكافأة غير الملموسة",
            "hebrew": "תגמול לא מוחשי"
        },
        "lastEditedDisplayable": "Mon May 31 2021 10:31:35 GMT+0300",
        "longDefinition": {
            "arabic": "مكافأة تلبي احتياجات الموظف غير اقتصادية مثل الاحتياجات الاجتماعية، المهنية والعاطفية. على شبيل المثال: التقدير، التعزيز، الإرشاد والتطوير، إلخ. ",
            "english": "The remuneration answers the employee’s non-financial needs such as social, professional and emotional needs. For example, respect, advancement, training and development, etc.",
            "hebrew": "תגמול העונה לצרכי העובד שאינם כלכליים כמו צרכים חברתים, מקצועיים ורגשיים. לדוגמא: הוקרה, קידום, הדרכה ופיתוח וכד'"
        },
        "suggestedBy": "Amani",
        "readMore": "http://www.hrcareertransition.com/wp-content/uploads/2010/04/5-Low-Cost-High-Return-Rewards.pdf",
        "firestore_id": "-Mb0KRmIyYdkOXljPH7G"
    },
]
    return(<>
    <div className="row">
    {concepts.map((concept)=>{
        return(
            <div className=' col-sm-6 col-md-4 col-lg-3 '>
            <ConceptCard concept={concept}/>                
            </div>
        )

    })}
    </div>
    </>)
}
export default ConceptCardsList