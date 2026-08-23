export interface CityCoordinate {
  name: string;
  lat: number;
  lng: number;
  popular?: boolean;
}

export interface WeatherCondition {
  label: string;
  icon: 'sun' | 'moon' | 'cloud-sun' | 'cloud-moon' | 'cloud' | 'rain' | 'snow' | 'thunder' | 'fog' | 'wind';
}

/**
 * WMO Weather interpretation codes (WW)
 * https://open-meteo.com/en/docs
 */
export function getWeatherCondition(code: number, isDay: boolean = true): WeatherCondition {
  switch (code) {
    case 0:
      return {
        label: 'Açık',
        icon: isDay ? 'sun' : 'moon',
      };
    case 1:
      return {
        label: 'Çoğunlukla Açık',
        icon: isDay ? 'cloud-sun' : 'cloud-moon',
      };
    case 2:
      return {
        label: 'Parçalı Bulutlu',
        icon: isDay ? 'cloud-sun' : 'cloud-moon',
      };
    case 3:
      return {
        label: 'Kapalı / Bulutlu',
        icon: 'cloud',
      };
    case 45:
    case 48:
      return {
        label: 'Sisli',
        icon: 'fog',
      };
    case 51:
    case 53:
    case 55:
      return {
        label: 'Hafif Çisenti',
        icon: 'rain',
      };
    case 56:
    case 57:
      return {
        label: 'Dondurucu Çisenti',
        icon: 'snow',
      };
    case 61:
      return {
        label: 'Hafif Yağmurlu',
        icon: 'rain',
      };
    case 63:
      return {
        label: 'Yağmurlu',
        icon: 'rain',
      };
    case 65:
      return {
        label: 'Kuvvetli Yağmurlu',
        icon: 'rain',
      };
    case 66:
    case 67:
      return {
        label: 'Dondurucu Yağmur',
        icon: 'snow',
      };
    case 71:
      return {
        label: 'Hafif Kar Yağışlı',
        icon: 'snow',
      };
    case 73:
      return {
        label: 'Kar Yağışlı',
        icon: 'snow',
      };
    case 75:
      return {
        label: 'Yoğun Kar Yağışlı',
        icon: 'snow',
      };
    case 77:
      return {
        label: 'Kar Taneleri',
        icon: 'snow',
      };
    case 80:
    case 81:
    case 82:
      return {
        label: 'Sağanak Yağış',
        icon: 'rain',
      };
    case 85:
    case 86:
      return {
        label: 'Kar Sağanağı',
        icon: 'snow',
      };
    case 95:
      return {
        label: 'Gök Gürültülü Fırtına',
        icon: 'thunder',
      };
    case 96:
    case 99:
      return {
        label: 'Dolu ve Gök Gürültülü Fırtına',
        icon: 'thunder',
      };
    default:
      return {
        label: 'Hafif Bulutlu',
        icon: isDay ? 'cloud-sun' : 'cloud-moon',
      };
  }
}

/**
 * 81 Türkiye İli Koordinat Listesi
 */
