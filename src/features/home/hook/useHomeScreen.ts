import { useNavigate } from "react-router-dom";
import { useProductUiStore } from "../../products/store/useProductUiStore";
import { useWishlistStore } from "../../products/store/useWishlistStore";
import { Product } from "../../products/types/product";

export function useHomeScreen() {
  const hand = useProductUiStore((state) => state.hand);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const navigate = useNavigate();

  const handleProductClick = (id: string | number) => {
    if (hand) hand(id);
    navigate(`/product/${id}`);
    window.scrollTo({ top: 20 });
  };

  const isProductFavorite = (productId: string | number) => {
    return wishlist.some((item) => item.id === productId);
  };

  const handleToggleWishlist = (event: React.MouseEvent, product: Product) => {
    event.stopPropagation();
    toggleWishlist(product);
  };

  return {
    handleProductClick,
    isProductFavorite,
    handleToggleWishlist,
  };
}