export default function WarehouseDetailsSummary({data}) {
    return(
        <div className="wh-details__container">
                <span className="wh-details__separator">
                    <p className="wh-details__sub-header">WAREHOUSE ADDRESS:</p>
                    <address className="wh-details__text">{data.address}</address>
                    <address className="wh-details__text">{`${data.city}, ${data.country}`}</address>
                </span>
                <span className="wh-details__separator">
                    <p className="wh-details__sub-header">CONTACT NAME:</p>
                    <p className="wh-details__text">{data.contact.name}</p>
                    <p className="wh-details__text">{data.contact.position}</p>
                </span>
                <span className="wh-details__separator">
                    <p className="wh-details__sub-header">CONTACT INFORMATION:</p>
                    <address className="wh-details__text">{data.contact.phone}</address>
                    <address className="wh-details__text">{data.contact.email}</address>
                </span>
        </div>
    );
}