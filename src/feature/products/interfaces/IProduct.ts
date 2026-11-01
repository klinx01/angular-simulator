export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  discountPercentage: number;
  brand?: string;
  sku: string;
  weight: number;
  dimensions: IDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  availabilityStatus: string;
  tags: string[];
  reviews: IProductReview[];
}

interface IDimensions {
  width: number;
  height: number;
  depth: number;
}

interface IProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}
