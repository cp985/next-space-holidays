import  {useCart,CartContext} from "@/context/CartContext"
import CartContextProvider from "@/context/CartContext"


type Props = {
    children : React.ReactNode;
}

export default function ShopLayout({children}: Props) {

    return(
<>
<CartContextProvider>
{children}
</CartContextProvider>
</>

    )
}