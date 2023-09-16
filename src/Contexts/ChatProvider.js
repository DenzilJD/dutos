import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const productContext = createContext();

export const ProductProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selChat, setSelChat] = useState();
    const [chats, setChats] = useState([]);
    const [notif, setNotif] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if (!user)
            navigate('/');
    }, [navigate]);

    return <ProductContext.Provider value={
        {
            user, setUser,
            selChat, setSelChat,
            chats, setChats,
            notif, setNotif,
            col1, col2, col3, col4
        }
    }>
        {children}
    </ProductContext.Provider>;
}

export const ProductState = () => {
    return useContext(ProductContext);
}