import { memo, useState} from 'react'
import dynamic from 'next/dynamic';
import { AddProductToWishListProps } from './AddProductToWishList';
//import { AddProductToWishList } from './AddProductToWishList'

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
    loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
    product: {
        id: number;
        price: number;
        priceFormatted: string;
        title: string;
    }
    onAddToWishList: (id: number ) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
    const [isAddingToWishList, setIsAddingToWishLIst] = useState(false);

    return (
       <div>
           {product.title} - <strong>{product.priceFormatted}</strong>
           <button onClick={() => setIsAddingToWishLIst(true)}>Adicionar aos favoritos</button>
           
          { isAddingToWishList && (
              <AddProductToWishList 
                onAddToWishList={() => onAddToWishList(product.id)}              
                onRequestClose={() => setIsAddingToWishLIst(false)}              
              />
          ) }
       </div> 
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product)
})