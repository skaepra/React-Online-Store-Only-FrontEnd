export interface BannerAd {
  id: string;
  imageUrl: string;
  linkUrl: string;
}

export const mainBanners: BannerAd = {
  id: "main-1",
  imageUrl: "offer.png",
  linkUrl: "/shop",
};

export const homeBanners: BannerAd[] = [
  {
    id: "banner-1",
    imageUrl: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1000&auto=format&fit=crop",
    linkUrl: "/shop",
  },
  {
    id: "banner-2",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
    linkUrl: "/shop",
  },
  {
    id: "banner-3",
    imageUrl: "products/شوفو وش شترولي❤️.jfif",
    linkUrl: "/shop",
  },
  {
    id: "banner-4",
    imageUrl: "products/239887117644111066.jfif",
    linkUrl: "/shop",
  },
  {
    id: "banner-4",
    imageUrl: "products/111.jfif",
    linkUrl: "/shop",
  },
];