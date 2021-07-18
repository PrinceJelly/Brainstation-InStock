export default function InventoryItemDetailContainer({data}) {
    return(
        <section className="inv-details">
            <div className="inv-details__container-left">
                <span>
                    <p className="inv-details__sub-header">ITEM DESCRIPTION:</p>
                    <p className="inv-details__text">{data.description}</p>
                </span>
                <span>
                    <p className="inv-details__sub-header">CATEGORY:</p>
                    <p className="inv-details__text">{data.category}</p>
                </span>
            </div>
            <div className="inv-details__container-right">
                <span>
                    <p className="inv-details__sub-header">STATUS:</p>
                    <p
                    className={`inv-details__text ${
                        data.quantity > 0 ? "in-stock" : "oof-stock"
                    }`}
                    >
                    {data.status.toUpperCase()}
                    </p>
                </span>
                <span>
                    <p className="inv-details__sub-header">QUANTITY:</p>
                    <p className="inv-details__text">{data.quantity}</p>
                </span>
                <span>
                    <p className="inv-details__sub-header">WAREHOUSE:</p>
                    <p className="inv-details__text">{data.warehouseName}</p>
                </span>
               
            </div>
        </section>
    );
};