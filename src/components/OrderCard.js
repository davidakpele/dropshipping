

const OrderCard = ({info, index}) => {
    return (
        <div key={index} className={`${info.color} orderCard`}>
            <div className="orderCard__name">
                <img src={info.iconOfOrder} alt={info.orderTrack} />
                <span>{info.orderTrack}</span>
            </div>
            <p className="orderCard__val">{info.orderValue}</p>
        </div>
    )
}

export default OrderCard;