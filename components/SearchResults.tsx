import { useMemo } from "react";
import { List, ListRowRenderer } from 'react-virtualized'

import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
    totalPrice: number;
    results: Array<{
        id: number;
        price: number;
        priceFormatted: string;
        title: string;
 }>
 onAddToWishList: (id:number) => void;
}



// useMemo evita a igauldade referencial

export function SearchResults({totalPrice, results, onAddToWishList}: SearchResultsProps) {
  
    const rowRenderer: ListRowRenderer = ({index, key, style}) => {
        return (
            <div key={key} style={style}>
                <ProductItem
                    product={results[index]}
                    onAddToWishList={onAddToWishList}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>{ totalPrice }</h2>

            <List 
                height={300}
                rowHeight={30}
                width={900}
                overscanRowCount={5}
                rowCount={results.length}
                rowRenderer={rowRenderer}
            />

            {/*  {results.map(product => {
                return(
                    <ProductItem 
                    key={product.id}
                    product={product}
                    onAddToWishList={onAddToWishList}
                    />
                );
            })} */}
        </div>
    )
}


/**
 * Fluxo de renderização de um componente (React) sempre que um conponente pai atualizar o filho sofre isso:
 * 1. Criar uma nova versão do componente (o memo evita que isso aconteca ele vê se algo mudou se não mudou não mexe)
 * 2. Comparar com a versão anteriror
 * 3. Se houverem alterações, vai atualizar o que alterou
 */


/**
 * situações que usamos o memo
 * 1. Pure Functional Compopnents (funções que semore devolvem o mesmo resultado)
 * 2. Renders too often
 * 3. Re-renders with the samne props
 * 4. Medium to big size
 */

/**
 * useMemo / useCallback
 * 1. Cálcuos pesados
 * 2. Igualdade referencial (quando a gente repassa aquela informação ao componente filho)
 * 3. useCallback serve para memorisar uma função e não um valor
 */