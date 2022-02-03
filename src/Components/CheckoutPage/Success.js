import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartTable from "../CartTable/CartTable";

const Success = () => {
    const [order, setOrder] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/orders/${id}`)
            .then((res) => res.json())
            .then((data) => setOrder(data));
    }, [id]);
    // console.log(order);

    const handleConfirm = () => {
        const data = { tran_id: order.tran_id, val_id: order.val_id };
        // console.log(data);
        fetch("http://localhost:5000/validate", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.modifiedCount) {
                    alert("Order Placed Successfully!");
                    window.location.replace("http://localhost:3000");
                    localStorage.clear();
                    sessionStorage.clear();
                } else {
                    alert("Confirm Your Order First!");
                }
            });
    };

    return (
        <div>
            <h1 className="uppercase m-8 text-3xl tracking-widest">
                Order Summery
            </h1>
            <p className="uppercase text-xl py-2">
                Payment Received : ${order?.total_amount}
            </p>
            <div className="mx-5 md:mx-8">
                <div>
                    {order.ordered_products && (
                        <CartTable cart={order.ordered_products}></CartTable>
                    )}
                </div>
            </div>
            <button
                onClick={handleConfirm}
                type="submit"
                className="uppercase bg-black text-yellow-400 tracking-wider px-8 py-3 my-4 hover:bg-gray-900 cursor-pointer"
            >
                Confirm Order
            </button>
        </div>
    );
};

export default Success;
