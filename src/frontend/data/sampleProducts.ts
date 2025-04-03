
import { IProduct } from '../../models/Product';

export const sampleProducts: IProduct[] = [
  {
    _id: "1",
    name: "Wedding Handkerchief",
    category: "Wedding Collection",
    price: 1200,
    discount: 10,
    description: "Exquisite handcrafted wedding handkerchief with traditional designs for the special day.",
    images: [
      "/lovable-uploads/ddc94184-f08a-48ce-a087-b0b6b32727bb.png",
      "/lovable-uploads/322f4e4c-ace4-4eef-9871-8c53e9add343.png"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
    name: "Hastmelap Design",
    category: "Hastmelap Handkerchief",
    price: 950,
    discount: 5,
    description: "Beautiful hastmelap design handkerchief with intricate hand-embroidered details.",
    images: [
      "/lovable-uploads/de5ef048-b294-48b3-aa7f-84aee983f176.png",
      "/lovable-uploads/8268205f-aa74-4de1-b80e-657e06d49441.png"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "3",
    name: "Astar Part Special",
    category: "Astar Part Handkerchief",
    price: 850,
    description: "Elegant Astar Part handkerchief with traditional motifs and designs.",
    images: [
      "/lovable-uploads/b4fb62a7-3af0-4aa3-85b3-54e78d2e1b44.png"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "4",
    name: "Star Pattern Mindhol",
    category: "Mindhol Handkerchief",
    price: 1100,
    discount: 15,
    description: "Beautiful star-pattern Mindhol handkerchief with traditional Hindu wedding symbols.",
    images: [
      "/lovable-uploads/89d90592-580e-4556-9d4a-df20f094315d.png",
      "/lovable-uploads/19f60e6b-0122-426d-9ecb-e8baf0717f13.png"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
