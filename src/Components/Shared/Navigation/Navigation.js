import React, { useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import useFirebase from "../../../hooks/useFirebase";
import { useEffect } from "react";

const navigation = [
    { name: "Home", to: "/home", current: true },
    { name: "Shop Catalog", to: "/shopCatalog", current: false },
    { name: "Blogs", to: "/blogs", current: false },
    { name: "Deals", to: "/deals", current: false },
    { name: "About Us", to: "/about", current: false },
    { name: "Contact", to: "/contact", current: false },
];
const userNavigation = [
    { name: "Your Profile", to: "/profile" },
    { name: "Settings", to: "/settings" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Navigation = () => {
    const [admin, setAdmin] = useState(false);
    const { user, loading } = useFirebase();

    useEffect(() => {
        setAdmin(false);
        fetch(`https://ancient-dawn-22893.herokuapp.com/user/${user?.email}`)
            .then((res) => res.json())
            .then((user) => {
                if (user?.role === "admin") {
                    setAdmin(true);
                }
            });
    }, [user?.email]);

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-yellow-400">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    {/* main navigation */}
                                    <div className="flex items-center">
                                        <div className="hidden lg:block">
                                            <div className="flex items-center space-x-4">
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.to}
                                                    >
                                                        <button
                                                            className={classNames(
                                                                item.current
                                                                    ? "bg-gray-900 text-white"
                                                                    : "text-black hover:bg-gray-900 hover:text-white",
                                                                "px-3 py-2 rounded-md text-sm font-medium"
                                                            )}
                                                            aria-current={
                                                                item.current
                                                                    ? "page"
                                                                    : undefined
                                                            }
                                                        >
                                                            {item.name}
                                                        </button>
                                                    </Link>
                                                ))}
                                                {!loading && user.email && (
                                                    <Link to="/orders">
                                                        <button className="text-black hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                                            My Orders
                                                        </button>
                                                    </Link>
                                                )}
                                                {!loading &&
                                                    user.email &&
                                                    admin && (
                                                        <>
                                                            <Link to="/manageOrders">
                                                                <button className="text-black hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                                                    Manage
                                                                    Orders
                                                                </button>
                                                            </Link>
                                                            <Link to="/manageProducts">
                                                                <button className="text-black hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                                                    Manage
                                                                    Products
                                                                </button>
                                                            </Link>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* userNavigation */}
                                    <div className="hidden lg:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button
                                                type="button"
                                                className="bg-gray-900 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                            >
                                                <span className="sr-only">
                                                    View notifications
                                                </span>
                                                <BellIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>

                                            {/* Profile dropdown */}
                                            {(user?.email || user?.uid) && (
                                                <Menu
                                                    as="div"
                                                    className="ml-3 relative"
                                                >
                                                    <div>
                                                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                            <span className="sr-only">
                                                                Open user menu
                                                            </span>
                                                            <img
                                                                className="h-8 w-8 rounded-full"
                                                                src={
                                                                    user?.photoURL
                                                                }
                                                                alt="user-img"
                                                            />
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="origin-top-right absolute z-40 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            {userNavigation.map(
                                                                (item) => (
                                                                    <Menu.Item
                                                                        key={
                                                                            item.name
                                                                        }
                                                                    >
                                                                        {({
                                                                            active,
                                                                        }) => (
                                                                            <Link
                                                                                to={
                                                                                    item.to
                                                                                }
                                                                            >
                                                                                <button
                                                                                    className={classNames(
                                                                                        active
                                                                                            ? "bg-gray-700 text-white"
                                                                                            : "text-gray-700",
                                                                                        "block w-full px-4 py-2 text-sm"
                                                                                    )}
                                                                                >
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </button>
                                                                            </Link>
                                                                        )}
                                                                    </Menu.Item>
                                                                )
                                                            )}
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            )}
                                        </div>
                                    </div>

                                    {/* hamburger */}
                                    <div className="-mr-2 flex lg:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">
                                                Open main menu
                                            </span>
                                            {open ? (
                                                <XIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <MenuIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="lg:hidden">
                                {/* main navigation */}
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    {navigation.map((item) => (
                                        <Link key={item.name} to={item.to}>
                                            <Disclosure.Button
                                                className={classNames(
                                                    item.current
                                                        ? "bg-gray-900 text-white"
                                                        : "text-black hover:bg-gray-900 hover:text-white",
                                                    "block w-full px-3 py-2 rounded-md text-base font-medium"
                                                )}
                                                aria-current={
                                                    item.current
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        </Link>
                                    ))}
                                    {user?.email && (
                                        <Link to="/orders">
                                            <Disclosure.Button
                                                className="text-black hover:bg-gray-900 hover:text-white
                                                    block w-full px-3 py-2 rounded-md text-base font-medium"
                                            >
                                                My Orders
                                            </Disclosure.Button>
                                        </Link>
                                    )}
                                    {user?.email && admin && (
                                        <>
                                            <Link to="/manageOrders">
                                                <Disclosure.Button
                                                    className="text-black hover:bg-gray-900 hover:text-white
                                                    block w-full px-3 py-2 rounded-md text-base font-medium"
                                                >
                                                    Manage Orders
                                                </Disclosure.Button>
                                            </Link>
                                            <Link to="/manageProducts">
                                                <Disclosure.Button
                                                    className="text-black hover:bg-gray-900 hover:text-white
                                                    block w-full px-3 py-2 rounded-md text-base font-medium"
                                                >
                                                    Manage Products
                                                </Disclosure.Button>
                                            </Link>
                                        </>
                                    )}
                                </div>

                                {/* user Navigation */}
                                {user?.email && (
                                    <div className="pt-4 pb-3 border-t border-gray-700">
                                        <div className="flex items-center px-5">
                                            <div className="flex-shrink-0 border-2 rounded-full">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={user?.photoURL}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3 border-2 rounded-md p-2 bg-gray-900 text-white">
                                                <div className="text-base font-medium leading-none">
                                                    {user?.displayName}
                                                </div>
                                                <div className="text-sm font-medium leading-none">
                                                    {user?.email}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="ml-auto bg-gray-800 flex-shrink-0 p-1 border-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                            >
                                                <span className="sr-only">
                                                    View notifications
                                                </span>
                                                <BellIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                        <div className="mt-3 px-2 space-y-1">
                                            {userNavigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.to}
                                                >
                                                    <Disclosure.Button className="block w-full px-3 py-2 rounded-md text-base font-medium text-black hover:text-white hover:bg-gray-900">
                                                        {item.name}
                                                    </Disclosure.Button>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    );
};

export default Navigation;
