import React from "react";

const topProducts = [
    [
        {
            imgUrl: "https://i.ibb.co/DDXsh69/dmitry-vechorko-y-Xh-J-e-QK0m-E-unsplash.jpg",
            name: "CHIFON & FLORAL DRESS",
            price: "21.5",
        },
        {
            imgUrl: "https://i.ibb.co/cDnQrFb/valerie-elash-Rfo-ISVd-KM4-U-unsplash.jpg",
            name: "CAMI STRAP DRESS",
            price: "23.5",
        },
        {
            imgUrl: "https://i.ibb.co/8M6wWCd/tamara-bellis-21fa847g-ZBs-unsplash.jpg",
            name: "CHIFON & FLORAL DRESS",
            price: "21.5",
        },
    ],
    [
        {
            imgUrl: "https://i.ibb.co/WWVtBMp/oleg-ivanov-sg-g-Rhb-YXhc-unsplash.jpg",
            name: "CAMI STRAP DRESS",
            price: "23.5",
        },
        {
            imgUrl: "https://i.ibb.co/17jgrXW/tamara-bellis-Rqp-HXWNHep8-unsplash.jpg",
            name: "FLARE STRAP DRESS",
            price: "19.6",
        },
        {
            imgUrl: "https://i.ibb.co/PzxPXPW/tamara-bellis-3t6rfs-Ca-Wi-Q-unsplash.jpg",
            name: "ABSTRACT DOOTED DRESS",
            price: "21.5",
        },
    ],
];

const Top = () => {
    return (
        <div className="mx-4">
            <div className="flex justify-start">
                <div className="my-3 py-8">
                    <h1 className="uppercase text-4xl tracking-widest">top</h1>
                    <p className="h-3 bg-yellow-400 mt-5"></p>
                </div>
            </div>
            <div className="bg-white p-6">
                <div
                    id="carouselTop"
                    className="carousel slide relative"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner relative w-full overflow-hidden">
                        {topProducts.map((products, index) => (
                            <div
                                key={index}
                                className={
                                    index === 0
                                        ? "carousel-item active relative float-left w-full"
                                        : "carousel-item relative float-left w-full"
                                }
                            >
                                {products.map((product) => (
                                    <div className="flex items-center text-left py-2">
                                        <div className="w-1/3">
                                            <img
                                                src={product.imgUrl}
                                                className="w-full lg:h-36 xl:h-40"
                                                alt="lady-shopping"
                                            />
                                        </div>
                                        <div className="mx-3 xl:mx-5">
                                            <h3 className="text-sm text-gray-700 lg:py-1 xl:py-3">
                                                <a href={product.href}>
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute inset-0"
                                                    />
                                                    {product.name}
                                                </a>
                                            </h3>
                                            <p className="text-xl font-medium text-gray-900">
                                                $ {product.price}
                                            </p>
                                            <button className="bg-black text-yellow-400 tracking-wider px-3 xl:px-8 py-3 mt-2 hover:bg-gray-900 cursor-pointer">
                                                VIEW DETAILS
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <button
                        className="carousel-control-prev w-6 absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                        type="button"
                        data-bs-target="#carouselTop"
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon inline-block bg-no-repeat bg-black py-10"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next w-6 absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                        type="button"
                        data-bs-target="#carouselTop"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon inline-block bg-no-repeat bg-black py-10"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Top;