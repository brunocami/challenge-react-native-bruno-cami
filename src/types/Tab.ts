import { Product } from "./Products";

export type AppTabParamList = {
  Feed: undefined;
  Productos: undefined;
}

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Checkout: { item: Product };
}