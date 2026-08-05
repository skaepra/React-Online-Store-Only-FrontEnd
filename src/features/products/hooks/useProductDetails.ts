import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Allproducts, {
  productsMap as allProductsMap,
} from "../../../data/Allproducts";
import homeProducts, {
  productsMap as homeProductsMap,
} from "../../../data/products";
import { useCartStore } from "../../cart/store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { Product } from "../types/product";

const combinedAllProducts = [...Allproducts, ...homeProducts];

export function useProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const productId = Number(id);
  const product: Product | undefined = id
    ? allProductsMap[productId] || homeProductsMap[productId]
    : undefined;

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "details" | "reviews"
  >("description");
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const wishlist = useWishlistStore((state) => state.wishlist) || [];
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const isWishlisted = product
    ? wishlist.some((item: Product) => item.id === product.id)
    : false;

  useEffect(() => {
    if (product) {
      setSelectedImage(product.Images?.[0] || "");
      setSelectedColor(product.Colors?.[0] || "");
      setSelectedSize(product.Sizes?.[0] || "");
      setQuantity(1);
    }
  }, [id, product]);

  const handleAddToCart = () => {
    if (addToCart && product) {
      addToCart({ ...product, quantity, selectedColor, selectedSize });
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleToggleWishlist = () => {
    if (toggleWishlist && product) {
      toggleWishlist(product);
    }
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const relatedProducts = product
    ? combinedAllProducts.filter(
        (p) => p.Category === product.Category && p.id !== product.id
      )
    : [];

  return {
    product,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    incrementQuantity,
    decrementQuantity,
    activeTab,
    setActiveTab,
    addedToast,
    isWishlisted,
    handleAddToCart,
    handleToggleWishlist,
    relatedProducts,
    navigate,
  };
}