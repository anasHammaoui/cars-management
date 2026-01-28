export interface Car {
  id: string;
  marque_id: number;
  modele: string;
  prix: number;
  carburant: string;
  image: string;
  disponibilite: boolean;
  dateDeMiseEnVente: string;
}

export interface Brand {
  id: number;
  titre: string;
}

export interface CarWithBrand extends Car {
  marque?: Brand;
}