import { useStore } from '@nanostores/react'
import { ItemProduct } from '@src/modules/cart/components/ItemProduct.component'
import { cartItems, type Product } from '@src/store/cartStore'
import { useEffect, useState } from 'react'

export function ListProduct () {
  const $cartItems = useStore(cartItems)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const parsedCartItems = Object.keys($cartItems).reduce((acc, key) => {
    const value = $cartItems[key]
    try {
      acc[key] = typeof value === 'string' ? JSON.parse(value) : value
    } catch (error) {
      console.error(`Error parsing cart item with key ${key}:`, error)
      acc[key] = null
    }
    return acc
  }, {} as Record<string, Product | null>)

  if (!hydrated) {
    return (<h1>Cargando...</h1>)
  }
  return (
    <ul className="list-none">
      {
        Object.keys(parsedCartItems).length > 0
          ? (
              Object.keys(parsedCartItems).map(key => {
                const item = parsedCartItems[key]
                if (item) {
                  return <ItemProduct key={item.idProduct} {...item} />
                }
                return null
              })
            )
          : (<p className="text-sm text-gray-500 dark:text-gray-400">
            Tu carrito está vacío.
          </p>)
      }
    </ul>
  )
}
