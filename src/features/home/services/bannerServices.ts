import { BannerAd, homeBanners, mainBanners } from "../../../data/mockAds";
// العلان الرءيسي
export async function getMainBanner(): Promise<BannerAd> {
  // return axios.get('/api/main-banner').then(res => res.data);
  
  return Promise.resolve(mainBanners);
}
// العلانات
export async function getHomeBanners(): Promise<BannerAd[]> {
  // return axios.get('/api/home-banners').then(res.data);

  return Promise.resolve(homeBanners);
}