export enum RoutesName {
  LIST_OF_ITEMS = 'ListOfItems',
  ITEM_DETAILS = 'ItemDetails',
}

export type RootStackParamList = {
  [RoutesName.LIST_OF_ITEMS]: undefined;
  [RoutesName.ITEM_DETAILS]: {movieId: string};
};
