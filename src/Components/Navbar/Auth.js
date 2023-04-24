import { Menu } from '@headlessui/react'
import { Icon } from "../../Icons";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../stores/userSlice';

function Auth() {

    const user = useSelector(selectUser)

    const Logout = (e) => {
        auth.signOut();
    }

    return (
        <Menu as="nav" className={"relative"}>
            {({ open }) => (
                <>
                    <Menu.Button className={`flex items-center h-8 rounded-3xl pr-2 ${open ? 'bg-active' : 'bg-black'} hover:bg-active`}>
                        <img src={user.photoURL} className={"w-8 h-8 rounded-full p-0.5 mr-2"} />
                        <span className="text-sm font-semibold mr-2">{user.username}</span>
                        <span className={open ? 'rotate-180' : ''}>
                            <Icon size={16} name="downDir" />
                        </span>
                    </Menu.Button>
                    <Menu.Items className={"absolute p-1 top-full right-0 w-48 bg-active rounded translate-y-2"}>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={`h-10 flex justify-between items-center px-2 text-sm rounded ${active ? 'bg-white bg-opacity-10' : ''}`}
                                    href="#"
                                >
                                    Account
                                    <Icon size={16} name="external" />
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={`h-10 flex items-center px-2 text-sm rounded ${active ? 'bg-white bg-opacity-10' : ''}`}
                                    href="#"
                                >
                                    Profile
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    onClick={Logout}
                                    className={`h-10 flex items-center px-2 text-sm rounded ${active ? 'bg-white bg-opacity-10' : ''}`}
                                    to="/"
                                >
                                    Log out
                                </Link>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </>
            )}
        </Menu>
    )
}

export default Auth