export const TURKEY_CITIES: CityCoordinate[] = [
  { name: 'İstanbul', lat: 41.0082, lng: 28.9784, popular: true },
  { name: 'Ankara', lat: 39.9334, lng: 32.8597, popular: true },
  { name: 'İzmir', lat: 38.4192, lng: 27.1287, popular: true },
  { name: 'Bursa', lat: 40.1885, lng: 29.0610, popular: true },
  { name: 'Antalya', lat: 36.8969, lng: 30.7133, popular: true },
  { name: 'Adana', lat: 37.0000, lng: 35.3213, popular: true },
  { name: 'Konya', lat: 37.8667, lng: 32.4833, popular: true },
  { name: 'Gaziantep', lat: 37.0662, lng: 37.3833, popular: true },
  { name: 'Şanlıurfa', lat: 37.1591, lng: 38.7969, popular: true },
  { name: 'Kocaeli', lat: 40.8533, lng: 29.8815, popular: true },
  { name: 'Mersin', lat: 36.8000, lng: 34.6333, popular: true },
  { name: 'Diyarbakır', lat: 37.9144, lng: 40.2306, popular: true },
  { name: 'Hatay', lat: 36.2000, lng: 36.1667 },
  { name: 'Manisa', lat: 38.6191, lng: 27.4289 },
  { name: 'Kayseri', lat: 38.7312, lng: 35.4787 },
  { name: 'Samsun', lat: 41.2928, lng: 36.3313 },
  { name: 'Balıkesir', lat: 39.6484, lng: 27.8826 },
  { name: 'Kahramanmaraş', lat: 37.5858, lng: 36.9371 },
  { name: 'Van', lat: 38.4891, lng: 43.4089 },
  { name: 'Aydın', lat: 37.8560, lng: 27.8416 },
  { name: 'Denizli', lat: 37.7765, lng: 29.0864 },
  { name: 'Sakarya', lat: 40.7569, lng: 30.3783 },
  { name: 'Tekirdağ', lat: 40.9833, lng: 27.5167 },
  { name: 'Muğla', lat: 37.2153, lng: 28.3636 },
  { name: 'Eskişehir', lat: 39.7767, lng: 30.5206 },
  { name: 'Mardin', lat: 37.3212, lng: 40.7245 },
  { name: 'Malatya', lat: 38.3552, lng: 38.3095 },
  { name: 'Trabzon', lat: 41.0027, lng: 39.7168 },
  { name: 'Erzurum', lat: 39.9000, lng: 41.2700 },
  { name: 'Ordu', lat: 40.9839, lng: 37.8764 },
  { name: 'Afyonkarahisar', lat: 38.7507, lng: 30.5567 },
  { name: 'Sivas', lat: 39.7477, lng: 37.0179 },
  { name: 'Adıyaman', lat: 37.7648, lng: 38.2786 },
  { name: 'Batman', lat: 37.8812, lng: 41.1294 },
  { name: 'Tokat', lat: 40.3167, lng: 36.5500 },
  { name: 'Zonguldak', lat: 41.4564, lng: 31.7987 },
  { name: 'Elazığ', lat: 38.6810, lng: 39.2264 },
  { name: 'Kütahya', lat: 39.4167, lng: 29.9833 },
  { name: 'Çanakkale', lat: 40.1553, lng: 26.4142 },
  { name: 'Osmaniye', lat: 37.0742, lng: 36.2478 },
  { name: 'Çorum', lat: 40.5506, lng: 34.9556 },
  { name: 'Giresun', lat: 40.9128, lng: 38.3895 },
  { name: 'Isparta', lat: 37.7648, lng: 30.5566 },
  { name: 'Aksaray', lat: 38.3687, lng: 34.0370 },
  { name: 'Yozgat', lat: 39.8181, lng: 34.8147 },
  { name: 'Edirne', lat: 41.6768, lng: 26.5603 },
  { name: 'Düzce', lat: 40.8438, lng: 31.1565 },
  { name: 'Muş', lat: 38.7432, lng: 41.5064 },
  { name: 'Kastamonu', lat: 41.3887, lng: 33.7827 },
  { name: 'Uşak', lat: 38.6823, lng: 29.4082 },
  { name: 'Kırklareli', lat: 41.7333, lng: 27.2167 },
  { name: 'Niğde', lat: 37.9667, lng: 34.6833 },
  { name: 'Ağrı', lat: 39.7191, lng: 43.0503 },
  { name: 'Rize', lat: 41.0201, lng: 40.5234 },
  { name: 'Amasya', lat: 40.6533, lng: 35.8331 },
  { name: 'Siirt', lat: 37.9333, lng: 41.9500 },
  { name: 'Bolu', lat: 40.7350, lng: 31.6061 },
  { name: 'Nevşehir', lat: 38.6244, lng: 34.7142 },
  { name: 'Yalova', lat: 40.6500, lng: 29.2667 },
  { name: 'Bingöl', lat: 38.8853, lng: 40.4983 },
  { name: 'Kırıkkale', lat: 39.8468, lng: 33.5153 },
  { name: 'Hakkari', lat: 37.5833, lng: 43.7333 },
  { name: 'Kars', lat: 40.6167, lng: 43.1000 },
  { name: 'Şırnak', lat: 37.5164, lng: 42.4594 },
  { name: 'Karaman', lat: 37.1759, lng: 33.2287 },
  { name: 'Karabük', lat: 41.2061, lng: 32.6204 },
  { name: 'Burdur', lat: 37.7206, lng: 30.2908 },
  { name: 'Sinop', lat: 42.0231, lng: 35.1531 },
  { name: 'Çankırı', lat: 40.6013, lng: 33.6134 },
  { name: 'Bartın', lat: 41.6344, lng: 32.3375 },
  { name: 'Bitlis', lat: 38.4000, lng: 42.1167 },
  { name: 'Kırşehir', lat: 39.1425, lng: 34.1709 },
  { name: 'Gümüşhane', lat: 40.4600, lng: 39.4700 },
  { name: 'Artvin', lat: 41.1828, lng: 41.8183 },
  { name: 'Bilecik', lat: 40.1451, lng: 29.9799 },
  { name: 'Iğdır', lat: 39.9196, lng: 44.0450 },
  { name: 'Erzincan', lat: 39.7500, lng: 39.5000 },
  { name: 'Kilis', lat: 36.7184, lng: 37.1212 },
  { name: 'Bayburt', lat: 40.2552, lng: 40.2249 },
  { name: 'Tunceli', lat: 39.1079, lng: 39.5401 },
  { name: 'Ardahan', lat: 41.1105, lng: 42.7022 },
];
